<script lang="ts">
  import { tick } from 'svelte';
  import bipThinking from './assets/bip-thinking.png';
  import introConsole from './assets/intro-console.jpg';
  import outroConsole from './assets/outro-console.jpg';

  type View = 'intro' | 'question' | 'correct' | 'complete';
  type Digits = [number, number, number, number];

  type Scene = {
    id: string;
    chapter: string;
    title: string;
    bip: string;
    prompt: string;
    current: string;
    target: string;
    command: string;
    before: Digits;
    after: Digits;
    result: string;
    trace: string[];
    available: number[];
    checkpoints: number[];
    maxSlots: number;
    preload?: number[];
    correctFeedback: string;
    unlocked: string;
  };

  const rankLabels = ['Milliers', 'Centaines', 'Dizaines', 'Unités'];

  const scenes: Scene[] = [
    {
      id: 'demarrage', chapter: 'Prendre en main', title: 'Premier démarrage',
      bip: 'La console obéit à tous les boutons. C’est pratique, sauf quand je choisis le mauvais bouton.',
      prompt: 'La console affiche 243. Quelle commande atteint 244 en une seule action ?',
      current: '243', target: '244', command: 'Choisir une commande', before: [0,2,4,3], after: [0,2,4,4], result: '244',
      trace: ['La commande ajoute une unité.', '3 unités deviennent 4 unités.', 'Les centaines et les dizaines restent stables.'],
      available:[1,-1,10], checkpoints:[], maxSlots:1,
      correctFeedback:'Une seule commande +1 transforme 243 en 244. Seule la colonne des unités change.',
      unlocked:'Commandes directes'
    },
    {
      id: 'essai', chapter: 'Explorer la console', title: 'Le banc d’essai s’allume',
      bip: 'J’ai étiqueté les boutons. Cette fois, j’ai même vérifié que les étiquettes étaient dans le bon sens.',
      prompt: 'Programme une route de 293 à 1’303 en passant d’abord par la borne 303.',
      current:'293', target:'1’303', command:'Construire une route', before:[0,2,9,3], after:[1,3,0,3], result:'1’303',
      trace:['La première commande +10 atteint la borne 303.', 'La seconde commande +1’000 ajoute un millier.', 'La route termine à 1’303 dans l’ordre demandé.'],
      available:[10,1000], checkpoints:[303], maxSlots:2,
      correctFeedback:'La route commence par +10 pour atteindre 303, puis +1’000 conduit à 1’303. Les mêmes commandes dans l’autre ordre manqueraient la borne.',
      unlocked:'Sélecteur d’échelle'
    },
    {
      id:'passage', chapter:'Prévoir un échange', title:'Le passage dangereux',
      bip:'Les techniciens disent que la console devient créative quand une colonne atteint dix. Je ne sais pas si « créative » est rassurant.',
      prompt:'La console affiche 999. Programme le plus petit pas capable d’allumer le millier.',
      current:'999', target:'1’000', command:'Prévoir un passage en cascade', before:[0,9,9,9], after:[1,0,0,0], result:'1’000',
      trace:['999 + 1 produit 10 unités.', 'Les échanges traversent les dizaines puis les centaines.', 'La console atteint 1 millier, 0 centaine, 0 dizaine et 0 unité.'],
      available:[1,10,100], checkpoints:[], maxSlots:1,
      correctFeedback:'Le pas +1 déclenche une cascade complète : 999 devient 1’000 et les trois rangs inférieurs reviennent à zéro.',
      unlocked:'Détecteur de passage'
    },
    {
      id:'bug', chapter:'Déboguer un raisonnement', title:'Le bouton du mauvais rang',
      bip:'Je voulais ajouter une centaine. J’ai peut-être appuyé sur les dizaines… ou sur un bouton encore moins utile.',
      prompt:'Bip a programmé +10 pour calculer 956 + 100. Remplace sa commande par celle qui agit sur les centaines.',
      current:'956', target:'1’056', command:'Réparer la commande', before:[0,9,5,6], after:[1,0,5,6], result:'1’056',
      trace:['La commande +100 agit sur les centaines, pas sur les dizaines.', '9 centaines + 1 centaine = 10 centaines, soit 1 millier.', 'Les 5 dizaines et 6 unités restent stables.'],
      available:[10,100,-100], checkpoints:[], maxSlots:1, preload:[10],
      correctFeedback:'Bip avait choisi le rang des dizaines. +100 agit sur les centaines : dix centaines deviennent un millier, et 956 devient 1’056.',
      unlocked:'Analyseur d’erreurs'
    },
    {
      id:'degroupement', chapter:'Inverser un échange', title:'La colonne vide',
      bip:'La console refuse de retirer une centaine parce qu’elle n’en voit aucune. Elle oublie ce que contient le millier.',
      prompt:'Comment la console peut-elle calculer 1’004 − 100 alors que la colonne des centaines affiche zéro ?',
      current:'1’004', target:'904', command:'−100', before:[1,0,0,4], after:[0,9,0,4], result:'904',
      trace:['1 millier s’ouvre en 10 centaines.', 'La console retire 1 centaine.', 'Il reste 9 centaines, 0 dizaine et 4 unités.'],
      available:[-100,-1000,100], checkpoints:[], maxSlots:1,
      correctFeedback:'Le mouvement inverse d’un échange rend la soustraction possible : 1’004 devient 10 centaines et 4 unités, puis 904.',
      unlocked:'Commande réversible'
    },
    {
      id:'programme', chapter:'Certifier la machine', title:'Le programme de la fête',
      bip:'Dernier test. Si les lumières forment un canard géant, je dirai que c’était prévu. Mais essayons plutôt d’obtenir 1’305.',
      prompt:'Quel programme transforme 2’416 en 1’305 en utilisant chaque pas négatif une fois ?',
      current:'2’416', target:'1’305', command:'Programmer plusieurs pas', before:[2,4,1,6], after:[1,3,0,5], result:'1’305',
      trace:['−1’000 fait passer 2’416 à 1’416.', '−100 puis −10 conduisent à 1’306.', '−1 atteint exactement 1’305.'],
      available:[-1,-10,-100,-1000], checkpoints:[1416,1316,1306], maxSlots:4,
      correctFeedback:'Le programme coordonne −1, −10, −100 et −1’000. Chaque commande agit sur un rang et la console atteint exactement 1’305.',
      unlocked:'Certification finale'
    }
  ];

  const smokeSuccessPlans: Record<string, string> = {
    demarrage: 'command:1,step',
    essai: 'command:1000,command:10,execute,move-left:1,execute',
    passage: 'command:1,execute',
    bug: 'execute,remove:0,command:100,execute',
    degroupement: 'command:-100,execute',
    programme: 'command:-1000,command:-100,command:-10,command:-1,execute'
  };

  let view: View = 'intro';
  let sceneIndex = 0;
  let program: number[] = [];
  let runTrace: number[] = [];
  let consoleMessage = '';
  let consoleMessageKind: 'instruction' | 'action' | 'error' = 'instruction';
  let announcement = '';
  let rootElement: HTMLElement;
  $: scene = scenes[sceneIndex];
  $: startValue = parseNumber(scene.current);
  $: displayedValue = runTrace.at(-1) ?? startValue;
  $: displayedNumber = formatNumber(displayedValue);
  $: displayedDigits = digitsFor(displayedValue);
  $: smokeState = view === 'intro' ? 'ready' : view === 'question' ? 'active' : view === 'correct' ? 'success' : 'complete';
  $: smokeSuccessPlan = view === 'question' ? smokeSuccessPlans[scene.id] : undefined;
  $: smokeErrorPlan = view === 'question' && sceneIndex === 0 ? 'execute' : undefined;

  function parseNumber(value: string): number { return Number(value.replaceAll('’', '')); }
  function formatNumber(value: number): string { return value.toLocaleString('fr-CH'); }
  function digitsFor(value: number): Digits {
    const safe = Math.max(0, value);
    return [Math.floor(safe / 1000) % 10, Math.floor(safe / 100) % 10, Math.floor(safe / 10) % 10, safe % 10];
  }
  function commandLabel(command: number): string { return `${command > 0 ? '+' : '−'}${Math.abs(command).toLocaleString('fr-CH')}`; }

  async function focus(selector: string): Promise<void> { await tick(); rootElement.querySelector<HTMLElement>(selector)?.focus(); }
  function loadScene(): void {
    const current = scenes[sceneIndex];
    program = [...(current.preload ?? [])];
    runTrace = [];
    consoleMessage = current.preload ? 'Bip a laissé un programme dans la console. Exécute-le, puis répare-le.' : 'Ajoute des commandes, puis exécute le programme.';
    consoleMessageKind = 'instruction';
    view = 'question';
  }
  function editProgram(next: number[]): void {
    program = next;
    runTrace = [];
    consoleMessage = 'Programme modifié. La console attend une nouvelle exécution.';
    consoleMessageKind = 'action';
  }
  function addCommand(command: number): void {
    if (program.length >= scene.maxSlots) {
      consoleMessage = `Le programme possède seulement ${scene.maxSlots} emplacement${scene.maxSlots > 1 ? 's' : ''}.`;
      consoleMessageKind = 'error';
      return;
    }
    editProgram([...program, command]);
  }
  function removeCommand(index: number): void { editProgram(program.filter((_, itemIndex) => itemIndex !== index)); }
  function moveCommand(index: number, direction: -1 | 1): void {
    const target = index + direction;
    if (target < 0 || target >= program.length) return;
    const next = [...program]; [next[index], next[target]] = [next[target], next[index]]; editProgram(next);
  }
  function evaluate(values: number[]): void {
    const finalValue = values.at(-1) ?? startValue;
    const routeIsCorrect = scene.checkpoints.every((checkpoint, index) => values[index] === checkpoint);
    if (finalValue === parseNumber(scene.target) && routeIsCorrect && values.length === program.length) {
      view = 'correct';
      consoleMessage = 'Route validée.';
      consoleMessageKind = 'action';
      announcement = scene.correctFeedback;
      void focus('[data-smoke-feedback]');
    } else if (!routeIsCorrect) {
      const expected = scene.checkpoints.find((checkpoint, index) => values[index] !== checkpoint);
      consoleMessage = `La route atteint ${formatNumber(finalValue)}, mais elle manque d’abord la borne ${formatNumber(expected ?? scene.checkpoints[0])}. Modifie l’ordre.`;
      consoleMessageKind = 'error';
    } else {
      consoleMessage = `La console atteint ${formatNumber(finalValue)} au lieu de ${scene.target}. Le programme reste modifiable.`;
      consoleMessageKind = 'error';
    }
  }
  function execute(): void {
    if (program.length === 0) {
      consoleMessage = 'Le programme est vide. Ajoute au moins une commande avant de l’exécuter.';
      consoleMessageKind = 'error';
      return;
    }
    let value = startValue; const values: number[] = [];
    for (const command of program) { value += command; values.push(value); }
    runTrace = values; evaluate(values);
  }
  function step(): void {
    if (program.length === 0) {
      consoleMessage = 'Ajoute une commande avant de lancer le pas à pas.';
      consoleMessageKind = 'error';
      return;
    }
    if (runTrace.length >= program.length) runTrace = [];
    const index = runTrace.length;
    const value = (runTrace.at(-1) ?? startValue) + program[index];
    runTrace = [...runTrace, value];
    consoleMessage = `Étape ${index + 1} : ${commandLabel(program[index])} donne ${formatNumber(value)}.`;
    consoleMessageKind = 'action';
    if (runTrace.length === program.length) evaluate(runTrace);
  }
  function clearProgram(): void { editProgram([]); }

  async function start(): Promise<void> { sceneIndex=0; loadScene(); announcement='La console démarre sur le nombre 243.'; await focus('#scene-title'); }
  async function continueStory(): Promise<void> { if(sceneIndex===scenes.length-1){view='complete';announcement='La console est certifiée pour la fête.';await focus('[data-smoke-completion]');return;} sceneIndex+=1;loadScene();announcement=`Nouveau test : ${scenes[sceneIndex].title}.`;await focus('#scene-title'); }
  async function restart(): Promise<void> { view='intro';sceneIndex=0;program=[];runTrace=[];announcement='Retour au démarrage de la console.';await focus('#intro-title'); }
