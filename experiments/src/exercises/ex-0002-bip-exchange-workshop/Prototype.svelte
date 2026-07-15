<script lang="ts">
  import { tick } from 'svelte';
  import bipThinking from './assets/bip-thinking.png';
  import itemPiece from './assets/item-piece.png';
  import itemSachet from './assets/item-sachet.png';
  import itemCrate from './assets/item-crate.png';
  import itemPallet from './assets/item-pallet.png';
  import introWorkshop from './assets/intro-workshop.jpg';
  import outroWorkshop from './assets/outro-workshop.jpg';

  type View = 'intro' | 'question' | 'correct' | 'complete';
  type RankCounts = [number, number, number, number];
  type WorkshopAction = 'groupUnits' | 'openTens' | 'groupTens' | 'openHundreds' | 'groupHundreds' | 'openThousands';

  type Scene = {
    id: string;
    chapter: string;
    title: string;
    bip: string;
    prompt: string;
    before: RankCounts;
    beforeNumber: string;
    after: RankCounts;
    afterNumber: string;
    equation: string;
    allowed: WorkshopAction[];
    mode?: 'delivery';
    constraint: string;
    correctFeedback: string;
    unlocked: string;
  };

  const rankNames = ['Palettes', 'Caisses', 'Sachets', 'Pièces'];
  const rankValues = ['1’000', '100', '10', '1'];
  const rankAssets = [itemPallet, itemCrate, itemSachet, itemPiece];
  const deliveryOptions: Array<1 | 10 | 100> = [1, 10, 100];
  const actionVisuals: Record<WorkshopAction, { verb: string; from: number; to: number; fromCount: number; toCount: number; label: string }> = {
    groupUnits: { verb: 'Assembler', from: 3, to: 2, fromCount: 10, toCount: 1, label: 'Assembler 10 pièces en 1 sachet' },
    openTens: { verb: 'Ouvrir', from: 2, to: 3, fromCount: 1, toCount: 10, label: 'Ouvrir 1 sachet en 10 pièces' },
    groupTens: { verb: 'Empaqueter', from: 2, to: 1, fromCount: 10, toCount: 1, label: 'Empaqueter 10 sachets dans 1 caisse' },
    openHundreds: { verb: 'Déballer', from: 1, to: 2, fromCount: 1, toCount: 10, label: 'Déballer 1 caisse en 10 sachets' },
    groupHundreds: { verb: 'Palettiser', from: 1, to: 0, fromCount: 10, toCount: 1, label: 'Placer 10 caisses sur 1 palette' },
    openThousands: { verb: 'Décharger', from: 0, to: 1, fromCount: 1, toCount: 10, label: 'Décharger 1 palette en 10 caisses' }
  };

  const scenes: Scene[] = [
    {
      id: 'porte',
      chapter: 'Prendre en main',
      title: 'La porte est bloquée',
      bip: 'Bonne nouvelle : ma machine est terminée. Petite mauvaise nouvelle : je ne peux plus atteindre la porte.',
      prompt: 'Douze pièces sont en vrac. Quel premier rangement permet de libérer de la place sans perdre de pièce ?',
      before: [0, 0, 0, 12],
      beforeNumber: '12',
      after: [0, 0, 1, 2],
      afterNumber: '12',
      equation: '12 pièces = 1 sachet de 10 + 2 pièces',
      allowed: ['groupUnits', 'openTens'],
      constraint: 'Former un sachet exact et garder toutes les pièces.',
      correctFeedback: 'Le contenant visible a changé, mais il renferme toujours dix pièces. Avec les deux pièces restantes, la quantité totale reste 12.',
      unlocked: 'La porte de l’atelier'
    },
    {
      id: 'deux-formes',
      chapter: 'Explorer les échanges',
      title: 'Bip veut vérifier une idée',
      bip: 'Si un nombre peut changer de rangement sans changer de quantité… il devrait pouvoir porter plusieurs costumes, non ?',
      prompt: 'L’étagère affiche 34. Quelle autre organisation représente encore exactement 34 pièces ?',
      before: [0, 0, 3, 4],
      beforeNumber: '34',
      after: [0, 0, 2, 14],
      afterNumber: '34',
      equation: '3 × 10 + 4 = 2 × 10 + 14 = 34',
      allowed: ['groupUnits', 'openTens'],
      constraint: 'Obtenir une autre organisation de 34.',
      correctFeedback: 'Ouvrir un sachet rend dix pièces à la table : 3 sachets et 4 pièces deviennent 2 sachets et 14 pièces. La quantité 34 est conservée.',
      unlocked: 'Le tiroir réversible'
    },
    {
      id: 'cascade',
      chapter: 'Découvrir un nouveau rang',
      title: 'L’étagère n’a que neuf places',
      bip: 'J’ai ajouté un sachet. L’étagère devrait être mieux rangée… Pourquoi y en a-t-il maintenant dix ?',
      prompt: 'Il y a 9 sachets et 13 pièces. Quel rangement respecte la limite de neuf éléments par rang ?',
      before: [0, 0, 9, 13],
      beforeNumber: '103',
      after: [0, 1, 0, 3],
      afterNumber: '103',
      equation: '9 dizaines + 13 unités = 10 dizaines + 3 unités = 103',
      allowed: ['groupUnits', 'openTens', 'groupTens', 'openHundreds'],
      constraint: 'Aucun rang ne peut garder plus de 9 objets.',
      correctFeedback: 'Dix pièces forment le dixième sachet, puis dix sachets forment une caisse. Aucun sachet isolé ne reste : le zéro garde sa place dans 103.',
      unlocked: 'Le module des centaines'
    },
    {
      id: 'livraison',
      chapter: 'Choisir un pas',
      title: 'La livraison doit atteindre 300',
      bip: 'Le bon de commande dit 300. Mon plan « ajouter un peu au hasard » manque peut-être de précision.',
      prompt: 'La réserve contient 270 pièces. Quelle livraison régulière produit 280, puis 290, puis 300 ?',
      before: [0, 2, 7, 0],
      beforeNumber: '270',
      after: [0, 3, 0, 0],
      afterNumber: '300',
      equation: '270 → 280 → 290 → 300  (pas de +10)',
      allowed: [],
      mode: 'delivery',
      constraint: 'Atteindre 300 avec trois livraisons régulières.',
      correctFeedback: 'Chaque sachet ajoute une dizaine. À 290, le nouveau sachet complète dix dizaines : elles sont échangées contre une troisième caisse.',
      unlocked: 'Le convoyeur régulier'
    },
    {
      id: 'etiquette',
      chapter: 'Relier les représentations',
      title: 'La dernière étiquette est effacée',
      bip: 'J’ai rangé la grande commande. Enfin… je crois. L’étiquette a décidé de partir avant la fête.',
      prompt: 'La commande vaut 1’306, mais le rang des sachets est interdit. Réorganise la réserve sans changer la quantité.',
      before: [1, 2, 10, 6],
      beforeNumber: '1’306',
      after: [1, 3, 0, 6],
      afterNumber: '1’306',
      equation: '1 × 1’000 + 3 × 100 + 0 × 10 + 6 = 1’306',
      allowed: ['groupTens', 'openHundreds'],
      constraint: 'Construire 1’306 avec 0 sachet.',
      correctFeedback: 'Les quatre représentations sont alignées : palette, caisses, sachets, pièces et chiffres racontent toutes la quantité 1’306.',
      unlocked: 'La machine complète'
    }
  ];

  const smokeSuccessPlans: Record<string, string> = {
    porte: 'groupUnits',
    'deux-formes': 'openTens',
    cascade: 'groupUnits,groupTens',
    livraison: 'deliver:10,deliver:10,deliver:10',
    etiquette: 'groupTens'
  };

  let view: View = 'intro';
  let sceneIndex = 0;
  let working: RankCounts = [0, 0, 0, 0];
  let history: Array<{ counts: RankCounts; deliveries: number[] }> = [];
  let deliveries: number[] = [];
  let workshopMessage = '';
  let workshopMessageKind: 'instruction' | 'action' | 'error' = 'instruction';
  let motion: { id: number; from: number; to: number; label: string; kind: 'exchange' | 'open' | 'delivery' | 'blocked' | 'undo' } | null = null;
  let motionId = 0;
  let announcement = '';
  let rootElement: HTMLElement;

  $: scene = scenes[sceneIndex];
  $: displayedNumber = total(working).toLocaleString('fr-CH');
  $: smokeState = view === 'intro' ? 'ready' : view === 'question' ? 'active' : view === 'correct' ? 'success' : 'complete';
  $: smokeSuccessPlan = view === 'question' ? smokeSuccessPlans[scene.id] : undefined;
  $: smokeErrorPlan = view === 'question' && sceneIndex === 0 ? 'openTens' : undefined;

  function copy(counts: RankCounts): RankCounts { return [...counts] as RankCounts; }
  function total(counts: RankCounts): number { return counts[0] * 1000 + counts[1] * 100 + counts[2] * 10 + counts[3]; }
  function same(a: RankCounts, b: RankCounts): boolean { return a.every((value, index) => value === b[index]); }

  async function focus(selector: string): Promise<void> {
    await tick();
    rootElement.querySelector<HTMLElement>(selector)?.focus();
  }

  function loadScene(): void {
    const current = scenes[sceneIndex];
    working = copy(current.before);
    history = [];
    deliveries = [];
    workshopMessage = current.constraint;
    workshopMessageKind = 'instruction';
    motion = null;
    view = 'question';
  }

  function goalReached(next: RankCounts, nextDeliveries: number[]): boolean {
    if (scene.mode === 'delivery') {
      return same(next, scene.after) && nextDeliveries.length === 3 && nextDeliveries.every((step) => step === 10);
    }
    return same(next, scene.after);
  }

  function animate(from: number, to: number, label: string, kind: 'exchange' | 'open' | 'delivery' | 'blocked' | 'undo'): void {
    motionId += 1;
    motion = { id: motionId, from, to, label, kind };
  }

  function commit(next: RankCounts, message: string, nextDeliveries = deliveries): void {
    history = [...history, { counts: copy(working), deliveries: [...deliveries] }];
    working = next;
    deliveries = [...nextDeliveries];
    workshopMessage = message;
    workshopMessageKind = 'action';
    announcement = message;
    if (goalReached(next, nextDeliveries)) {
      view = 'correct';
      announcement = scene.correctFeedback;
      void focus('[data-smoke-feedback]');
    }
  }

  function perform(action: WorkshopAction): void {
    const next = copy(working);
    const map: Record<WorkshopAction, { high: number; low: number; direction: 'group' | 'open' }> = {
      groupUnits: { high: 2, low: 3, direction: 'group' }, openTens: { high: 2, low: 3, direction: 'open' },
      groupTens: { high: 1, low: 2, direction: 'group' }, openHundreds: { high: 1, low: 2, direction: 'open' },
      groupHundreds: { high: 0, low: 1, direction: 'group' }, openThousands: { high: 0, low: 1, direction: 'open' }
    };
    const operation = map[action];
    if (operation.direction === 'group') {
      if (next[operation.low] < 10) {
        workshopMessage = `Il faut 10 ${rankNames[operation.low].toLowerCase()} pour faire cet échange. Rien ne bouge.`;
        workshopMessageKind = 'error';
        announcement = workshopMessage;
        animate(operation.low, operation.low, 'Groupe incomplet', 'blocked');
        return;
      }
      next[operation.low] -= 10;
      next[operation.high] += 1;
      animate(operation.low, operation.high, '10 → 1', 'exchange');
      commit(next, `Échange réussi : 10 ${rankNames[operation.low].toLowerCase()} deviennent 1 ${rankNames[operation.high].toLowerCase()}.`);
    } else {
      if (next[operation.high] < 1) {
        workshopMessage = `Il n’y a aucun contenant à ouvrir dans le rang ${rankNames[operation.high].toLowerCase()}.`;
        workshopMessageKind = 'error';
        announcement = workshopMessage;
        animate(operation.high, operation.high, 'Rien à ouvrir', 'blocked');
        return;
      }
      next[operation.high] -= 1;
      next[operation.low] += 10;
      animate(operation.high, operation.low, '1 → 10', 'open');
      commit(next, `Contenant ouvert : 1 ${rankNames[operation.high].toLowerCase()} redevient 10 ${rankNames[operation.low].toLowerCase()}.`);
    }
  }

  function actionReady(action: WorkshopAction): boolean {
    if (action === 'groupUnits') return working[3] >= 10;
    if (action === 'openTens') return working[2] >= 1;
    if (action === 'groupTens') return working[2] >= 10;
    if (action === 'openHundreds') return working[1] >= 1;
    if (action === 'groupHundreds') return working[1] >= 10;
    return working[0] >= 1;
  }

  function deliver(step: 1 | 10 | 100): void {
    const next = copy(working);
    const rank = step === 1 ? 3 : step === 10 ? 2 : 1;
    next[rank] += 1;
    for (let low = 3; low > 0; low -= 1) {
      while (next[low] >= 10) { next[low] -= 10; next[low - 1] += 1; }
    }
    const nextDeliveries = [...deliveries, step];
    animate(-1, rank, `+${step}`, 'delivery');
    commit(next, `Livraison ${nextDeliveries.length} : +${step}. La réserve affiche maintenant ${total(next).toLocaleString('fr-CH')}.`, nextDeliveries);
  }

  function undo(): void {
    const previous = history.at(-1);
    if (!previous) {
      workshopMessage = 'Rien à annuler : la réserve est déjà dans son état de départ.';
      workshopMessageKind = 'error';
      return;
    }
    working = copy(previous.counts);
    deliveries = [...previous.deliveries];
    history = history.slice(0, -1);
    animate(-1, -1, 'Geste annulé', 'undo');
    workshopMessage = 'Dernier geste annulé. La quantité reste intacte.';
    workshopMessageKind = 'action';
  }

  function resetScene(): void { loadScene(); announcement = 'La réserve revient à son organisation initiale.'; }

  async function start(): Promise<void> {
    sceneIndex = 0;
    loadScene();
    announcement = 'Premier problème : la porte est bloquée.';
    await focus('#scene-title');
  }

  async function continueStory(): Promise<void> {
    if (sceneIndex === scenes.length - 1) {
      view = 'complete';
      announcement = 'Le grand rangement est terminé. La machine de Bip est assemblée.';
      await focus('[data-smoke-completion]');
      return;
    }
    sceneIndex += 1;
    loadScene();
    announcement = `Nouveau problème : ${scenes[sceneIndex].title}.`;
    await focus('#scene-title');
  }

  async function restart(): Promise<void> {
    view = 'intro'; sceneIndex = 0; history = []; deliveries = [];
    announcement = 'Retour au début de l’histoire.';
    await focus('#intro-title');
  }
