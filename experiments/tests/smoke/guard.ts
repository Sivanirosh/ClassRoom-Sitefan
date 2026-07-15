import {
  expect,
  type Browser,
  type BrowserContext,
  type BrowserContextOptions,
  type Page
} from '@playwright/test';

export type GuardedPage = {
  context: BrowserContext;
  page: Page;
  assertClean: () => Promise<void>;
  close: () => Promise<void>;
};

type InPageDiagnostics = {
  ready: boolean;
  instrumentationErrors: string[];
  violations: string[];
  localStorageEntries: number;
  sessionStorageEntries: number;
  indexedDbNames: string[];
  serviceWorkerRegistrations: number;
};

const declaredResourceTypes = new Set([
  'document',
  'font',
  'image',
  'media',
  'script',
  'stylesheet'
]);

function isDeclaredHttpRequest(
  rawUrl: string,
  baseUrl: string,
  resourceType: string
): boolean {
  const url = new URL(rawUrl);
  if (!declaredResourceTypes.has(resourceType)) return false;
  return url.protocol === 'data:' || url.protocol === 'blob:' || url.origin === baseUrl;
}

export async function createGuardedPage(
  browser: Browser,
  baseUrl: string,
  options: BrowserContextOptions
): Promise<GuardedPage> {
  const violations: string[] = [];
  const context = await browser.newContext({
    ...options,
    serviceWorkers: 'block'
  });

  context.on('serviceworker', (worker) => {
    violations.push(`service worker created: ${worker.url()}`);
  });

  await context.route('**/*', async (route) => {
    const request = route.request();
    const url = request.url();
    if (!isDeclaredHttpRequest(url, baseUrl, request.resourceType())) {
      violations.push(`undeclared ${request.resourceType()} network request: ${url}`);
      await route.abort('blockedbyclient');
      return;
    }
    await route.continue();
  });

  await context.routeWebSocket('**/*', (socket) => {
    violations.push(`undeclared WebSocket request: ${socket.url()}`);
    socket.close({ code: 1008, reason: 'WebSockets are not declared by the smoke harness' });
  });

  await context.addInitScript(() => {
    type SmokeWindow = Window & {
      __smokeDiagnostics?: {
        ready: boolean;
        instrumentationErrors: string[];
        violations: string[];
      };
    };

    const diagnostics = {
      ready: false,
      instrumentationErrors: [] as string[],
      violations: [] as string[]
    };
    (window as SmokeWindow).__smokeDiagnostics = diagnostics;

    const report = (kind: string, detail = ''): void => {
      diagnostics.violations.push(detail ? `${kind}: ${detail}` : kind);
    };
    const instrument = (label: string, callback: () => void): void => {
      try {
        callback();
      } catch (error) {
        diagnostics.instrumentationErrors.push(
          `${label}: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    };

    instrument('Storage methods', () => {
      const storageNames = new WeakMap<Storage, string>([
        [window.localStorage, 'localStorage'],
        [window.sessionStorage, 'sessionStorage']
      ]);
      const prototype = Storage.prototype as Storage & Record<string, (...args: string[]) => unknown>;

      for (const method of ['setItem', 'removeItem', 'clear'] as const) {
        const original = prototype[method];
        Object.defineProperty(prototype, method, {
          configurable: true,
          value: function (this: Storage, ...args: string[]) {
            report(`${storageNames.get(this) ?? 'Storage'}.${method}`, args.join(', '));
            return Reflect.apply(original, this, args);
          }
        });
      }

      for (const [name, storage] of [
        ['localStorage', window.localStorage],
        ['sessionStorage', window.sessionStorage]
      ] as const) {
        const proxy = new Proxy(storage, {
          get(target, property) {
            const value = Reflect.get(target, property, target);
            return typeof value === 'function' ? value.bind(target) : value;
          },
          set(target, property, value) {
            report(`${name} property assignment`, String(property));
            return Reflect.set(target, property, value, target);
          },
          defineProperty(target, property, descriptor) {
            report(`${name} property definition`, String(property));
            return Reflect.defineProperty(target, property, descriptor);
          },
          deleteProperty(target, property) {
            report(`${name} property deletion`, String(property));
            return Reflect.deleteProperty(target, property);
          }
        });
        Object.defineProperty(window, name, {
          configurable: true,
          get: () => proxy
        });
      }
    });

    instrument('document.cookie', () => {
      const descriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
      if (!descriptor?.get || !descriptor.set) throw new Error('cookie accessors unavailable');
      Object.defineProperty(Document.prototype, 'cookie', {
        configurable: descriptor.configurable,
        enumerable: descriptor.enumerable,
        get: descriptor.get,
        set(value: string) {
          report('document.cookie write', value);
          descriptor.set!.call(this, value);
        }
      });
    });

    instrument('IndexedDB', () => {
      const originalOpen = IDBFactory.prototype.open;
      const originalDelete = IDBFactory.prototype.deleteDatabase;
      Object.defineProperty(IDBFactory.prototype, 'open', {
        configurable: true,
        value: function (this: IDBFactory, name: string, version?: number) {
          report('indexedDB.open', name);
          return version === undefined
            ? Reflect.apply(originalOpen, this, [name])
            : Reflect.apply(originalOpen, this, [name, version]);
        }
      });
      Object.defineProperty(IDBFactory.prototype, 'deleteDatabase', {
        configurable: true,
        value: function (this: IDBFactory, name: string) {
          report('indexedDB.deleteDatabase', name);
          return Reflect.apply(originalDelete, this, [name]);
        }
      });
    });

    instrument('undeclared browser APIs', () => {
      Object.defineProperty(window, 'fetch', {
        configurable: true,
        value(input: RequestInfo | URL) {
          report('fetch', String(input));
          return Promise.reject(new TypeError('fetch is not declared by the smoke harness'));
        }
      });

      Object.defineProperty(XMLHttpRequest.prototype, 'open', {
        configurable: true,
        value: function (this: XMLHttpRequest, method: string, url: string | URL) {
          report('XMLHttpRequest.open', `${method} ${String(url)}`);
          throw new TypeError('XMLHttpRequest is not declared by the smoke harness');
        }
      });

      const blockConstructor = (name: 'EventSource' | 'Worker' | 'SharedWorker'): void => {
        const constructor = window[name];
        if (typeof constructor !== 'function') return;
        Object.defineProperty(window, name, {
          configurable: true,
          value: new Proxy(constructor, {
            construct(_target, argumentsList) {
              report(name, String(argumentsList[0]));
              throw new TypeError(`${name} is not declared by the smoke harness`);
            }
          })
        });
      };
      blockConstructor('EventSource');
      blockConstructor('Worker');
      blockConstructor('SharedWorker');

      Object.defineProperty(Navigator.prototype, 'sendBeacon', {
        configurable: true,
        value(url: string | URL) {
          report('navigator.sendBeacon', String(url));
          return false;
        }
      });
    });

    if ('ServiceWorkerContainer' in window) {
      instrument('serviceWorker.register', () => {
        const originalRegister = ServiceWorkerContainer.prototype.register;
        Object.defineProperty(ServiceWorkerContainer.prototype, 'register', {
          configurable: true,
          value: function (
            this: ServiceWorkerContainer,
            scriptURL: string | URL,
            options?: RegistrationOptions
          ) {
            report('serviceWorker.register', String(scriptURL));
            return Reflect.apply(originalRegister, this, [scriptURL, options]);
          }
        });
      });
    }

    diagnostics.ready = true;
  });

  const page = await context.newPage();
  context.on('page', (openedPage) => {
    if (openedPage !== page) {
      violations.push(`auxiliary page opened: ${openedPage.url()}`);
      void openedPage.close();
    }
  });
  page.on('frameattached', (frame) => {
    violations.push(`auxiliary frame attached: ${frame.url() || '(pending URL)'}`);
  });
  page.on('worker', (worker) => {
    violations.push(`worker created: ${worker.url()}`);
  });
  page.on('pageerror', (error) => violations.push(`uncaught page error: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') violations.push(`console error: ${message.text()}`);
  });
  page.on('websocket', (socket) => {
    violations.push(`undeclared WebSocket opened: ${socket.url()}`);
  });

  const assertClean = async (): Promise<void> => {
    await page.evaluate(
      () =>
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
        )
    );
    const inPage = await page.evaluate(async (): Promise<InPageDiagnostics> => {
      const smokeWindow = window as Window & {
        __smokeDiagnostics?: {
          ready: boolean;
          instrumentationErrors: string[];
          violations: string[];
        };
      };
      const diagnostics = smokeWindow.__smokeDiagnostics;
      const databases = await indexedDB.databases();
      const registrations = 'serviceWorker' in navigator
        ? await navigator.serviceWorker.getRegistrations()
        : [];

      return {
        ready: diagnostics?.ready ?? false,
        instrumentationErrors: diagnostics?.instrumentationErrors ?? ['diagnostics missing'],
        violations: diagnostics?.violations ?? ['diagnostics missing'],
        localStorageEntries: localStorage.length,
        sessionStorageEntries: sessionStorage.length,
        indexedDbNames: databases.map((database) => database.name ?? '(unnamed)'),
        serviceWorkerRegistrations: registrations.length
      };
    });
    const cookies = await context.cookies();

    expect(page.frames(), 'auxiliary frames are not declared by the smoke harness').toHaveLength(1);
    expect(inPage.ready, 'browser persistence instrumentation must be active').toBe(true);
    expect(inPage.instrumentationErrors, 'browser instrumentation errors').toEqual([]);
    expect(inPage.violations, 'browser persistence writes or registrations').toEqual([]);
    expect(inPage.localStorageEntries, 'localStorage must remain empty').toBe(0);
    expect(inPage.sessionStorageEntries, 'sessionStorage must remain empty').toBe(0);
    expect(inPage.indexedDbNames, 'IndexedDB must remain empty').toEqual([]);
    expect(inPage.serviceWorkerRegistrations, 'service workers must remain unregistered').toBe(0);
    expect(cookies, 'cookies must remain empty').toEqual([]);
    expect(violations, 'page, console, or network violations').toEqual([]);
  };

  return {
    context,
    page,
    assertClean,
    close: () => context.close()
  };
}