</script>

<svelte:head>
  <title>La console qui n’en fait qu’à sa tête · EX-0003</title>
  <meta name="description" content="Prototype 6H pour prédire et réparer des transformations de valeur de position." />
</svelte:head>

<main class="prototype-root" data-smoke-root data-smoke-exercise="EX-0003" data-smoke-program="pilot-seq-n1" data-smoke-state={smokeState} data-smoke-success-plan={smokeSuccessPlan} data-smoke-error-plan={smokeErrorPlan} bind:this={rootElement}>
  <div class="circuit-bg" aria-hidden="true"></div>

  {#if view === 'intro'}
    <section class="intro" aria-labelledby="intro-title">
      <div class="intro-copy">
        <p class="eyebrow"><span>Chapitre B</span> Le test avant la fête</p>
        <h1 id="intro-title" tabindex="-1">La console qui<br /><em>n’en fait qu’à sa tête</em></h1>
        <p class="lead">La machine de Bip est assemblée. Sa console connaît tous les chiffres, tous les boutons… et quelques façons très personnelles de les utiliser.</p>
        <div class="dialogue"><span class="avatar">B</span><p>« Je l’ai testée deux fois. Les deux résultats étaient différents, donc elle sait déjà varier les exercices. »</p></div>
        <div class="intro-actions"><button class="primary" type="button" data-smoke-action="start" onclick={start}>Allumer la console <span aria-hidden="true">→</span></button><a href="/runner/?id=EX-0002">Revoir le chapitre A</a><span>6 tests · environ 8 min</span></div>
      </div>
      <div class="console-art" aria-label="Bip observe une grande console d’invention"><img class="scene-art" src={introConsole} alt="" aria-hidden="true" /></div>
    </section>
  {:else}
    <div class="game-shell">
      <header class="game-header">
        <a href="/exercise/?id=EX-0003" class="brand" aria-label="Retour à la fiche EX-0003"><span>▰</span><strong>Console de Bip</strong></a>
        {#if view !== 'complete'}<div class="progress"><div><span>Certification</span><strong>Test {sceneIndex+1} / {scenes.length}</strong></div><div role="progressbar" aria-label="Progression de la certification" aria-valuemin="1" aria-valuemax={scenes.length} aria-valuenow={sceneIndex+1}><i style={`width:${((sceneIndex+1)/scenes.length)*100}%`}></i></div></div>{:else}<span class="certified">Console certifiée</span>{/if}
      </header>

      {#if view === 'question' || view === 'correct'}
        <section class="scene-grid" aria-labelledby="scene-title">
          <aside class="bip-panel">
            <img class="bip-sprite panel-bip" src={bipThinking} alt="" aria-hidden="true" />
            <div class="speech"><span>Bip</span><p>{scene.bip}</p></div>
            <div class="test-list">{#each scenes as item,index}<span class:done={index<sceneIndex} class:current={index===sceneIndex}><i>{index<sceneIndex?'✓':index+1}</i>{item.chapter}</span>{/each}</div>
          </aside>

          <article class="test-card">
            <p class="eyebrow"><span>Test {String(sceneIndex+1).padStart(2,'0')}</span> {scene.chapter}</p>
            <h1 id="scene-title" tabindex="-1">{scene.title}</h1>
            <p class="prompt">{scene.prompt}</p>

            <div class="console-machine" aria-label={`Console affichant ${displayedNumber}, cible ${scene.target}`}>
              <div class="machine-head">
                <div class="machine-name"><i aria-hidden="true"></i><div><small>Console de route</small><strong>{scene.command}</strong></div></div>
                <span class:ok={view === 'correct'} class="machine-status">{view === 'correct' ? 'Route validée' : runTrace.length > 0 ? 'Trace visible' : 'Prête'}</span>
              </div>

              <section class="route-builder" aria-label="Programme de transformation">
                <div class="builder-head">
                  <div><span>{view === 'correct' ? 'Route exécutée' : 'Construis la route'}</span><strong>{program.length} / {scene.maxSlots} pas placés</strong></div>
                  {#if view === 'question' && program.length > 0}<button class="text-button" type="button" data-smoke-control="clear" onclick={clearProgram}>Effacer la route</button>{/if}
                </div>

                <div class="route-line" aria-label="Route programmée">
                  <div class="route-node route-start"><small>Départ</small><strong>{scene.current}</strong></div>
                  {#each Array(scene.maxSlots) as _,index}
                    <span class="route-arrow" aria-hidden="true">→</span>
                    <div class:filled={program[index] !== undefined} class:checkpoint-matched={scene.checkpoints[index] !== undefined && runTrace[index] === scene.checkpoints[index]} class="route-slot">
                      <div class="slot-command">
                        <small>Pas {index + 1}</small>
                        {#if program[index] !== undefined}
                          <strong>{commandLabel(program[index])}</strong>
                          {#if view === 'question'}
                            <div class="slot-actions">
                              <button type="button" data-smoke-control={`move-left:${index}`} aria-label={`Déplacer ${commandLabel(program[index])} à gauche`} onclick={() => moveCommand(index,-1)} disabled={index===0}>←</button>
                              <button type="button" data-smoke-control={`remove:${index}`} aria-label={`Supprimer ${commandLabel(program[index])}`} onclick={() => removeCommand(index)}>×</button>
                              <button type="button" data-smoke-control={`move-right:${index}`} aria-label={`Déplacer ${commandLabel(program[index])} à droite`} onclick={() => moveCommand(index,1)} disabled={index===program.length-1}>→</button>
                            </div>
                          {/if}
                        {:else}
                          <strong class="slot-empty">Commande</strong>
                        {/if}
                      </div>
                      {#if scene.checkpoints[index] !== undefined}
                        <div class:missed={runTrace[index] !== undefined && runTrace[index] !== scene.checkpoints[index]} class="slot-result">
                          {#if runTrace[index] === undefined}
                            <small>Borne attendue</small><strong>{formatNumber(scene.checkpoints[index])}</strong>
                          {:else if runTrace[index] === scene.checkpoints[index]}
                            <small>Borne atteinte</small><strong>{formatNumber(runTrace[index])}</strong>
                          {:else}
                            <small>Résultat observé</small><strong>{formatNumber(runTrace[index])}</strong><em>Attendu : {formatNumber(scene.checkpoints[index])}</em>
                          {/if}
                        </div>
                      {:else if runTrace[index] !== undefined}
                        <div class="slot-result"><small>Résultat</small><strong>{formatNumber(runTrace[index])}</strong></div>
                      {/if}
                    </div>
                  {/each}
                  <span class="route-arrow" aria-hidden="true">→</span>
                  <div class="route-node route-target"><small>Cible</small><strong>{scene.target}</strong></div>
                </div>

                <details class="place-scanner">
                  <summary><span>Inspecter les milliers, centaines, dizaines et unités</span><strong>Scanner les rangs</strong></summary>
                  <div class="digit-grid">
                    {#each displayedDigits as digit,index}
                      <div class:changed={runTrace.length > 0 && displayedDigits[index]!==scene.before[index]}><span>{rankLabels[index]}</span><b>{digit}</b><small>× {10 ** (3-index)}</small></div>
                    {/each}
                  </div>
                </details>

                {#if view === 'question'}
                  <div class="command-rack" aria-label="Commandes disponibles">
                    <div><span>Commandes disponibles</span><small>Ajoute un pas à la route</small></div>
                    <div class="command-buttons">{#each scene.available as command}<button type="button" data-smoke-control={`command:${command}`} onclick={() => addCommand(command)} disabled={program.length>=scene.maxSlots} aria-label={`Ajouter la commande ${commandLabel(command)}`}><strong>{commandLabel(command)}</strong><span>Ajouter</span></button>{/each}</div>
                  </div>
                  <div class="machine-footer">
                    <div class:error={consoleMessageKind === 'error'} class="program-message" role="status" data-smoke-feedback={consoleMessageKind === 'error' ? 'error' : undefined} data-smoke-feedback-detail={consoleMessageKind === 'error' ? 'true' : undefined}><span aria-hidden="true">{consoleMessageKind === 'error' ? '!' : '↳'}</span><p>{consoleMessage}</p></div>
                    <div class="run-controls"><button class="secondary" type="button" data-smoke-control="step" onclick={step} disabled={program.length === 0}>Pas à pas</button><button class="primary" type="button" data-smoke-control="execute" onclick={execute}>Lancer la route <span aria-hidden="true">▶</span></button></div>
                  </div>
                {:else}
                  <div class="validated-strip"><span aria-hidden="true">✓</span><p>Chaque commande et chaque nombre intermédiaire restent visibles sur la même route.</p></div>
                {/if}
              </section>
            </div>

            {#if view === 'correct'}
              <div class="feedback good" role="status" tabindex="-1" data-smoke-feedback="success" data-smoke-feedback-detail><span aria-hidden="true">✓</span><div><small>Module validé · {scene.unlocked}</small><h2>{scene.result} est cohérent.</h2><p>{scene.correctFeedback}</p></div></div>
              <details class="trace"><summary>Comprendre la transformation</summary><ol>{#each scene.trace as step}<li>{step}</li>{/each}</ol></details>
              <div class="actions"><button class="primary" type="button" data-smoke-action="continue" onclick={continueStory}>{sceneIndex===scenes.length-1?'Lancer la démonstration':'Test suivant'} <span aria-hidden="true">→</span></button></div>
            {/if}
          </article>
        </section>
      {:else if view === 'complete'}
        <section class="completion" aria-labelledby="complete-title">
          <div class="festival-art" aria-hidden="true"><img class="scene-art" src={outroConsole} alt="" /></div>
          <div class="completion-copy"><p class="eyebrow"><span>Chapitre B terminé</span> Fête des inventions</p><h1 id="complete-title" tabindex="-1" data-smoke-completion>La console est prête.<br />Bip aussi. Presque.</h1><p>Tu as choisi des pas, prévu des passages de rang, réparé une commande placée au mauvais rang et programmé la transformation finale. La machine peut maintenant changer une valeur sans perdre la structure du nombre.</p><blockquote>« Elle affiche exactement 1’305. Je savais qu’elle y arriverait dès que tu as réparé tout ce que j’avais programmé. »</blockquote><div class="completion-actions"><a class="primary" href="/runner/?id=EX-0002">Rejouer le chapitre A</a><button class="text-button" type="button" onclick={restart}>Recommencer les tests</button></div><small>Prototype local : aucune réponse n’est enregistrée ni envoyée.</small></div>
        </section>
      {/if}
    </div>
  {/if}
  <p class="sr-only" aria-live="polite">{announcement}</p>
</main>

<style>
  :global(*){box-sizing:border-box}:global(button),:global(a){-webkit-tap-highlight-color:transparent}
  .prototype-root{--ink:#122631;--muted:#65757d;--paper:#fffaf0;--cream:#eee9df;--line:#c9c7bf;--navy:#142f44;--blue:#2f63ce;--cyan:#38b8b0;--lime:#c8ee6b;--coral:#ed7458;--yellow:#f4c957;position:relative;min-height:calc(100vh - 42px);overflow:hidden;color:var(--ink);background:var(--cream);font-family:"Segoe UI Variable","Segoe UI",system-ui,sans-serif}
  .circuit-bg{position:fixed;inset:42px 0 0;pointer-events:none;opacity:.09;background-image:linear-gradient(90deg,transparent 47%,#61727a 48% 52%,transparent 53%),linear-gradient(transparent 47%,#61727a 48% 52%,transparent 53%);background-size:86px 86px;mask-image:linear-gradient(#000,transparent 88%)}
  button,a{font:inherit}button:focus-visible,a:focus-visible{outline:4px solid var(--yellow);outline-offset:3px}
  .eyebrow{margin:0;color:var(--blue);font-size:.7rem;font-weight:900;letter-spacing:.11em;text-transform:uppercase}.eyebrow span{display:inline-block;margin-right:8px;padding:6px 8px;color:white;background:var(--blue);border-radius:999px}
  .intro{position:relative;z-index:1;display:grid;min-height:calc(100vh - 42px);width:min(1250px,calc(100% - 48px));margin:auto;grid-template-columns:1.08fr .92fr;align-items:center;gap:clamp(40px,7vw,105px);padding:60px 0}.intro-copy,.test-card,.completion-copy{min-width:0}
  .intro h1,.test-card h1,.completion h1{font-family:Georgia,serif;font-weight:500;letter-spacing:-.055em;line-height:.94}.intro h1{margin:24px 0;font-size:clamp(4rem,8vw,8rem)}.intro h1 em{color:var(--blue);font-weight:500}
  .lead{max-width:660px;margin:0;color:var(--muted);font-size:clamp(1.02rem,1.7vw,1.25rem);line-height:1.65}.dialogue{display:grid;max-width:640px;grid-template-columns:auto 1fr;gap:12px;align-items:center;margin-top:28px;padding:14px 16px;border:1px solid var(--line);border-radius:14px;background:rgba(255,250,240,.85)}.dialogue p{margin:0;font-size:.86rem;line-height:1.5}.avatar{display:grid;width:39px;height:39px;place-items:center;color:var(--yellow);background:var(--navy);border-radius:50%;font-family:Georgia,serif;font-weight:900}
  .intro-actions,.completion-actions{display:flex;align-items:center;gap:17px;flex-wrap:wrap;margin-top:30px}.intro-actions>a{color:var(--blue);font-size:.76rem;font-weight:800}.intro-actions>span{color:var(--muted);font-size:.75rem}
  .primary,.secondary,.text-button{min-height:48px;border-radius:8px;font-weight:850;cursor:pointer}.primary,.secondary{transition:transform 120ms cubic-bezier(.23,1,.32,1),background-color 120ms ease}.primary{display:inline-flex;align-items:center;justify-content:center;gap:22px;padding:12px 18px;color:white;background:var(--navy);border:1px solid var(--navy);box-shadow:0 5px 0 #091a24;text-decoration:none}.secondary{padding:11px 17px;color:var(--ink);background:white;border:1px solid var(--ink)}.text-button{padding:10px 3px;color:var(--blue);background:transparent;border:0;text-decoration:underline}.primary:active,.secondary:active,.command-buttons button:active,.slot-actions button:active{transform:scale(.97)}
  @media(hover:hover) and (pointer:fine){.primary:hover{background:var(--blue);transform:translateY(-1px)}.command-buttons button:hover{border-color:var(--blue);transform:translateY(-1px)}}
  .console-art{position:relative;min-height:555px;overflow:hidden;border:1px solid #8195a2;border-radius:40px 40px 18px 18px;background:linear-gradient(#18394e 0 62%,#d1a65c 62%);box-shadow:20px 23px 0 rgba(18,38,49,.1)}.scene-art{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .bip-sprite{display:block;object-fit:contain;filter:drop-shadow(8px 10px 0 rgba(18,38,49,.18));user-select:none}.panel-bip{width:112px;height:180px;margin:auto;animation:bipIdle 3.8s ease-in-out infinite}@keyframes bipIdle{0%,100%{transform:translateY(0) rotate(-.5deg)}50%{transform:translateY(-5px) rotate(.5deg)}}
  .game-shell{position:relative;z-index:1;width:min(1320px,calc(100% - 38px));margin:auto;padding:17px 0 48px}.game-header{display:flex;min-height:62px;align-items:center;justify-content:space-between;gap:30px;margin-bottom:27px}.brand{display:flex;align-items:center;gap:10px;color:var(--ink);text-decoration:none;font-size:.78rem}.brand span{display:grid;width:38px;height:38px;place-items:center;color:var(--lime);background:var(--navy);border-radius:8px}.progress{width:min(430px,54vw)}.progress>div:first-child{display:flex;justify-content:space-between;margin-bottom:7px;color:var(--muted);font-size:.67rem}.progress>div:last-child{height:7px;overflow:hidden;background:#d0cec6;border-radius:99px}.progress i{display:block;height:100%;background:var(--cyan);border-radius:inherit}.certified{padding:8px 12px;color:var(--navy);border:1px solid var(--blue);border-radius:999px;font-size:.68rem;font-weight:850;text-transform:uppercase}
  .scene-grid{display:grid;grid-template-columns:230px minmax(0,1fr);gap:22px;align-items:start}.bip-panel{position:sticky;top:17px;padding:20px 16px;border:1px solid var(--line);border-radius:17px;background:rgba(255,250,240,.85)}.speech{margin-top:8px;padding:14px;background:white;border:1px solid var(--line);border-radius:11px}.speech span{color:var(--coral);font-size:.64rem;font-weight:900;text-transform:uppercase}.speech p{margin:5px 0 0;font-size:.78rem;line-height:1.5}.test-list{display:grid;gap:7px;margin-top:18px;padding-top:15px;border-top:1px solid var(--line)}.test-list>span{display:grid;grid-template-columns:25px 1fr;gap:8px;align-items:center;color:#8b9295;font-size:.63rem}.test-list i{display:grid;width:25px;height:25px;place-items:center;border:1px solid var(--line);border-radius:50%;font-style:normal;font-weight:850}.test-list span.current{color:var(--ink);font-weight:850}.test-list .current i{color:white;background:var(--blue);border-color:var(--blue)}.test-list .done i{color:var(--navy);background:var(--lime);border-color:var(--lime)}
  .test-card{padding:clamp(24px,3.6vw,48px);background:rgba(255,250,240,.96);border:1px solid #bdbdb6;border-radius:18px;box-shadow:0 20px 55px rgba(18,38,49,.1)}.test-card h1{max-width:900px;margin:15px 0 13px;font-size:clamp(2.55rem,4.6vw,4.5rem)}.prompt{max-width:780px;margin:0;color:var(--muted);font-size:1rem;line-height:1.55}
  .console-machine{margin-top:26px;overflow:hidden;color:#eafbf3;background:var(--navy);border:4px solid #071923;border-radius:16px;box-shadow:8px 9px 0 #071923}
  .machine-head{display:flex;min-height:64px;align-items:center;justify-content:space-between;gap:18px;padding:13px 17px;border-bottom:1px solid #385769;background:#102b3b}.machine-name{display:flex;align-items:center;gap:11px}.machine-name i{width:10px;height:10px;background:var(--lime);border-radius:50%;box-shadow:0 0 0 5px rgba(200,238,107,.12)}.machine-name small,.machine-name strong{display:block}.machine-name small{color:#91a8b4;font-size:.56rem;font-weight:850;letter-spacing:.09em;text-transform:uppercase}.machine-name strong{margin-top:3px;font-size:.84rem}.machine-status{padding:7px 10px;color:var(--yellow);border:1px solid #4c6876;border-radius:999px;font-size:.57rem;font-weight:900;letter-spacing:.06em;text-transform:uppercase}.machine-status.ok{color:var(--navy);background:var(--lime);border-color:var(--lime)}
  .place-scanner{margin-top:10px;overflow:hidden;color:#eafbf3;background:#0a2531;border:1px solid #526d79;border-radius:9px}.place-scanner summary{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:11px 13px;cursor:pointer;list-style:none}.place-scanner summary::-webkit-details-marker{display:none}.place-scanner summary span{color:#9bb0b9;font-size:.6rem}.place-scanner summary strong{color:var(--lime);font-size:.58rem;letter-spacing:.05em;text-transform:uppercase}.place-scanner summary::after{content:'+';display:grid;width:24px;height:24px;flex:0 0 auto;place-items:center;color:var(--navy);background:var(--lime);border-radius:50%;font-size:.9rem;font-weight:900}.place-scanner[open] summary::after{content:'−'}.digit-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:0 10px 10px}.digit-grid div{padding:8px;text-align:center;border:1px solid #55717e;border-radius:8px;background:#1b4050;transition:background-color 180ms cubic-bezier(.23,1,.32,1),color 180ms cubic-bezier(.23,1,.32,1)}.digit-grid div.changed{color:var(--navy);background:var(--lime);border-color:var(--lime)}.digit-grid span,.digit-grid small{display:block;font-size:.48rem;text-transform:uppercase}.digit-grid b{display:block;margin:3px 0;font-family:ui-monospace,monospace;font-size:1.25rem;font-variant-numeric:tabular-nums}
  .route-builder{margin:10px;padding:17px;color:var(--ink);background:#f7f3e8;border:1px solid #d5ccba;border-radius:11px}.builder-head{display:flex;align-items:center;justify-content:space-between;gap:14px}.builder-head span,.builder-head strong{display:block}.builder-head span{color:var(--blue);font-size:.59rem;font-weight:900;letter-spacing:.07em;text-transform:uppercase}.builder-head strong{margin-top:3px;font-size:.8rem}.builder-head .text-button{min-height:38px;font-size:.72rem}
  .route-line{display:flex;align-items:stretch;justify-content:center;gap:6px;margin-top:14px;padding:12px;background:#ebe7dc;border-radius:10px}.route-arrow{align-self:center;color:#7e8b90;font-size:1rem;font-weight:900}.route-node,.route-slot{display:flex;min-width:100px;min-height:108px;flex-direction:column;justify-content:center;padding:10px;border-radius:9px}.route-node{color:white;background:#355563;text-align:center}.route-node small,.slot-command small,.slot-result small{display:block;font-size:.51rem;font-weight:850;letter-spacing:.06em;text-transform:uppercase}.route-node strong{margin-top:6px;font-family:ui-monospace,monospace;font-size:1.03rem;font-variant-numeric:tabular-nums}.route-target{color:var(--navy);background:var(--yellow)}.route-slot{min-width:120px;max-width:180px;flex:1;border:2px dashed #b7b2a7;background:#f9f7f1}.route-slot.filled{color:white;background:var(--navy);border-style:solid;border-color:#071923}.slot-command{display:flex;min-height:58px;flex-direction:column;justify-content:center;text-align:center}.slot-command>small{color:#7d8a8e}.filled .slot-command>small{color:#8ba4b0}.slot-command>strong{margin-top:5px;font-family:ui-monospace,monospace;font-size:1.35rem;font-variant-numeric:tabular-nums}.slot-command .slot-empty{color:#92999a;font-family:inherit;font-size:.67rem;font-weight:750;text-transform:uppercase}.slot-actions{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-top:8px}.slot-actions button{min-height:30px;color:white;background:#244b60;border:1px solid #537184;border-radius:5px;cursor:pointer;transition:transform 120ms cubic-bezier(.23,1,.32,1)}.slot-actions button:disabled{opacity:.24}.slot-result{margin:8px -4px -4px;padding:7px;color:var(--ink);background:#e4ecdf;border-radius:6px;text-align:center}.slot-result strong{display:block;margin-top:3px;font-family:ui-monospace,monospace;font-size:.8rem;font-variant-numeric:tabular-nums}.slot-result em{display:block;margin-top:4px;color:#a04431;font-size:.52rem;font-style:normal;font-weight:850;text-transform:uppercase}.slot-result.missed{background:#fff0eb;box-shadow:inset 0 0 0 1px #e2a492}.checkpoint-matched .slot-result{background:var(--lime)}
  .command-rack{display:grid;grid-template-columns:155px 1fr;gap:12px;align-items:center;margin-top:12px;padding:12px;background:#e4eaec;border-radius:9px}.command-rack>div:first-child span,.command-rack>div:first-child small{display:block}.command-rack>div:first-child span{color:var(--blue);font-size:.58rem;font-weight:900;text-transform:uppercase}.command-rack>div:first-child small{margin-top:4px;color:var(--muted);font-size:.64rem}.command-buttons{display:flex;gap:7px;flex-wrap:wrap}.command-buttons button{display:flex;min-width:82px;min-height:52px;flex-direction:column;align-items:center;justify-content:center;padding:7px 11px;color:var(--ink);background:white;border:1px solid #8fa0a6;border-radius:8px;cursor:pointer;box-shadow:0 3px 0 #aab5b8;transition:transform 120ms cubic-bezier(.23,1,.32,1),border-color 120ms ease}.command-buttons button:disabled{opacity:.35;cursor:not-allowed;box-shadow:none}.command-buttons strong{font-family:ui-monospace,monospace;font-size:1rem;font-variant-numeric:tabular-nums}.command-buttons span{margin-top:2px;color:var(--muted);font-size:.5rem;text-transform:uppercase}
  .machine-footer{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:center;margin-top:12px}.program-message{display:flex;min-height:54px;align-items:center;gap:10px;padding:10px 12px;color:var(--ink);background:white;border-left:4px solid var(--cyan);border-radius:8px}.program-message.error{background:#fff0eb;border-left-color:var(--coral)}.program-message>span{display:grid;width:26px;height:26px;flex:0 0 auto;place-items:center;color:var(--navy);background:var(--lime);border-radius:50%;font-weight:900}.program-message.error>span{color:white;background:var(--coral)}.program-message p{margin:0;font-size:.7rem;line-height:1.45}.run-controls{display:flex;justify-content:flex-end;gap:9px}.run-controls button:disabled{opacity:.4;cursor:not-allowed}.validated-strip{display:flex;align-items:center;gap:10px;margin-top:12px;padding:10px 12px;color:#38502e;background:#e6f3dc;border-radius:8px}.validated-strip>span{display:grid;width:28px;height:28px;place-items:center;color:var(--navy);background:var(--lime);border-radius:50%;font-weight:900}.validated-strip p{margin:0;font-size:.7rem;line-height:1.4}
  .feedback{display:grid;grid-template-columns:auto 1fr;gap:17px;margin-top:28px;padding:21px;border:1px solid;border-radius:12px}.feedback.good{background:#ebf5e4;border-color:#9cc08a}.feedback>span{display:grid;width:44px;height:44px;place-items:center;color:white;background:var(--coral);border-radius:10px;font-size:1.3rem;font-weight:900}.feedback.good>span{color:var(--navy);background:var(--lime)}.feedback small{color:var(--coral);font-size:.61rem;font-weight:900;text-transform:uppercase}.feedback.good small{color:#527133}.feedback h2{margin:5px 0 8px;font-family:Georgia,serif;font-size:1.8rem;font-weight:500}.feedback p{margin:0;color:var(--muted);font-size:.79rem;line-height:1.55}.actions{display:flex;justify-content:flex-end;margin-top:17px}
  .trace{margin-top:11px;padding:0 16px;background:white;border:1px solid var(--line);border-radius:10px}.trace summary{padding:14px 0;color:var(--blue);font-size:.66rem;font-weight:900;letter-spacing:.05em;text-transform:uppercase;cursor:pointer}.trace ol{display:grid;gap:8px;margin:0 0 16px;padding-left:24px}.trace li{padding-left:6px;color:var(--muted);font-size:.75rem;line-height:1.4}.trace li::marker{color:var(--blue);font-weight:900}
  .completion{display:grid;min-height:calc(100vh - 140px);grid-template-columns:.95fr 1.05fr;gap:clamp(35px,7vw,95px);align-items:center;padding:44px 5vw;background:var(--paper);border:1px solid var(--line);border-radius:22px}.festival-art{position:relative;min-height:520px;overflow:hidden;border-radius:44% 44% 18px 18px;background:linear-gradient(#142e49 0 65%,#dcaa59 65%)}.completion h1{margin:20px 0;font-size:clamp(3rem,6vw,6rem)}.completion-copy>p:not(.eyebrow){color:var(--muted);line-height:1.7}.completion blockquote{margin:24px 0;padding:16px;border-left:5px solid var(--coral);background:var(--cream);font-family:Georgia,serif;font-size:1.03rem;line-height:1.5}.completion-copy>small{display:block;margin-top:23px;color:var(--muted);font-size:.67rem}
  .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
  @media(max-width:1080px){.intro{grid-template-columns:1fr}.scene-grid{grid-template-columns:1fr}.bip-panel{position:static;display:grid;grid-template-columns:120px 1fr}.test-list{display:none}.completion{grid-template-columns:1fr}.festival-art{min-height:430px}}
  @media(max-width:760px){.route-line{overflow-x:auto;justify-content:flex-start}.machine-footer{grid-template-columns:1fr}.run-controls{justify-content:flex-start}}
  @media(max-width:620px){.prototype-root{overflow-x:hidden}.intro,.game-shell{width:calc(100% - 24px)}.intro{padding:34px 0}.intro h1{font-size:clamp(2.9rem,13.8vw,3.8rem)}.console-art{min-height:410px}.intro-actions{align-items:stretch;flex-direction:column}.intro-actions .primary{width:100%}.game-header{align-items:flex-start}.progress{width:55vw}.bip-panel{grid-template-columns:82px 1fr;padding:12px}.panel-bip{width:72px;height:112px}.speech{margin:0;padding:11px}.test-card{padding:20px 12px}.test-card h1{font-size:2.35rem}.prompt{font-size:.9rem}.console-machine{border-width:3px;box-shadow:5px 6px 0 #071923}.machine-head{align-items:flex-start;padding:12px}.machine-status{white-space:nowrap}.place-scanner summary{align-items:flex-start}.place-scanner summary span{max-width:145px}.digit-grid{grid-template-columns:repeat(4,1fr);gap:4px}.digit-grid div{padding:6px 2px}.digit-grid span,.digit-grid small{font-size:.42rem}.digit-grid b{font-size:1.05rem}.route-builder{margin:6px;padding:12px}.builder-head{align-items:flex-start}.route-line{align-items:stretch;flex-direction:column;overflow:visible;padding:10px}.route-arrow{align-self:center;transform:rotate(90deg)}.route-node,.route-slot{width:100%;max-width:none;min-height:74px}.slot-command{min-height:44px}.command-rack{grid-template-columns:1fr}.command-buttons button{min-width:70px;flex:1}.machine-footer{grid-template-columns:1fr}.run-controls{align-items:stretch;flex-direction:column}.run-controls button{width:100%}.feedback{grid-template-columns:1fr}.actions{justify-content:stretch}.actions button{width:100%}.completion{padding:24px 14px}.festival-art{min-height:340px}.completion h1{font-size:3rem}.completion-actions{align-items:stretch;flex-direction:column}.completion-actions .primary,.completion-actions button{width:100%}}
  @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
</style>