</script>

<svelte:head>
  <title>Le grand rangement de Bip · EX-0002</title>
  <meta name="description" content="Prototype 6H pour construire les groupements décimaux avec Bip." />
</svelte:head>

<main
  class="prototype-root"
  data-smoke-root
  data-smoke-exercise="EX-0002"
  data-smoke-program="pilot-seq-n1"
  data-smoke-state={smokeState}
  data-smoke-success-plan={smokeSuccessPlan}
  data-smoke-error-plan={smokeErrorPlan}
  bind:this={rootElement}
>
  <div class="dot-field" aria-hidden="true"></div>

  {#if view === 'intro'}
    <section class="intro" aria-labelledby="intro-title">
      <div class="intro-copy">
        <p class="eyebrow"><span>Chapitre A</span> Une aventure de groupes de dix</p>
        <h1 id="intro-title" tabindex="-1">Le grand<br /><em>rangement</em><br />de Bip</h1>
        <p class="lead">Bip a terminé sa machine pour la Fête des inventions. Il lui reste un tout petit problème : retrouver la porte de son atelier.</p>
        <div class="dialogue intro-dialogue">
          <span class="portrait-mini" aria-hidden="true">B</span>
          <p>« J’ai suivi mon plan presque exactement. Le mot <strong>presque</strong> fait beaucoup de travail dans cette phrase. »</p>
        </div>
        <div class="intro-actions">
          <button class="primary" type="button" data-smoke-action="start" onclick={start}>Entrer dans l’atelier <span aria-hidden="true">→</span></button>
          <span>5 scènes · environ 8 min</span>
        </div>
      </div>

      <div class="intro-art" aria-label="Bip se tient dans son atelier encombré">
        <img class="scene-art" src={introWorkshop} alt="" aria-hidden="true" />
        <div class="art-note">10 pièces<br />font 1 sachet</div>
      </div>
    </section>
  {:else}
    <div class="game-shell">
      <header class="game-header">
        <a href="/exercise/?id=EX-0002" class="game-brand" aria-label="Retour à la fiche EX-0002"><span>B</span><strong>Le grand rangement</strong></a>
        {#if view !== 'complete'}
          <div class="story-progress">
            <div><span>Machine de Bip</span><strong>{sceneIndex + (view === 'correct' ? 1 : 0)} / {scenes.length} modules</strong></div>
            <div class="progress-track" role="progressbar" aria-label="Modules activés" aria-valuemin="0" aria-valuemax={scenes.length} aria-valuenow={sceneIndex + (view === 'correct' ? 1 : 0)}><i style={`width:${((sceneIndex + (view === 'correct' ? 1 : 0)) / scenes.length) * 100}%`}></i></div>
          </div>
        {:else}<span class="ready-chip">Machine assemblée</span>{/if}
      </header>

      {#if view === 'question' || view === 'correct'}
        <section class="scene-layout" aria-labelledby="scene-title">
          <aside class="story-rail">
            <img class="bip-sprite story-bip" src={bipThinking} alt="" aria-hidden="true" />
            <div class="speech"><span>Bip</span><p>{scene.bip}</p></div>
            <ol aria-label="Progression de l’histoire">
              {#each scenes as item, index}
                <li class:done={index < sceneIndex} class:current={index === sceneIndex}><i>{index < sceneIndex ? '✓' : index + 1}</i><span>{item.chapter}</span></li>
              {/each}
            </ol>
          </aside>

          {#key sceneIndex}
          <article class="scene-card scene-enter">
            <div class="scene-heading">
              <p class="eyebrow"><span>Scène {sceneIndex + 1}</span> {scene.chapter}</p>
              <h1 id="scene-title" tabindex="-1">{scene.title}</h1>
              <p>{scene.prompt}</p>
            </div>

            <div class="workbench" class:trial={view !== 'question'} aria-label={`Organisation affichée représentant ${displayedNumber} pièces`}>
              <div class="bench-top">
                <span>{view === 'question' ? 'État de la réserve' : 'Échange validé'}</span>
                <div class="total-lock"><small>{scene.mode === 'delivery' ? 'total actuel' : 'quantité verrouillée'}</small><strong>{displayedNumber}</strong></div>
              </div>
              {#if motion}
                {#key motion.id}<div class:blocked={motion.kind === 'blocked'} class:undo={motion.kind === 'undo'} class="exchange-event" aria-hidden="true"><i></i><strong>{motion.label}</strong><span>{motion.kind === 'delivery' ? 'LIVRAISON' : motion.kind === 'blocked' ? 'PAUSE' : motion.kind === 'undo' ? 'RETOUR' : 'ÉCHANGE'}</span></div>{/key}
              {/if}
              <div class="rank-grid">
                {#each working as count, index}
                  <div class="rank" class:empty={count === 0} class:overfull={count > 9} class:source-rank={motion?.from === index && motion.kind !== 'blocked'} class:target-rank={motion?.to === index && motion.kind !== 'blocked'} class:blocked-rank={motion?.from === index && motion.kind === 'blocked'}>
                    <div class="rank-label"><img class="object-icon" src={rankAssets[index]} alt="" aria-hidden="true" /><div><b>{count}</b><span>{rankNames[index]}</span><small>1 objet vaut {rankValues[index]}</small></div></div>
                    <div class={`material-view material-${index}`} aria-hidden="true">
                      {#each Array(Math.min(count, 10)) as _, token}<img src={rankAssets[index]} alt="" style={`--token:${token}`} />{/each}
                      {#if count > 10}<em>+{count - 10}</em>{/if}
                    </div>
                    <div class="capacity" aria-hidden="true">{#each Array(10) as _,slot}<i class:filled={slot < Math.min(count,10)}></i>{/each}</div>
                  </div>
                {/each}
              </div>
              <div class="bench-rule"><span aria-hidden="true">↔</span> 10 éléments d’un rang s’échangent contre 1 élément du rang suivant.</div>
            </div>

            {#if view === 'question'}
              <section class="workshop-controls" aria-label="Commandes de l’atelier">
                <div class="constraint"><span>Mission</span><strong>{scene.constraint}</strong></div>
                {#if scene.mode === 'delivery'}
                  <div class="delivery-strip" aria-label="Choisir la taille de la prochaine livraison">
                    <span>Convoi <b>{deliveries.length} / 3</b></span>
                    {#each deliveryOptions as step}
                      <button type="button" data-smoke-control={`deliver:${step}`} onclick={() => deliver(step)} aria-label={`Livrer ${step} pièce${step > 1 ? 's' : ''}`}>
                        <img class="mini-material" src={rankAssets[step === 1 ? 3 : step === 10 ? 2 : 1]} alt="" /><strong>+{step}</strong><small>{step === 1 ? 'pièce' : step === 10 ? 'sachet' : 'caisse'}</small>
                      </button>
                    {/each}
                  </div>
                {:else}
                  <div class="exchange-tools">
                    {#each scene.allowed as action}
                      <button class:ready={actionReady(action)} type="button" data-smoke-control={action} onclick={() => perform(action)} aria-label={actionVisuals[action].label}>
                        <div class="recipe" aria-hidden="true">
                          <span><img class="mini-material" src={rankAssets[actionVisuals[action].from]} alt="" /><b>×{actionVisuals[action].fromCount}</b></span>
                          <em>→</em>
                          <span><img class="mini-material" src={rankAssets[actionVisuals[action].to]} alt="" /><b>×{actionVisuals[action].toCount}</b></span>
                        </div>
                        <div class="recipe-label"><strong>{actionVisuals[action].verb}</strong><small>{working[actionVisuals[action].from]} disponible{working[actionVisuals[action].from] > 1 ? 's' : ''}</small></div>
                      </button>
                    {/each}
                  </div>
                {/if}
                <div class="workshop-message" role="status" data-smoke-feedback={workshopMessageKind === 'error' ? 'error' : undefined} data-smoke-feedback-detail={workshopMessageKind === 'error' ? 'true' : undefined}><span aria-hidden="true">↔</span><p>{workshopMessage}</p></div>
                <div class="utility-actions">
                  <button class="secondary" type="button" onclick={undo} disabled={history.length === 0}>Annuler le dernier geste</button>
                  <button class="text-button" type="button" onclick={resetScene}>Recommencer la scène</button>
                </div>
              </section>
              <p class="safe-note"><span aria-hidden="true">↺</span> Essaie librement : chaque échange est visible et réversible.</p>
            {:else}
              <div class="feedback correct" role="status" tabindex="-1" data-smoke-feedback="success" data-smoke-feedback-detail>
                <span class="feedback-icon" aria-hidden="true">✓</span>
                <div><p>Nouveau module activé</p><h2>{scene.unlocked}</h2><p>{scene.correctFeedback}</p></div>
              </div>
              <div class="transformation" aria-label={`Après l’échange : ${scene.afterNumber}`}>
                <div class="after-ranks">
                  {#each scene.after as count, index}<span class:zero={count === 0}><b>{count}</b><small>{rankNames[index]}</small></span>{/each}
                </div>
                <strong>{scene.equation}</strong>
              </div>
              <div class="feedback-actions"><button class="primary" type="button" data-smoke-action="continue" onclick={continueStory}>{sceneIndex === scenes.length - 1 ? 'Activer la machine' : 'Voir la suite'} <span aria-hidden="true">→</span></button></div>
            {/if}
          </article>
          {/key}
        </section>
      {:else if view === 'complete'}
        <section class="completion" aria-labelledby="complete-title">
          <div class="completion-art" aria-hidden="true"><img class="scene-art" src={outroWorkshop} alt="" /></div>
          <div class="completion-copy">
            <p class="eyebrow"><span>Chapitre A terminé</span> La machine est assemblée</p>
            <h1 id="complete-title" tabindex="-1" data-smoke-completion>La porte est libre.<br />La console, beaucoup moins.</h1>
            <p>Bip peut enfin déplacer sa machine. Les échanges ont changé le rangement, jamais la quantité. Il reste maintenant à vérifier si la console comprend aussi bien que toi.</p>
            <blockquote>« Elle vient d’écrire 4’106 à la place de 506. Mais regarde : toutes les lumières fonctionnent ! »</blockquote>
            <div class="completion-actions">
              <a class="primary link" href="/runner/?id=EX-0003">Tester la console <span aria-hidden="true">→</span></a>
              <button class="text-button" type="button" onclick={restart}>Rejouer ce chapitre</button>
            </div>
            <small>Prototype local : aucune réponse n’est enregistrée ni envoyée.</small>
          </div>
        </section>
      {/if}
    </div>
  {/if}

  <p class="sr-only" aria-live="polite">{announcement}</p>
</main>

<style>
  :global(*) { box-sizing: border-box; }
  :global(button), :global(a) { -webkit-tap-highlight-color: transparent; }
  .prototype-root {
    --ink:#182a32; --muted:#64737a; --paper:#fffaf0; --cream:#f4eedf; --line:#d8cdb8;
    --teal:#167f78; --teal-dark:#0d5754; --coral:#ef7657; --yellow:#f6c94f; --blue:#355fc5; --red:#bd483b;
    --ease-out:cubic-bezier(0.23, 1, 0.32, 1); --duration-state:220ms;
    position:relative; min-height:calc(100vh - 42px); overflow:hidden; color:var(--ink); background:var(--cream);
    font-family:"Segoe UI Variable","Segoe UI",system-ui,sans-serif;
  }
  .dot-field { position:fixed; inset:42px 0 0; pointer-events:none; opacity:.34; background-image:radial-gradient(#a8a08e 1px,transparent 1px); background-size:22px 22px; mask-image:linear-gradient(to bottom,#000,transparent 84%); }
  button,a { font:inherit; }
  button:focus-visible,a:focus-visible { outline:4px solid var(--blue); outline-offset:3px; }
  .eyebrow { margin:0; color:var(--teal-dark); font-size:.7rem; font-weight:900; letter-spacing:.11em; text-transform:uppercase; }
  .eyebrow span { display:inline-block; margin-right:9px; padding:6px 8px; color:white; background:var(--teal); border-radius:999px; }
  .intro { position:relative; z-index:1; display:grid; min-height:calc(100vh - 42px); width:min(1240px,calc(100% - 48px)); margin:auto; grid-template-columns:1fr .92fr; align-items:center; gap:clamp(40px,8vw,120px); padding:64px 0; }
  .intro-copy,.scene-card,.completion-copy { min-width:0; }
  .intro h1,.scene-heading h1,.completion h1 { font-family:Georgia,serif; font-weight:500; letter-spacing:-.055em; line-height:.91; }
  .intro h1 { margin:24px 0; font-size:clamp(4.5rem,9vw,8.8rem); }
  .intro h1 em { color:var(--coral); font-weight:500; }
  .lead { max-width:640px; margin:0; color:var(--muted); font-size:clamp(1.02rem,1.7vw,1.28rem); line-height:1.65; }
  .dialogue { display:grid; grid-template-columns:auto 1fr; gap:12px; align-items:center; }
  .intro-dialogue { max-width:620px; margin-top:28px; padding:14px 16px; border:1px solid var(--line); border-radius:14px; background:rgba(255,250,240,.78); }
  .intro-dialogue p { margin:0; font-size:.88rem; line-height:1.5; }
  .portrait-mini,.game-brand > span { display:grid; width:38px; height:38px; place-items:center; color:var(--yellow); background:var(--teal-dark); border-radius:50%; font-family:Georgia,serif; font-weight:800; }
  .intro-actions,.completion-actions { display:flex; align-items:center; gap:20px; flex-wrap:wrap; margin-top:30px; }
  .intro-actions > span { color:var(--muted); font-size:.78rem; }
  .primary,.secondary,.text-button { min-height:48px; border-radius:9px; font-weight:850; cursor:pointer; }
  .primary { display:inline-flex; align-items:center; justify-content:center; gap:24px; padding:12px 18px; color:white; background:var(--teal-dark); border:1px solid var(--teal-dark); box-shadow:0 5px 0 #073b39; text-decoration:none; }
  .primary:hover { background:var(--teal); transform:translateY(-1px); }
  .secondary { padding:11px 16px; color:var(--ink); background:white; border:1px solid var(--ink); }
  .text-button { padding:10px 4px; color:var(--teal-dark); background:transparent; border:0; text-decoration:underline; }
  .intro-art { position:relative; min-height:550px; border:1px solid #bcb19b; border-radius:50% 50% 24px 24px; overflow:hidden; background:linear-gradient(#f7d97a 0 46%,#e5b665 46% 48%,#77a49c 48%); box-shadow:22px 24px 0 rgba(24,42,50,.09); }
  .scene-art { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
  .bip-sprite { display:block; object-fit:contain; filter:drop-shadow(8px 10px 0 rgba(24,42,50,.17)); user-select:none; }
  .story-bip { width:112px; height:180px; margin:0 auto; animation:bipIdle 3.8s ease-in-out infinite; }
  .art-note { position:absolute; z-index:5; top:70px; left:36px; padding:12px 14px; background:white; border:2px solid var(--ink); box-shadow:5px 5px 0 var(--ink); font-family:ui-monospace,monospace; font-size:.72rem; font-weight:900; line-height:1.5; transform:rotate(-5deg); }
  .game-shell { position:relative; z-index:1; width:min(1320px,calc(100% - 38px)); margin:auto; padding:18px 0 48px; }
  .game-header { display:flex; min-height:60px; align-items:center; justify-content:space-between; gap:28px; margin-bottom:28px; }
  .game-brand { display:flex; align-items:center; gap:10px; color:var(--ink); text-decoration:none; font-size:.78rem; }
  .story-progress { width:min(440px,54vw); }
  .story-progress > div:first-child { display:flex; justify-content:space-between; margin-bottom:7px; color:var(--muted); font-size:.68rem; }
  .progress-track { height:7px; overflow:hidden; background:#d8cfbf; border-radius:99px; }
  .progress-track i { display:block; height:100%; background:var(--coral); border-radius:inherit; transition:width .3s ease; }
  .ready-chip { padding:8px 12px; color:var(--teal-dark); border:1px solid var(--teal); border-radius:999px; font-size:.7rem; font-weight:850; text-transform:uppercase; }
  .scene-layout { display:grid; grid-template-columns:230px minmax(0,1fr); gap:22px; align-items:start; }
  .story-rail { position:sticky; top:18px; padding:22px 16px; border:1px solid var(--line); border-radius:17px; background:rgba(255,250,240,.84); }
  .speech { margin-top:6px; padding:14px; background:white; border:1px solid var(--line); border-radius:12px; }
  .speech span { color:var(--coral); font-size:.65rem; font-weight:900; text-transform:uppercase; }
  .speech p { margin:6px 0 0; font-size:.8rem; line-height:1.5; }
  .story-rail ol { display:grid; gap:8px; margin:20px 0 0; padding:17px 0 0; border-top:1px solid var(--line); list-style:none; }
  .story-rail li { display:grid; grid-template-columns:26px 1fr; gap:8px; align-items:center; color:#8b918f; font-size:.68rem; }
  .story-rail li i { display:grid; width:26px; height:26px; place-items:center; border:1px solid var(--line); border-radius:50%; font-style:normal; font-weight:800; }
  .story-rail li.current { color:var(--ink); font-weight:800; }.story-rail li.current i{color:white;background:var(--teal);border-color:var(--teal)}.story-rail li.done i{color:white;background:var(--coral);border-color:var(--coral)}
  .scene-card { padding:clamp(24px,4.6vw,58px); background:rgba(255,250,240,.96); border:1px solid #c7bda9; border-radius:18px; box-shadow:0 20px 55px rgba(24,42,50,.09); }
  .scene-enter { animation:sceneEnter var(--duration-state) var(--ease-out) both; }
  .scene-heading h1 { margin:15px 0 13px; font-size:clamp(2.6rem,5.6vw,5.3rem); }
  .scene-heading > p:last-child { max-width:820px; margin:0; color:var(--muted); font-size:1rem; line-height:1.6; }
  .workbench { position:relative; margin-top:30px; padding:18px; overflow:hidden; color:white; border:3px solid #092f2e; border-radius:15px 15px 0 0; background:linear-gradient(145deg,#174e4b,#0c3735 72%); box-shadow:8px 9px 0 #092f2e; }
  .workbench::before { content:""; position:absolute; inset:0; pointer-events:none; opacity:.22; background:repeating-linear-gradient(90deg,transparent 0 74px,rgba(255,255,255,.08) 75px 76px); }
  .bench-top { position:relative; z-index:1; display:flex; align-items:center; justify-content:space-between; padding-bottom:13px; border-bottom:1px solid rgba(255,255,255,.22); font-size:.68rem; font-weight:900; letter-spacing:.08em; text-transform:uppercase; }
  .total-lock { display:flex; align-items:center; gap:10px; padding:7px 10px; color:var(--yellow); background:#071f1e; border:1px solid #3b7772; border-radius:8px; box-shadow:inset 0 0 12px rgba(0,0,0,.35); }
  .total-lock small { color:#8fb9b4; font-family:ui-monospace,monospace; font-size:.5rem; letter-spacing:.08em; }.total-lock strong{font-family:ui-monospace,monospace;font-size:1.55rem;line-height:1}
  .rank-grid { position:relative; z-index:1; display:grid; grid-template-columns:repeat(4,1fr); gap:9px; margin-top:14px; }
  .rank { display:flex; min-width:0; min-height:186px; flex-direction:column; padding:10px; color:var(--ink); background:#fffaf0; border:2px solid #b6aa91; border-radius:11px; box-shadow:0 5px 0 rgba(5,29,28,.35); transition:transform .2s,border-color .2s,box-shadow .2s; }
  .rank.empty { opacity:.72; background:#e8e2d5; }.rank.overfull{border-color:var(--coral);box-shadow:0 5px 0 #9f4636,0 0 0 3px rgba(239,118,87,.3)}
  .rank-label { display:flex; align-items:center; gap:9px; }.rank-label b{font-family:ui-monospace,monospace;font-size:1.55rem;line-height:1}.rank-label span,.rank-label small{display:block}.rank-label div span{font-size:.64rem;font-weight:900}.rank-label small{margin-top:2px;color:var(--muted);font-size:.52rem}
  .object-icon{display:block;width:54px;height:50px;flex:0 0 54px;object-fit:contain;filter:drop-shadow(2px 3px 0 rgba(24,42,50,.18))}
  .material-view { position:relative; display:flex; min-height:82px; align-content:flex-start; align-items:center; justify-content:center; gap:5px; flex-wrap:wrap; margin-top:10px; padding:8px; overflow:hidden; background:#e7ddc9; border:1px solid #c8baa0; border-radius:8px; box-shadow:inset 0 3px 8px rgba(24,42,50,.14); }
  .material-view img { display:block; width:29px; height:29px; flex:0 0 29px; object-fit:contain; filter:drop-shadow(1px 2px 0 rgba(24,42,50,.18)); animation:materialIn .35s both; animation-delay:calc(var(--token) * 25ms); }.material-view em{display:grid;width:28px;height:28px;place-items:center;color:white;background:var(--coral);border-radius:50%;font-size:.62rem;font-style:normal;font-weight:900}
  .capacity { display:grid; grid-template-columns:repeat(10,1fr); gap:2px; margin-top:auto; padding-top:9px; }.capacity i{height:4px;background:#d7d0c1;border-radius:4px}.capacity i.filled{background:var(--teal)}.overfull .capacity i.filled{background:var(--coral)}
  .bench-rule { position:relative; z-index:1; display:flex; align-items:center; gap:9px; margin-top:13px; padding-top:12px; color:#b9d5d1; border-top:1px solid rgba(255,255,255,.2); font-size:.68rem; }.bench-rule span{color:var(--yellow);font-size:1.3rem}
  .exchange-event { position:absolute; z-index:5; top:50%; left:50%; display:grid; min-width:112px; min-height:82px; place-items:center; padding:11px 16px; color:#0b3b38; background:var(--yellow); border:3px solid #092f2e; border-radius:13px; box-shadow:0 8px 0 #092f2e,0 18px 32px rgba(0,0,0,.28); transform:translate(-50%,-50%); animation:eventPop .72s both; }.exchange-event i{position:absolute;inset:-13px;border:2px solid rgba(246,201,79,.75);border-radius:18px;animation:eventRing .72s both}.exchange-event strong{font-family:ui-monospace,monospace;font-size:1.35rem}.exchange-event span{font-size:.52rem;font-weight:950;letter-spacing:.15em}.exchange-event.blocked{color:white;background:var(--coral)}.exchange-event.undo{color:white;background:var(--blue)}
  .source-rank{animation:sourcePulse .48s}.target-rank{animation:targetPulse .62s}.blocked-rank{animation:blockedShake .42s}
  .workshop-controls { margin:0 8px; padding:16px 16px 14px; border:2px solid #9f927c; border-top:0; border-radius:0 0 13px 13px; background:linear-gradient(#e9ddc7,#ddcfb5); box-shadow:7px 8px 0 #092f2e; }
  .constraint { display:flex; align-items:center; gap:12px; padding:10px 12px; color:var(--teal-dark); background:#f7f1e3; border:1px solid #c9bda8; border-radius:8px; }
  .constraint span { padding:5px 7px; color:white; background:var(--teal); border-radius:5px; font-size:.57rem; font-weight:900; text-transform:uppercase; }.constraint strong{font-size:.78rem}
  .exchange-tools,.delivery-strip { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; margin-top:13px; }
  .exchange-tools button { display:grid; min-height:126px; grid-template-columns:1fr; gap:8px; padding:11px; color:var(--ink); background:#f2eadb; border:2px solid #b4a68f; border-radius:10px; box-shadow:0 4px 0 #9b8c73; cursor:pointer; transition:transform .14s,box-shadow .14s,border-color .14s,background .14s; }
  .exchange-tools button.ready{background:#fffaf0;border-color:var(--teal);box-shadow:0 5px 0 #0d5754,0 0 0 3px rgba(22,127,120,.1)}.exchange-tools button:hover{transform:translateY(-2px);border-color:var(--teal)}.exchange-tools button:active{transform:translateY(3px);box-shadow:0 1px 0 #0d5754}
  .recipe { display:flex; align-items:center; justify-content:center; gap:12px; min-height:64px; padding:8px; background:#e2d6c0; border:1px solid #c5b79e; border-radius:8px; }.ready .recipe{background:#e8f2e8}.recipe>span{display:flex;min-width:68px;align-items:center;justify-content:center;gap:8px}.recipe b{font-family:ui-monospace,monospace;font-size:.85rem}.recipe em{color:var(--teal);font-size:1.35rem;font-style:normal;font-weight:900;animation:arrowNudge 1.15s ease-in-out infinite}
  .mini-material{display:block;width:42px;height:42px;flex:0 0 42px;object-fit:contain;filter:drop-shadow(1px 2px 0 rgba(24,42,50,.18))}
  .recipe-label { display:flex; align-items:end; justify-content:space-between; gap:10px; text-align:left; }.recipe-label strong{font-size:.85rem}.recipe-label small{color:var(--muted);font-size:.58rem}
  .delivery-strip{grid-template-columns:auto repeat(3,1fr);align-items:stretch}.delivery-strip>span{display:flex;align-items:center;padding:10px;color:var(--muted);font-size:.66rem;font-weight:800}.delivery-strip>span b{margin-left:4px;color:var(--teal-dark)}.delivery-strip button{display:grid;min-height:92px;place-items:center;padding:9px;color:var(--ink);background:#fffaf0;border:2px solid #b4a68f;border-radius:9px;box-shadow:0 4px 0 #9b8c73;cursor:pointer;transition:transform 120ms var(--ease-out),box-shadow 120ms var(--ease-out),border-color 120ms var(--ease-out)}.delivery-strip button:active{transform:translateY(3px) scale(.99);box-shadow:0 1px 0 #9b8c73}.delivery-strip button strong{font-family:ui-monospace,monospace;font-size:1rem}.delivery-strip button small{color:var(--muted);font-size:.55rem;text-transform:uppercase}
  @media(hover:hover) and (pointer:fine){.delivery-strip button:hover{border-color:var(--teal);transform:translateY(-2px)}}
  .workshop-message { display:flex; gap:10px; align-items:center; min-height:50px; margin-top:11px; padding:9px 12px; color:#d7f2ed; background:#163c3a; border-radius:8px; box-shadow:inset 0 0 12px rgba(0,0,0,.2); }.workshop-message span{color:var(--yellow);font-size:1.2rem}.workshop-message p{margin:0;font-size:.7rem;line-height:1.4}
  .utility-actions{display:flex;justify-content:space-between;gap:12px;margin-top:11px}.utility-actions button:disabled{opacity:.42;cursor:not-allowed}
  .safe-note{margin:16px 0 0;color:var(--muted);font-size:.72rem}.safe-note span{color:var(--teal);font-size:1rem}
  @keyframes bipIdle{0%,100%{transform:translateY(0) rotate(-.5deg)}50%{transform:translateY(-5px) rotate(.5deg)}}
  @keyframes materialIn{from{opacity:0;transform:translateY(-9px) scale(.72)}to{opacity:1;transform:translateY(0) scale(1)}}
  @keyframes eventPop{0%{opacity:0;transform:translate(-50%,-35%) scale(.6)}22%{opacity:1;transform:translate(-50%,-50%) scale(1.08)}68%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-68%) scale(.92)}}
  @keyframes eventRing{from{opacity:1;transform:scale(.72)}to{opacity:0;transform:scale(1.35)}}
  @keyframes sourcePulse{45%{transform:scale(.95);filter:brightness(.88)}}@keyframes targetPulse{40%{transform:translateY(-5px) scale(1.035);border-color:var(--yellow);box-shadow:0 8px 0 rgba(5,29,28,.38),0 0 0 4px rgba(246,201,79,.35)}}@keyframes blockedShake{20%,60%{transform:translateX(-5px)}40%,80%{transform:translateX(5px)}}@keyframes arrowNudge{50%{transform:translateX(4px)}}
  @keyframes validationEnter{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
  @keyframes validationFade{from{opacity:0}to{opacity:1}}
  @keyframes sceneEnter{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  @keyframes sceneFade{from{opacity:0}to{opacity:1}}
  .feedback.correct,.transformation,.feedback-actions{animation:validationEnter var(--duration-state) var(--ease-out) both}
  .feedback { display:grid; grid-template-columns:auto 1fr; gap:18px; margin-top:30px; padding:22px; border:1px solid; border-radius:13px; }
  .feedback.incorrect { background:#fff0e9; border-color:#dda08d; }.feedback.correct{background:#e8f4e9;border-color:#98c3a2}
  .feedback-icon { display:grid; width:44px; height:44px; place-items:center; color:white; background:var(--red); border-radius:50%; font-size:1.25rem; font-weight:900; }.correct .feedback-icon{background:var(--teal)}
  .feedback p { margin:0; color:var(--muted); font-size:.8rem; line-height:1.55; }.feedback div>p:first-child{color:var(--red);font-size:.65rem;font-weight:900;text-transform:uppercase}.correct div>p:first-child{color:var(--teal-dark)}
  .feedback h2 { margin:5px 0 8px; font-family:Georgia,serif; font-size:1.8rem; font-weight:500; }
  .feedback-actions { display:flex; justify-content:flex-end; margin-top:18px; }
  .transformation { margin-top:12px; padding:18px; background:white; border:1px solid var(--line); border-radius:11px; }
  .after-ranks { display:grid; grid-template-columns:repeat(4,1fr); gap:7px; }.after-ranks span{padding:10px;text-align:center;background:#edf5e9;border-radius:8px}.after-ranks span.zero{background:#eeeae2;border:1px dashed #b9b1a5}.after-ranks b,.after-ranks small{display:block}.after-ranks b{font-family:Georgia,serif;font-size:1.5rem}.after-ranks small{font-size:.58rem;text-transform:uppercase}
  .transformation>strong { display:block; margin-top:14px; color:var(--teal-dark); font-family:ui-monospace,monospace; font-size:.78rem; text-align:center; }
  .completion { display:grid; min-height:calc(100vh - 140px); grid-template-columns:.9fr 1.1fr; gap:clamp(35px,8vw,100px); align-items:center; padding:44px 5vw; background:var(--paper); border:1px solid var(--line); border-radius:22px; }
  .completion-art { position:relative; min-height:520px; overflow:hidden; border-radius:50% 50% 20px 20px; background:linear-gradient(#24454e 0 57%,#e1b764 57%); }
  .completion h1 { margin:20px 0; font-size:clamp(3rem,6vw,6rem); }
  .completion-copy>p:not(.eyebrow){color:var(--muted);line-height:1.7}.completion-copy blockquote{margin:24px 0;padding:16px;border-left:5px solid var(--coral);background:var(--cream);font-family:Georgia,serif;font-size:1.05rem;line-height:1.5}.completion-copy>small{display:block;margin-top:24px;color:var(--muted);font-size:.68rem}
  .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
  @media(max-width:900px){.intro{grid-template-columns:1fr;padding-top:45px}.intro-art{min-height:480px}.scene-layout{grid-template-columns:1fr}.story-rail{position:static;display:grid;grid-template-columns:130px 1fr;align-items:center}.story-rail ol{display:none}.story-bip{grid-row:span 1}.completion{grid-template-columns:1fr}.completion-art{min-height:430px}}
  @media(max-width:620px){.prototype-root{overflow-x:hidden}.intro,.game-shell{width:calc(100% - 24px)}.intro{padding:34px 0}.intro h1{font-size:clamp(3rem,14.5vw,4rem)}.intro-art{min-height:390px}.game-header{align-items:flex-start}.story-progress{width:55vw}.scene-card{padding:20px 14px}.scene-heading h1{font-size:2.7rem}.story-rail{grid-template-columns:92px 1fr;padding:14px}.story-bip{width:82px;height:128px}.speech{margin:0}.rank-grid,.after-ranks{grid-template-columns:repeat(2,1fr)}.exchange-tools{grid-template-columns:1fr}.delivery-strip{grid-template-columns:repeat(3,1fr)}.delivery-strip>span{grid-column:1/-1}.utility-actions{align-items:stretch;flex-direction:column}.utility-actions button{width:100%}.feedback{grid-template-columns:1fr}.feedback-actions{justify-content:stretch}.feedback-actions button{width:100%}.completion{padding:24px 14px}.completion-art{min-height:330px}.completion h1{font-size:3.1rem}.intro-actions,.completion-actions{align-items:stretch;flex-direction:column}.primary.link,.intro-actions .primary{width:100%}.text-button{width:100%}}
  @media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;transition:none!important;animation:none!important}.feedback.correct,.transformation,.feedback-actions{animation:validationFade 120ms var(--ease-out) both!important}.scene-enter{animation:sceneFade 120ms var(--ease-out) both!important}.delivery-strip button:active{transform:none;border-color:var(--teal)}}
</style>
