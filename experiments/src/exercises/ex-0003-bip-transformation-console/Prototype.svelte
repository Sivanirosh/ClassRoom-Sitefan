<script lang="ts">
  import { tick } from 'svelte';
  import bipThinking from './assets/bip-thinking.png';
  import introConsole from './assets/intro-console.jpg';
  import outroConsole from './assets/outro-console.jpg';

  type View = 'intro' | 'question' | 'incorrect' | 'correct' | 'complete';
  type Digits = [number, number, number, number];

  type Choice = {
    label: string;
    detail: string;
    code: string;
    result: string;
    digits: Digits;
    correct?: boolean;
  };
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
    choices: Choice[];
    wrongIndex: number;
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
      choices: [
        {label:'−1', detail:'243 − 1 donne 242 : la console s’éloigne de deux unités de la cible.', code:'SUB 0001', result:'242', digits:[0,2,4,2]},
        {label:'+1', detail:'243 + 1 donne exactement 244.', code:'ADD 0001', result:'244', digits:[0,2,4,4], correct:true},
        {label:'+10', detail:'243 + 10 donne 253 : la colonne des dizaines change au lieu des unités.', code:'ADD 0010', result:'253', digits:[0,2,5,3]}
      ], wrongIndex:0,
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
      choices:[
        {label:'+100',detail:'243 + 100 donne 343 : la colonne des centaines change, pas celle des milliers.',code:'ADD 0100',result:'343',digits:[0,3,4,3]},
        {label:'+1’000',detail:'243 + 1’000 donne exactement 1’243.',code:'ADD 1000',result:'1’243',digits:[1,2,4,3],correct:true},
        {label:'+10',detail:'243 + 10 donne 253 : ce pas agit sur les dizaines.',code:'ADD 0010',result:'253',digits:[0,2,5,3]}
      ], wrongIndex:0,
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
      choices:[
        {label:'2’103',detail:'Écrire 2 | 10 | 3 insère deux chiffres au lieu d’échanger dix dizaines.',code:'PRED 2103',result:'2’103',digits:[2,1,0,3]},
        {label:'303',detail:'Dix dizaines forment une nouvelle centaine : 293 + 10 donne 303.',code:'PRED 0303',result:'303',digits:[0,3,0,3],correct:true},
        {label:'294',detail:'293 + 1 donne 294 : cette prédiction utilise le pas de 1 au lieu du pas de 10.',code:'PRED 0294',result:'294',digits:[0,2,9,4]}
      ], wrongIndex:0,
      available:[1,10,100], checkpoints:[], maxSlots:1,
      correctFeedback:'Le pas +1 déclenche une cascade complète : 999 devient 1’000 et les trois rangs inférieurs reviennent à zéro.',
      unlocked:'Détecteur de passage'
    },
    {
      id:'bug', chapter:'Déboguer un raisonnement', title:'La console improvise 10 | 5 | 6',
      bip:'Techniquement, elle a utilisé tous les chiffres. Mathématiquement… elle a peut-être besoin de nous.',
      prompt:'Pour calculer 956 + 100, la console écrit 10 centaines | 5 dizaines | 6 unités. Quelle réparation appliquer ?',
      current:'956', target:'1’056', command:'+100', before:[0,9,5,6], after:[1,0,5,6], result:'1’056',
      trace:['9 centaines + 1 centaine = 10 centaines.', '10 centaines s’échangent contre 1 millier.', 'Les 5 dizaines et 6 unités restent stables.'],
      choices:[
        {label:'Conserver 10 | 5 | 6',detail:'Une colonne ne peut pas garder 10 centaines : cet affichage n’est pas une écriture de position valide.',code:'KEEP 10-5-6',result:'10 | 5 | 6',digits:[0,10,5,6]},
        {label:'Échanger 10 centaines, puis afficher 1’056',detail:'Le résultat intermédiaire est regroupé en un millier avant l’affichage.',code:'FIX EXCHANGE',result:'1’056',digits:[1,0,5,6],correct:true},
        {label:'Ajouter 1 aux unités et afficher 957',detail:'956 + 1 donne 957 : cette réparation remplace à tort +100 par +1.',code:'FIX 0957',result:'957',digits:[0,9,5,7]}
      ], wrongIndex:0,
      available:[10,100,-100], checkpoints:[], maxSlots:1, preload:[10],
      correctFeedback:'Le bug est réparé avant l’affichage : dix centaines deviennent un millier, et 956 + 100 donne 1’056.',
      unlocked:'Analyseur d’erreurs'
    },
    {
      id:'degroupement', chapter:'Inverser un échange', title:'La colonne vide',
      bip:'La console refuse de retirer une centaine parce qu’elle n’en voit aucune. Elle oublie ce que contient le millier.',
      prompt:'Comment la console peut-elle calculer 1’004 − 100 alors que la colonne des centaines affiche zéro ?',
      current:'1’004', target:'904', command:'−100', before:[1,0,0,4], after:[0,9,0,4], result:'904',
      trace:['1 millier s’ouvre en 10 centaines.', 'La console retire 1 centaine.', 'Il reste 9 centaines, 0 dizaine et 4 unités.'],
      choices:[
        {label:'Déclarer la commande impossible',detail:'La console s’arrête à 1’004 et oublie qu’un millier peut s’ouvrir en centaines.',code:'HALT EMPTY',result:'ARRÊT',digits:[1,0,0,4]},
        {label:'Ouvrir 1 millier, puis retirer 1 centaine',detail:'Le dégroupement rend dix centaines disponibles et conduit à 904.',code:'OPEN 1000',result:'904',digits:[0,9,0,4],correct:true},
        {label:'Retirer le millier entier',detail:'1’004 − 1’000 donne 4 : cette commande retire dix fois trop.',code:'SUB 1000',result:'4',digits:[0,0,0,4]}
      ], wrongIndex:0,
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
      choices:[
        {label:'−1’000, −100, −10',detail:'Le programme retire 1’110 et s’arrête à 1’306 : il reste encore une unité à retirer.',code:'RUN -1110',result:'1’306',digits:[1,3,0,6]},
        {label:'−1’000, −100, −10, −1',detail:'Le programme retire exactement 1’111 et atteint 1’305.',code:'RUN -1111',result:'1’305',digits:[1,3,0,5],correct:true},
        {label:'−1’000, −100, −1',detail:'Le programme retire 1’101 et atteint 1’315 : le pas de −10 manque.',code:'RUN -1101',result:'1’315',digits:[1,3,1,5]}
      ], wrongIndex:0,
      available:[-1,-10,-100,-1000], checkpoints:[1416,1316,1306], maxSlots:4,
      correctFeedback:'Le programme coordonne −1, −10, −100 et −1’000. Chaque commande agit sur un rang et la console atteint exactement 1’305.',
      unlocked:'Certification finale'
    }
  ];

  let view: View = 'intro';
  let sceneIndex = 0;
  let program: number[] = [];
  let runTrace: number[] = [];
  let consoleMessage = '';
  let announcement = '';
  let rootElement: HTMLElement;
  $: scene = scenes[sceneIndex];
  $: startValue = parseNumber(scene.current);
  $: displayedValue = runTrace.at(-1) ?? startValue;
  $: displayedNumber = formatNumber(displayedValue);
  $: displayedDigits = digitsFor(displayedValue);
  $: smokeState = view === 'intro' ? 'ready' : view;

  function parseNumber(value: string): number { return Number(value.replaceAll('’', '')); }
  function formatNumber(value: number): string { return value.toLocaleString('fr-CH'); }
  function digitsFor(value: number): Digits {
    const safe = Math.max(0, value);
    return [Math.floor(safe / 1000) % 10, Math.floor(safe / 100) % 10, Math.floor(safe / 10) % 10, safe % 10];
  }
  function commandLabel(command: number): string { return `${command > 0 ? '+' : '−'}${Math.abs(command).toLocaleString('fr-CH')}`; }
  function commandCode(command: number): string { return `${command > 0 ? 'ADD' : 'SUB'} ${String(Math.abs(command)).padStart(4, '0')}`; }

  async function focus(selector: string): Promise<void> { await tick(); rootElement.querySelector<HTMLElement>(selector)?.focus(); }
  function loadScene(): void {
    const current = scenes[sceneIndex];
    program = [...(current.preload ?? [])];
    runTrace = [];
    consoleMessage = current.preload ? 'Bip a laissé un programme dans la console. Exécute-le, puis répare-le.' : 'Ajoute des commandes, puis exécute le programme.';
    view = 'question';
  }
  function editProgram(next: number[]): void { program = next; runTrace = []; consoleMessage = 'Programme modifié. La console attend une nouvelle exécution.'; }
  function addCommand(command: number): void {
    if (program.length >= scene.maxSlots) { consoleMessage = `Le programme possède seulement ${scene.maxSlots} emplacement${scene.maxSlots > 1 ? 's' : ''}.`; return; }
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
      view = 'correct'; consoleMessage = 'Route validée.'; announcement = scene.correctFeedback; void focus('[data-smoke-feedback]');
    } else if (!routeIsCorrect) {
      const expected = scene.checkpoints.find((checkpoint, index) => values[index] !== checkpoint);
      consoleMessage = `La route atteint ${formatNumber(finalValue)}, mais elle manque d’abord la borne ${formatNumber(expected ?? scene.checkpoints[0])}. Modifie l’ordre.`;
    } else {
      consoleMessage = `La console atteint ${formatNumber(finalValue)} au lieu de ${scene.target}. Le programme reste modifiable.`;
    }
  }
  function execute(): void {
    if (program.length === 0) { consoleMessage = 'Le programme est vide. Ajoute au moins une commande.'; return; }
    let value = startValue; const values: number[] = [];
    for (const command of program) { value += command; values.push(value); }
    runTrace = values; evaluate(values);
  }
  function step(): void {
    if (program.length === 0) { consoleMessage = 'Ajoute une commande avant de lancer le pas à pas.'; return; }
    if (runTrace.length >= program.length) runTrace = [];
    const index = runTrace.length;
    const value = (runTrace.at(-1) ?? startValue) + program[index];
    runTrace = [...runTrace, value];
    consoleMessage = `Étape ${index + 1} : ${commandLabel(program[index])} donne ${formatNumber(value)}.`;
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

<main class="prototype-root" data-smoke-root data-smoke-exercise="EX-0003" data-smoke-program="pilot-seq-n1" data-smoke-state={smokeState} bind:this={rootElement}>
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

            <div class="console" aria-label={`Console affichant ${scene.current}, cible ${scene.target}`}>
              <div class="console-top"><span>INVENT-O-MATIC / journal actif</span><span class="live"><i></i> local</span></div>
              <div class="display-row">
                <div class="number-screen"><small>{runTrace.length === 0 ? 'Valeur de départ' : 'Valeur exécutée'}</small><strong>{displayedNumber}</strong><span>{view==='correct'?'Résultat vérifié':scene.command}</span></div>
                <div class="target-screen"><small>Cible</small><strong>{scene.target}</strong><span>{scene.unlocked}</span></div>
              </div>
              {#if scene.checkpoints.length > 0}
                <div class="checkpoint-row"><span>Bornes obligatoires</span>{#each scene.checkpoints as checkpoint,index}<b class:reached={runTrace[index] === checkpoint}>{index + 1}. {formatNumber(checkpoint)}</b>{/each}</div>
              {/if}
              <div class="digit-grid">
                {#each displayedDigits as digit,index}
                  <div class:changed={runTrace.length > 0 && displayedDigits[index]!==scene.before[index]}><span>{rankLabels[index]}</span><b>{digit}</b><small>× {10 ** (3-index)}</small></div>
                {/each}
              </div>
              <div class="console-status"><span class:ok={view==='correct'}>{view==='correct'?'ROUTE VALIDÉE':runTrace.length>0?'TRACE DISPONIBLE':'EN ATTENTE DE PROGRAMME'}</span><code>{runTrace.length}/{program.length} ÉTAPES</code></div>
            </div>

            {#if view === 'question'}
              <section class="programmer" aria-label="Séquenceur de commandes">
                <div class="programmer-head"><div><span>Programme</span><strong>{program.length} / {scene.maxSlots} emplacements</strong></div><button class="text-button" type="button" onclick={clearProgram} disabled={program.length === 0}>Tout effacer</button></div>
                <div class="program-slots" aria-label="Programme actuel">
                  {#each Array(scene.maxSlots) as _,index}
                    {#if program[index] !== undefined}
                      <div class="program-chip">
                        <code>{commandCode(program[index])}</code><strong>{commandLabel(program[index])}</strong>
                        <div><button type="button" aria-label={`Déplacer ${commandLabel(program[index])} à gauche`} onclick={() => moveCommand(index,-1)} disabled={index===0}>←</button><button type="button" aria-label={`Supprimer ${commandLabel(program[index])}`} onclick={() => removeCommand(index)}>×</button><button type="button" aria-label={`Déplacer ${commandLabel(program[index])} à droite`} onclick={() => moveCommand(index,1)} disabled={index===program.length-1}>→</button></div>
                      </div>
                    {:else}<div class="empty-slot"><span>{index + 1}</span><small>emplacement libre</small></div>{/if}
                  {/each}
                </div>
                <div class="command-rack" aria-label="Commandes disponibles">
                  <span>Commandes disponibles</span>
                  <div>{#each scene.available as command}<button type="button" onclick={() => addCommand(command)} disabled={program.length>=scene.maxSlots}><code>{commandCode(command)}</code><strong>{commandLabel(command)}</strong></button>{/each}</div>
                </div>
                <div class="run-controls"><button class="secondary" type="button" onclick={step}>Pas à pas</button><button class="primary" type="button" onclick={execute}>Exécuter le programme <span aria-hidden="true">▶</span></button></div>
                <div class="program-message" role="status"><span aria-hidden="true">›_</span><p>{consoleMessage}</p></div>
                {#if runTrace.length > 0}<ol class="live-trace" aria-label="Trace exécutée"><li><span>Départ</span><strong>{scene.current}</strong></li>{#each runTrace as value,index}<li><span>{commandLabel(program[index])}</span><strong>{formatNumber(value)}</strong></li>{/each}</ol>{/if}
              </section>
              <p class="safe"><span aria-hidden="true">↺</span> Exécute, observe la trace, puis déplace ou remplace les commandes. Rien n’est perdu.</p>
            {:else}
              <div class="feedback good" role="status" tabindex="-1" data-smoke-feedback="correct" data-smoke-feedback-detail><span aria-hidden="true">✓</span><div><small>Module validé · {scene.unlocked}</small><h2>{scene.result} est cohérent.</h2><p>{scene.correctFeedback}</p></div></div>
              <div class="trace"><span>Trace de la console</span><ol>{#each scene.trace as step}<li>{step}</li>{/each}</ol></div>
              <div class="actions"><button class="primary" type="button" data-smoke-action="continue" onclick={continueStory}>{sceneIndex===scenes.length-1?'Lancer la démonstration':'Test suivant'} <span aria-hidden="true">→</span></button></div>
            {/if}
          </article>
        </section>
      {:else if view === 'complete'}
        <section class="completion" aria-labelledby="complete-title">
          <div class="festival-art" aria-hidden="true"><img class="scene-art" src={outroConsole} alt="" /></div>
          <div class="completion-copy"><p class="eyebrow"><span>Chapitre B terminé</span> Fête des inventions</p><h1 id="complete-title" tabindex="-1" data-smoke-completion>La console est prête.<br />Bip aussi. Presque.</h1><p>Tu as choisi des pas, prévu des passages de rang, réparé un résultat impossible et programmé la transformation finale. La machine peut maintenant changer une valeur sans perdre la structure du nombre.</p><blockquote>« Elle affiche exactement 1’305. Je savais qu’elle y arriverait dès que tu as réparé tout ce que j’avais programmé. »</blockquote><div class="completion-actions"><a class="primary" href="/runner/?id=EX-0002">Rejouer le chapitre A</a><button class="text-button" type="button" onclick={restart}>Recommencer les tests</button></div><small>Prototype local : aucune réponse n’est enregistrée ni envoyée.</small></div>
        </section>
      {/if}
    </div>
  {/if}
  <p class="sr-only" aria-live="polite">{announcement}</p>
</main>

<style>
  :global(*){box-sizing:border-box}:global(button),:global(a){-webkit-tap-highlight-color:transparent}
  .prototype-root{--ink:#122631;--muted:#65757d;--paper:#fffaf0;--cream:#eee9df;--line:#c9c7bf;--navy:#142f44;--blue:#2f63ce;--cyan:#38b8b0;--lime:#c8ee6b;--coral:#ed7458;--yellow:#f4c957;position:relative;min-height:calc(100vh - 42px);overflow:hidden;color:var(--ink);background:var(--cream);font-family:"Segoe UI Variable","Segoe UI",system-ui,sans-serif}
  .circuit-bg{position:fixed;inset:42px 0 0;pointer-events:none;opacity:.18;background-image:linear-gradient(90deg,transparent 47%,#61727a 48% 52%,transparent 53%),linear-gradient(transparent 47%,#61727a 48% 52%,transparent 53%);background-size:68px 68px;mask-image:linear-gradient(#000,transparent 88%)}
  button,a{font:inherit}button:focus-visible,a:focus-visible{outline:4px solid var(--yellow);outline-offset:3px}
  .eyebrow{margin:0;color:var(--blue);font-size:.7rem;font-weight:900;letter-spacing:.11em;text-transform:uppercase}.eyebrow span{display:inline-block;margin-right:8px;padding:6px 8px;color:white;background:var(--blue);border-radius:999px}
  .intro{position:relative;z-index:1;display:grid;min-height:calc(100vh - 42px);width:min(1250px,calc(100% - 48px));margin:auto;grid-template-columns:1.08fr .92fr;align-items:center;gap:clamp(40px,7vw,105px);padding:60px 0}.intro-copy,.test-card,.completion-copy{min-width:0}
  .intro h1,.test-card h1,.completion h1{font-family:Georgia,serif;font-weight:500;letter-spacing:-.055em;line-height:.94}.intro h1{margin:24px 0;font-size:clamp(4rem,8vw,8rem)}.intro h1 em{color:var(--blue);font-weight:500}
  .lead{max-width:660px;margin:0;color:var(--muted);font-size:clamp(1.02rem,1.7vw,1.25rem);line-height:1.65}.dialogue{display:grid;max-width:640px;grid-template-columns:auto 1fr;gap:12px;align-items:center;margin-top:28px;padding:14px 16px;border:1px solid var(--line);border-radius:14px;background:rgba(255,250,240,.85)}.dialogue p{margin:0;font-size:.86rem;line-height:1.5}.avatar{display:grid;width:39px;height:39px;place-items:center;color:var(--yellow);background:var(--navy);border-radius:50%;font-family:Georgia,serif;font-weight:900}
  .intro-actions,.completion-actions{display:flex;align-items:center;gap:17px;flex-wrap:wrap;margin-top:30px}.intro-actions>a{color:var(--blue);font-size:.76rem;font-weight:800}.intro-actions>span{color:var(--muted);font-size:.75rem}
  .primary,.secondary,.text-button{min-height:48px;border-radius:8px;font-weight:850;cursor:pointer}.primary{display:inline-flex;align-items:center;justify-content:center;gap:22px;padding:12px 18px;color:white;background:var(--navy);border:1px solid var(--navy);box-shadow:0 5px 0 #091a24;text-decoration:none}.primary:hover{background:var(--blue);transform:translateY(-1px)}.secondary{padding:11px 17px;color:var(--ink);background:white;border:1px solid var(--ink)}.text-button{padding:10px 3px;color:var(--blue);background:transparent;border:0;text-decoration:underline}
  .console-art{position:relative;min-height:555px;overflow:hidden;border:1px solid #8195a2;border-radius:40px 40px 18px 18px;background:linear-gradient(#18394e 0 62%,#d1a65c 62%);box-shadow:20px 23px 0 rgba(18,38,49,.1)}.scene-art{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .hero-console{position:absolute;right:35px;bottom:55px;width:310px;height:330px;padding:24px;border:5px solid #071b27;border-radius:24px;background:#356879;box-shadow:10px 12px 0 rgba(0,0,0,.25)}.screen{display:flex;height:112px;align-items:center;justify-content:space-between;padding:18px;border:4px solid #071b27;border-radius:10px;color:var(--lime);background:#0e252b;font-family:ui-monospace,monospace}.screen span{font-size:2.3rem;font-weight:900}.screen i{display:grid;width:42px;height:42px;place-items:center;color:var(--ink);background:var(--yellow);border-radius:50%;font-style:normal;font-size:1.6rem}
  .lamps{display:flex;gap:13px;margin:18px 2px}.lamps i{width:19px;height:19px;border:3px solid #071b27;border-radius:50%;background:var(--coral)}.lamps i:nth-child(2){background:var(--yellow)}.lamps i:nth-child(3){background:var(--lime)}.lamps i:nth-child(4){background:var(--cyan)}
  .keys{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.keys b{display:grid;height:54px;place-items:center;border:3px solid #071b27;border-radius:8px;background:#e8e3d5;box-shadow:0 4px 0 #071b27;font-family:ui-monospace,monospace}
  .warning-card{position:absolute;z-index:4;top:45px;left:30px;padding:14px 16px;color:#19313c;background:var(--yellow);border:3px solid #071b27;box-shadow:7px 8px 0 #071b27;font-family:ui-monospace,monospace;font-size:.66rem;font-weight:900;line-height:1.6;transform:rotate(-5deg)}.warning-card strong{font-size:1.25rem}
  .bip-sprite{display:block;object-fit:contain;filter:drop-shadow(8px 10px 0 rgba(18,38,49,.18));user-select:none}.hero-bip{position:absolute;z-index:5;left:20px;bottom:24px;width:220px;height:350px}.panel-bip{width:112px;height:180px;margin:auto;animation:bipIdle 3.8s ease-in-out infinite}.completion-bip{position:absolute;z-index:5;left:16px;bottom:18px;width:300px;height:390px}@keyframes bipIdle{0%,100%{transform:translateY(0) rotate(-.5deg)}50%{transform:translateY(-5px) rotate(.5deg)}}
  .game-shell{position:relative;z-index:1;width:min(1320px,calc(100% - 38px));margin:auto;padding:17px 0 48px}.game-header{display:flex;min-height:62px;align-items:center;justify-content:space-between;gap:30px;margin-bottom:27px}.brand{display:flex;align-items:center;gap:10px;color:var(--ink);text-decoration:none;font-size:.78rem}.brand span{display:grid;width:38px;height:38px;place-items:center;color:var(--lime);background:var(--navy);border-radius:8px}.progress{width:min(430px,54vw)}.progress>div:first-child{display:flex;justify-content:space-between;margin-bottom:7px;color:var(--muted);font-size:.67rem}.progress>div:last-child{height:7px;overflow:hidden;background:#d0cec6;border-radius:99px}.progress i{display:block;height:100%;background:var(--cyan);border-radius:inherit}.certified{padding:8px 12px;color:var(--navy);border:1px solid var(--blue);border-radius:999px;font-size:.68rem;font-weight:850;text-transform:uppercase}
  .scene-grid{display:grid;grid-template-columns:230px minmax(0,1fr);gap:22px;align-items:start}.bip-panel{position:sticky;top:17px;padding:20px 16px;border:1px solid var(--line);border-radius:17px;background:rgba(255,250,240,.85)}.speech{margin-top:8px;padding:14px;background:white;border:1px solid var(--line);border-radius:11px}.speech span{color:var(--coral);font-size:.64rem;font-weight:900;text-transform:uppercase}.speech p{margin:5px 0 0;font-size:.78rem;line-height:1.5}.test-list{display:grid;gap:7px;margin-top:18px;padding-top:15px;border-top:1px solid var(--line)}.test-list>span{display:grid;grid-template-columns:25px 1fr;gap:8px;align-items:center;color:#8b9295;font-size:.63rem}.test-list i{display:grid;width:25px;height:25px;place-items:center;border:1px solid var(--line);border-radius:50%;font-style:normal;font-weight:850}.test-list span.current{color:var(--ink);font-weight:850}.test-list .current i{color:white;background:var(--blue);border-color:var(--blue)}.test-list .done i{color:var(--navy);background:var(--lime);border-color:var(--lime)}
  .test-card{padding:clamp(24px,4.5vw,58px);background:rgba(255,250,240,.96);border:1px solid #bdbdb6;border-radius:18px;box-shadow:0 20px 55px rgba(18,38,49,.1)}.test-card h1{margin:15px 0 13px;font-size:clamp(2.65rem,5.5vw,5.25rem)}.prompt{max-width:850px;margin:0;color:var(--muted);font-size:1rem;line-height:1.6}
  .console{margin-top:28px;padding:16px;color:#eafbf3;background:var(--navy);border:4px solid #071923;border-radius:15px;box-shadow:8px 9px 0 #071923}.console-top{display:flex;justify-content:space-between;padding:3px 3px 13px;color:#9db2bd;font-family:ui-monospace,monospace;font-size:.6rem;font-weight:800;letter-spacing:.06em}.live{display:flex;align-items:center;gap:5px}.live i{width:7px;height:7px;background:var(--lime);border-radius:50%}.display-row{display:grid;grid-template-columns:1.3fr .7fr;gap:8px}.number-screen,.target-screen{padding:15px;border:2px solid #67808a;border-radius:9px;background:#0c232c}.number-screen small,.target-screen small,.number-screen span,.target-screen span{display:block;color:#8ba0a8;font-family:ui-monospace,monospace;font-size:.57rem;text-transform:uppercase}.number-screen strong,.target-screen strong{display:block;margin:6px 0;color:var(--lime);font-family:ui-monospace,monospace;font-size:clamp(2rem,4vw,3.7rem);line-height:1}.target-screen strong{color:var(--yellow)}
  .digit-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:8px}.digit-grid div{padding:10px;text-align:center;border:1px solid #58717b;border-radius:8px;background:#1d3d4a}.digit-grid div.changed{color:var(--navy);background:var(--lime);border-color:var(--lime)}.digit-grid span,.digit-grid small{display:block;font-family:ui-monospace,monospace;font-size:.52rem;text-transform:uppercase}.digit-grid b{display:block;margin:5px 0;font-size:1.45rem}.console-status{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:8px;padding:9px 10px;background:#091c25;border-radius:7px}.console-status span{color:var(--yellow);font-size:.58rem;font-weight:900;letter-spacing:.06em}.console-status span.ok{color:var(--lime)}.console-status code{color:#82979f;font-size:.58rem}
  .commands{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-top:28px}.commands button{min-height:150px;padding:16px;text-align:left;color:var(--ink);background:white;border:1px solid var(--line);border-radius:10px;cursor:pointer;transition:transform .15s,border-color .15s,box-shadow .15s}.commands button:hover{border-color:var(--blue);transform:translateY(-3px);box-shadow:0 7px 0 rgba(47,99,206,.15)}.commands code{display:inline-block;margin-bottom:17px;padding:5px 7px;color:var(--lime);background:var(--navy);border-radius:5px;font-size:.58rem}.commands strong,.commands span{display:block}.commands strong{font-size:1.04rem}.commands span{margin-top:8px;color:var(--muted);font-size:.7rem;line-height:1.45}
  .checkpoint-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:8px;padding:9px;background:#0b222b;border-radius:7px}.checkpoint-row>span{margin-right:auto;color:#8ba0a8;font-family:ui-monospace,monospace;font-size:.56rem;text-transform:uppercase}.checkpoint-row b{padding:6px 8px;color:var(--yellow);border:1px solid #58717b;border-radius:5px;font-family:ui-monospace,monospace;font-size:.65rem}.checkpoint-row b.reached{color:var(--navy);background:var(--lime);border-color:var(--lime)}
  .programmer{margin-top:26px;padding:17px;border:1px solid var(--line);border-radius:13px;background:#fffdf7}.programmer-head{display:flex;align-items:center;justify-content:space-between;gap:15px}.programmer-head>div span,.programmer-head>div strong{display:block}.programmer-head span{color:var(--blue);font-size:.62rem;font-weight:900;text-transform:uppercase}.programmer-head strong{margin-top:4px;font-size:.82rem}.programmer-head button:disabled{opacity:.4}
  .program-slots{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:13px}.program-chip,.empty-slot{min-height:120px;padding:11px;border-radius:9px}.program-chip{display:flex;flex-direction:column;color:white;background:var(--navy);border:2px solid #071923}.program-chip code{color:#8aa6b4;font-size:.55rem}.program-chip>strong{margin:auto 0;color:var(--lime);font-family:ui-monospace,monospace;font-size:1.4rem}.program-chip>div{display:grid;grid-template-columns:repeat(3,1fr);gap:4px}.program-chip button{min-height:31px;color:white;background:#244b60;border:1px solid #537184;border-radius:5px;cursor:pointer}.program-chip button:disabled{opacity:.25}.empty-slot{display:grid;place-items:center;color:#8c9495;border:2px dashed #c9c7bf;background:#f0eee8;text-align:center}.empty-slot span{display:grid;width:25px;height:25px;place-items:center;border:1px solid #b7b5ae;border-radius:50%;font-size:.65rem}.empty-slot small{font-size:.58rem;text-transform:uppercase}
  .command-rack{margin-top:13px;padding:12px;background:#e8edf0;border-radius:9px}.command-rack>span{color:var(--muted);font-size:.6rem;font-weight:900;text-transform:uppercase}.command-rack>div{display:flex;gap:7px;flex-wrap:wrap;margin-top:9px}.command-rack button{display:flex;min-height:54px;align-items:center;gap:10px;padding:9px 12px;color:var(--ink);background:white;border:1px solid #9aa8ad;border-radius:7px;cursor:pointer}.command-rack button:hover{border-color:var(--blue);transform:translateY(-1px)}.command-rack button:disabled{opacity:.38;cursor:not-allowed}.command-rack code{color:var(--muted);font-size:.52rem}.command-rack strong{font-family:ui-monospace,monospace;font-size:1rem}
  .run-controls{display:flex;justify-content:flex-end;gap:10px;margin-top:13px}.program-message{display:flex;gap:10px;align-items:center;min-height:52px;margin-top:11px;padding:10px 12px;color:#d9f5ed;background:var(--navy);border-radius:8px}.program-message>span{color:var(--lime);font-family:ui-monospace,monospace;font-weight:900}.program-message p{margin:0;font-size:.72rem;line-height:1.45}.live-trace{display:flex;gap:6px;overflow-x:auto;margin:10px 0 0;padding:0;list-style:none}.live-trace li{min-width:92px;padding:8px 10px;background:#eef2ed;border:1px solid #ced5cd;border-radius:7px}.live-trace span,.live-trace strong{display:block}.live-trace span{color:var(--muted);font-size:.55rem;text-transform:uppercase}.live-trace strong{margin-top:4px;font-family:ui-monospace,monospace;font-size:.9rem}
  .safe{margin:14px 0 0;color:var(--muted);font-size:.7rem}.safe span{color:var(--blue);font-size:1rem}
  .feedback{display:grid;grid-template-columns:auto 1fr;gap:17px;margin-top:28px;padding:21px;border:1px solid;border-radius:12px}.feedback.bad{background:#fff0e9;border-color:#d99f8e}.feedback.good{background:#ebf5e4;border-color:#9cc08a}.feedback>span{display:grid;width:44px;height:44px;place-items:center;color:white;background:var(--coral);border-radius:10px;font-size:1.3rem;font-weight:900}.feedback.good>span{color:var(--navy);background:var(--lime)}.feedback small{color:var(--coral);font-size:.61rem;font-weight:900;text-transform:uppercase}.feedback.good small{color:#527133}.feedback h2{margin:5px 0 8px;font-family:Georgia,serif;font-size:1.8rem;font-weight:500}.feedback p{margin:0;color:var(--muted);font-size:.79rem;line-height:1.55}.feedback blockquote{margin:13px 0 0;padding:10px 12px;border-left:4px solid var(--coral);background:rgba(255,255,255,.7);font-size:.76rem;line-height:1.5}.actions{display:flex;justify-content:flex-end;margin-top:17px}
  .trace{margin-top:11px;padding:16px;background:white;border:1px solid var(--line);border-radius:10px}.trace>span{color:var(--blue);font-size:.62rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.trace ol{display:grid;gap:8px;margin:13px 0 0;padding-left:24px}.trace li{padding-left:6px;color:var(--muted);font-size:.75rem;line-height:1.4}.trace li::marker{color:var(--blue);font-weight:900}
  .completion{display:grid;min-height:calc(100vh - 140px);grid-template-columns:.95fr 1.05fr;gap:clamp(35px,7vw,95px);align-items:center;padding:44px 5vw;background:var(--paper);border:1px solid var(--line);border-radius:22px}.festival-art{position:relative;min-height:520px;overflow:hidden;border-radius:44% 44% 18px 18px;background:linear-gradient(#142e49 0 65%,#dcaa59 65%)}.final-machine{position:absolute;right:40px;bottom:48px;width:245px;height:285px;padding:30px;border:5px solid #071923;border-radius:24px;background:#376777;box-shadow:10px 12px 0 rgba(0,0,0,.25)}.final-machine span{display:block;padding:18px;color:var(--lime);background:#0b2229;border:3px solid #071923;border-radius:8px;font-family:ui-monospace,monospace;font-size:2rem;font-weight:900;text-align:center}.final-machine b{display:grid;width:90px;height:90px;margin:32px auto 0;place-items:center;color:var(--navy);background:var(--lime);border-radius:50%;font-size:2.7rem}.sky-lights i{position:absolute;left:var(--x);top:var(--y);width:9px;height:9px;background:var(--yellow);border-radius:50%;box-shadow:0 0 15px var(--yellow)}.completion h1{margin:20px 0;font-size:clamp(3rem,6vw,6rem)}.completion-copy>p:not(.eyebrow){color:var(--muted);line-height:1.7}.completion blockquote{margin:24px 0;padding:16px;border-left:5px solid var(--coral);background:var(--cream);font-family:Georgia,serif;font-size:1.03rem;line-height:1.5}.completion-copy>small{display:block;margin-top:23px;color:var(--muted);font-size:.67rem}
  .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
  @media(max-width:900px){.intro{grid-template-columns:1fr}.scene-grid{grid-template-columns:1fr}.bip-panel{position:static;display:grid;grid-template-columns:120px 1fr}.test-list{display:none}.completion{grid-template-columns:1fr}.festival-art{min-height:430px}}
  @media(max-width:620px){.prototype-root{overflow-x:hidden}.intro,.game-shell{width:calc(100% - 24px)}.intro{padding:34px 0}.intro h1{font-size:clamp(2.9rem,13.8vw,3.8rem)}.console-art{min-height:410px}.hero-console{right:12px;width:235px;height:280px;transform:scale(.82);transform-origin:bottom right}.warning-card{top:22px;left:16px}.hero-bip{left:0;bottom:10px;width:170px;height:290px}.intro-actions{align-items:stretch;flex-direction:column}.intro-actions .primary{width:100%}.game-header{align-items:flex-start}.progress{width:55vw}.bip-panel{grid-template-columns:90px 1fr;padding:13px}.panel-bip{width:82px;height:126px}.speech{margin:0}.test-card{padding:20px 13px}.test-card h1{font-size:2.65rem}.display-row{grid-template-columns:1fr}.digit-grid{grid-template-columns:repeat(2,1fr)}.console-status{align-items:flex-start;flex-direction:column}.commands{grid-template-columns:1fr}.commands button{min-height:112px}.program-slots{grid-template-columns:repeat(2,1fr)}.program-chip,.empty-slot{min-height:105px}.run-controls{align-items:stretch;flex-direction:column}.run-controls button{width:100%}.feedback{grid-template-columns:1fr}.actions{justify-content:stretch}.actions button{width:100%}.completion{padding:24px 14px}.festival-art{min-height:340px}.final-machine{right:7px;transform:scale(.72);transform-origin:bottom right}.completion-bip{left:0;bottom:6px;width:220px;height:300px}.completion h1{font-size:3rem}.completion-actions{align-items:stretch;flex-direction:column}.completion-actions .primary,.completion-actions button{width:100%}}
  @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
</style>
