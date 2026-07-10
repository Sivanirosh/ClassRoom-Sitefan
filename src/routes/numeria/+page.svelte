<script lang="ts">
  import { onMount } from 'svelte';
  import { getStudentName, submitActivityResult } from '$lib/client/activity';
  import { readStudentData, removeStudentData, writeStudentData } from '$lib/client/student-storage';
  import FeedbackPanel from '$lib/components/FeedbackPanel.svelte';
  import MissionProgress from '$lib/components/MissionProgress.svelte';
  import MissionResult from '$lib/components/MissionResult.svelte';
  import WorldArt from '$lib/components/WorldArt.svelte';
  import WorldShell from '$lib/components/WorldShell.svelte';

  type Grade = '6H' | '7H' | '8H';
  type Screen = 'map' | 'realm' | 'game' | 'result' | 'codex';
  type Realm = { id: string; name: string; icon: string; desc: string };
  type Question = { q: string; a: string; help?: string };
  type Progress = Record<string, Record<string, number>>;
  type GameState = { selectedGrade: Grade; progress: Progress; unlockedCodex: Grade[] };

  const STORAGE_NAMESPACE = 'numeria-progress';
  const gradeLabels: Record<Grade, string> = { '6H': '6H · Sources', '7H': '7H · Archipels', '8H': '8H · Confins' };
  const realms: Record<Grade, Realm[]> = {
    '6H': [
      { id: '6H-N1', name: 'Vallée des Collections', icon: '⌁', desc: 'Dénombrements, groupements et sauts numériques.' },
      { id: '6H-N2', name: 'Runes de Lecture', icon: '◫', desc: 'Structure de position et comparaisons jusqu’à 10’000.' },
      { id: '6H-N3', name: 'Sentier des Droites', icon: '↝', desc: 'Lecture de positions graduées.' },
      { id: '6H-N4', name: 'Citadelle des Décompositions', icon: '◇', desc: 'Extraction des ordres U, D, C, M.' },
      { id: '6H-N5', name: 'Portes de l’Histoire', icon: '◎', desc: 'Grands nombres et passages de seuils.' }
    ],
    '7H': [
      { id: '7H-N1', name: 'Domaine des Positions', icon: '▦', desc: 'Structure jusqu’au million.' },
      { id: '7H-N2', name: 'Équilibre des Ordres', icon: '⚖', desc: 'Encadrements et intercalations.' },
      { id: '7H-N3', name: 'Noyau des Extractions', icon: '✦', desc: 'Dizaines, centaines et milliers entiers.' },
      { id: '7H-N4', name: 'Archipel des Fractions', icon: '◒', desc: 'Fractions usuelles et grandeurs.' },
      { id: '7H-N5', name: 'Cascades Décimales', icon: '≈', desc: 'Fractions décimales et nombres à virgule.' }
    ],
    '8H': [
      { id: '8H-N1', name: 'Confins des Milliards', icon: '∞', desc: 'Milliards, millions et milliers.' },
      { id: '8H-N2', name: 'Temple des Écritures', icon: '✎', desc: 'Mots-nombres complexes.' },
      { id: '8H-N3', name: 'Cartographie Suprême', icon: '⌖', desc: 'Intercalations décimales fines.' },
      { id: '8H-N4', name: 'Distorsions de Grandeurs', icon: '⌛', desc: 'Sauts modulables du millième.' },
      { id: '8H-N5', name: 'Analyseur de Micro-Valeurs', icon: '⌕', desc: 'Extraction de composants décimaux.' }
    ]
  };

  const codexItems: Record<Grade, { icon: string; name: string; desc: string }> = {
    '6H': { icon: '♜', name: 'Le Sceptre d’Émeraude', desc: 'Il rappelle que dix unités forment une dizaine et dix dizaines une centaine.' },
    '7H': { icon: '◉', name: 'L’Orbe de l’Éclipse', desc: 'Il montre comment une unité peut être partagée en fractions égales.' },
    '8H': { icon: 'ϟ', name: 'L’Éclair de Platine', desc: 'Il relie les milliards aux millièmes sur une même carte de position.' }
  };

  let ready = false;
  let studentName = 'Explorateur';
  let screen: Screen = 'map';
  let state: GameState = freshState();
  let selectedRealm: Realm = realms['6H'][0];
  let selectedRealmIndex = 0;
  let missionId = 0;
  let questions: Question[] = [];
  let questionIndex = 0;
  let score = 0;
  let input = '';
  let answered = false;
  let wasCorrect = false;
  let feedbackTitle = '';
  let feedbackExplanation = '';
  let showHelp = false;
  let helpUsed = 0;
  let stars = 0;
  let sentMessage = '';
  let finishing = false;

  onMount(() => {
    studentName = getStudentName();
    state = readStudentData<GameState>(STORAGE_NAMESPACE, studentName, freshState(), isGameState);
    selectedRealm = realms[state.selectedGrade][0];
    ready = true;
  });

  function freshState(grade: Grade = '6H'): GameState {
    return { selectedGrade: grade, progress: {}, unlockedCodex: [] };
  }

  function isGameState(value: unknown): value is GameState {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
    const item = value as Record<string, unknown>;
    return (
      (item.selectedGrade === '6H' || item.selectedGrade === '7H' || item.selectedGrade === '8H') &&
      Boolean(item.progress) && typeof item.progress === 'object' && !Array.isArray(item.progress) &&
      Array.isArray(item.unlockedCodex) && item.unlockedCodex.every((grade) => grade === '6H' || grade === '7H' || grade === '8H')
    );
  }

  function save() {
    writeStudentData(STORAGE_NAMESPACE, studentName, state);
  }

  function formatSwiss(value: number | string): string {
    const [whole, decimal] = value.toString().split('.');
    return whole.replace(/\B(?=(\d{3})+(?!\d))/g, "'") + (decimal ? `.${decimal}` : '');
  }

  function clean(value: string): string {
    return value.trim().toLocaleLowerCase('fr-FR').replace(/[\s']/g, '').replace(',', '.');
  }

  function resetProgress() {
    if (!confirm(`Effacer seulement la progression Numéria de ${studentName} ?`)) return;
    const grade = state.selectedGrade;
    state = freshState(grade);
    removeStudentData(STORAGE_NAMESPACE, studentName);
    selectedRealm = realms[grade][0];
    screen = 'map';
  }

  function selectGrade(grade: Grade) {
    state = { ...state, selectedGrade: grade };
    selectedRealm = realms[grade][0];
    save();
  }

  function openRealm(realm: Realm, index: number) {
    selectedRealm = realm;
    selectedRealmIndex = index;
    screen = 'realm';
  }

  function realmKey(realm: Realm): string {
    return `${state.selectedGrade}_${realm.id}`;
  }

  function missionStars(realm: Realm, id: number): number {
    return state.progress[realmKey(realm)]?.[String(id)] ?? 0;
  }

  function realmStars(realm: Realm): number {
    return missionStars(realm, 0) + missionStars(realm, 1);
  }

  function generateQuestions(grade: Grade, realmId: string): Question[] {
    const list: Question[] = [];
    for (let index = 0; index < 5; index += 1) {
      if (grade === '6H') {
        if (realmId.endsWith('N1')) {
          const hundreds = Math.floor(Math.random() * 8) + 2;
          const tens = Math.floor(Math.random() * 9) + 1;
          list.push({ q: `Recompose : ${hundreds} paquets de 100 et ${tens} paquets de 10.`, a: String(hundreds * 100 + tens * 10), help: 'Chaque paquet de 100 vaut une centaine. Additionne ensuite les dizaines.' });
        } else if (realmId.endsWith('N2')) {
          const value = Math.floor(Math.random() * 7000) + 1500;
          list.push({ q: `Dans ${formatSwiss(value)}, quel est le chiffre des centaines ?`, a: String(Math.floor((value % 1000) / 100)), help: 'M | C | D | U : repère la colonne des centaines.' });
        } else if (realmId.endsWith('N3')) {
          const step = Math.random() > 0.5 ? 10 : 100;
          const start = (Math.floor(Math.random() * 40) + 10) * 10;
          list.push({ q: `Avance de ${step} en ${step}. Quel nombre vient après ${formatSwiss(start)} ?`, a: String(start + step), help: 'Ajoute la valeur d’un seul intervalle.' });
        } else if (realmId.endsWith('N4')) {
          const value = Math.floor(Math.random() * 4000) + 450;
          list.push({ q: `Combien de dizaines entières y a-t-il dans ${formatSwiss(value)} ?`, a: String(Math.floor(value / 10)), help: 'Une dizaine entière contient 10 unités : cherche combien de paquets de 10 sont complets.' });
        } else {
          const base = 9950 + Math.floor(Math.random() * 30);
          list.push({ q: `${formatSwiss(base)} + 1 = ?`, a: String(base + 1), help: 'Observe quelles colonnes changent quand on passe une dizaine ou un millier.' });
        }
      } else if (grade === '7H') {
        if (realmId.endsWith('N1')) {
          const value = Math.floor(Math.random() * 800000) + 120000;
          list.push({ q: `Dans ${formatSwiss(value)}, quel est le chiffre des dizaines de milliers ?`, a: String(Math.floor(value / 10000) % 10), help: 'Lis les colonnes de droite à gauche : unités, dizaines, centaines, milliers, dizaines de milliers.' });
        } else if (realmId.endsWith('N2')) {
          const value = Math.floor(Math.random() * 700000) + 110000;
          const nextTenThousand = (Math.floor(value / 10000) + 1) * 10000;
          list.push({ q: `Quel multiple de 10’000 vient juste après ${formatSwiss(value)} ?`, a: String(nextTenThousand), help: 'Repère d’abord entre quelles deux dizaines de milliers se trouve le nombre.' });
        } else if (realmId.endsWith('N3')) {
          const value = Math.floor(Math.random() * 400000) + 150000;
          list.push({ q: `Combien de centaines entières y a-t-il dans ${formatSwiss(value)} ?`, a: String(Math.floor(value / 100)), help: 'Cache les deux derniers chiffres : tu vois le nombre de paquets complets de 100.' });
        } else if (realmId.endsWith('N4')) {
          const pool = [{ q: 'Quelle fraction représente la moitié exacte ?', a: '1/2', help: 'Une moitié est une part quand l’unité est coupée en deux parts égales.' }, { q: 'Écris trois quarts en fraction.', a: '3/4', help: 'Le nombre de parts prises va en haut ; le nombre de parts égales va en bas.' }, { q: 'Écris deux tiers en fraction.', a: '2/3', help: 'Deux parts prises sur trois parts égales.' }];
          list.push(pool[index % pool.length]);
        } else {
          const cents = [5, 12, 75, 8, 142][index];
          list.push({ q: `Convertis ${cents}/100 en nombre à virgule.`, a: String(cents / 100), help: 'Un centième se place deux rangs après la virgule.' });
        }
      } else if (realmId.endsWith('N1')) {
        const billions = Math.floor(Math.random() * 7) + 2;
        const millions = (Math.floor(Math.random() * 8) + 1) * 100;
        list.push({ q: `${billions} milliards et ${millions} millions = ?`, a: String(billions * 1_000_000_000 + millions * 1_000_000), help: 'Écris la classe des milliards, puis celle des millions, puis complète les classes restantes avec des zéros.' });
      } else if (realmId.endsWith('N2')) {
        const names = [{ q: 'deux millions cinq cent mille', a: '2500000' }, { q: 'quatre millions deux cent mille', a: '4200000' }, { q: 'un million huit cent mille', a: '1800000' }];
        const selected = names[index % names.length];
        list.push({ q: `Écris en chiffres : ${selected.q}.`, a: selected.a, help: 'Sépare d’abord la classe des millions, puis celle des milliers.' });
      } else if (realmId.endsWith('N3')) {
        const base = Number(((Math.floor(Math.random() * 8) + 2) + 0.14).toFixed(2));
        list.push({ q: `Trouve le centième : ${base} < ? < ${(base + 0.02).toFixed(2)}`, a: (base + 0.01).toFixed(2), help: 'Ajoute exactement un centième au premier nombre.' });
      } else if (realmId.endsWith('N4')) {
        const base = Number(((Math.floor(Math.random() * 5) + 1) + 0.45).toFixed(3));
        list.push({ q: `Ajoute 5 millièmes à ${base}.`, a: (base + 0.005).toFixed(3), help: 'Un millième est le troisième rang après la virgule.' });
      } else {
        const thousandths = Math.floor(Math.random() * 9) + 1;
        const value = `${Math.floor(Math.random() * 8) + 1}.${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${thousandths}`;
        list.push({ q: `Dans ${value}, quel est le chiffre des millièmes ?`, a: String(thousandths), help: 'Après le point, lis dixièmes, centièmes, puis millièmes.' });
      }
    }
    return list;
  }

  function startMission(nextMissionId: number) {
    missionId = nextMissionId;
    questions = generateQuestions(state.selectedGrade, selectedRealm.id);
    questionIndex = 0;
    score = 0;
    input = '';
    answered = false;
    showHelp = false;
    helpUsed = 0;
    sentMessage = '';
    finishing = false;
    screen = 'game';
  }

  function pressKey(key: string) {
    if (answered) return;
    if (key === 'CLR') input = '';
    else if (key === 'OK') validate();
    else if (input.length < 15) input += key;
  }

  function handleKeyboard(event: KeyboardEvent) {
    if (screen !== 'game' || answered) return;
    if (event.target instanceof HTMLElement && event.target.closest('button, input, select, textarea, a')) return;
    if (/^[0-9.,/' ]$/.test(event.key)) pressKey(event.key === ',' ? '.' : event.key);
    else if (event.key === 'Backspace' || event.key === 'Delete') pressKey('CLR');
    else if (event.key === 'Enter') pressKey('OK');
  }

  function revealHelp() {
    if (!showHelp) helpUsed += 1;
    showHelp = !showHelp;
  }

  function validate() {
    if (answered || !input) return;
    answered = true;
    const current = questions[questionIndex];
    wasCorrect = clean(input) === clean(current.a);
    if (wasCorrect) {
      score += 1;
      feedbackTitle = 'La rune s’éclaire : réponse juste !';
      feedbackExplanation = current.help ?? 'Ton raisonnement correspond exactement à la structure du nombre.';
    } else {
      feedbackTitle = 'La carte nous montre un autre chemin.';
      feedbackExplanation = `La réponse était ${formatSwiss(current.a)}. ${current.help ?? ''}`;
    }
  }

  function continueMission() {
    if (!answered || finishing) return;
    if (questionIndex >= questions.length - 1) {
      finishing = true;
      finishMission();
      return;
    }
    questionIndex += 1;
    input = '';
    answered = false;
    wasCorrect = false;
    feedbackTitle = '';
    feedbackExplanation = '';
    showHelp = false;
  }

  async function finishMission() {
    stars = score === 5 ? 3 : score >= 4 ? 2 : score >= 3 ? 1 : 0;
    const key = realmKey(selectedRealm);
    const realmProgress = {
      ...(state.progress[key] ?? {}),
      [String(missionId)]: Math.max(state.progress[key]?.[String(missionId)] ?? 0, stars)
    };
    const unlockedCodex = missionId === 1 && score >= 4 && !state.unlockedCodex.includes(state.selectedGrade)
      ? [...state.unlockedCodex, state.selectedGrade]
      : state.unlockedCodex;
    state = { ...state, progress: { ...state.progress, [key]: realmProgress }, unlockedCodex };
    save();
    screen = 'result';
    sentMessage = 'La carte est sauvegardée sur cet appareil…';

    const report = await submitActivityResult({
      studentName,
      world: 'numeria',
      mission: `${state.selectedGrade} ${selectedRealm.name} · ${missionId === 0 ? 'Exploration' : 'Gardien'}`,
      score,
      total: 5,
      scoreBasis: 'best',
      errorCount: 5 - score,
      errorFamilies: score < 5 ? [selectedRealm.id] : [],
      metadata: { stars, helpUsed }
    });
    sentMessage = report.message;
  }
</script>

<svelte:head>
  <title>Les Royaumes de Numéria — Camp des Curieux</title>
  <meta name="description" content="Une carte de quêtes courtes pour explorer la numération, les fractions et les décimaux." />
</svelte:head>

<svelte:window on:keydown={handleKeyboard} />

<WorldShell world="numeria" {studentName} section={screen === 'game' ? `Énigme ${questionIndex + 1}/5` : ''}>
  {#if !ready}
    <section class="panel-card center"><p class="muted">On déroule la carte de Numéria…</p></section>
  {:else if screen === 'map'}
    <section class="numeria-shell">
      <div class="panel-card numeria-banner">
        <div class="numeria-banner-copy">
          <p class="eyebrow">La grande carte des nombres</p>
          <h1>Les Royaumes de Numéria</h1>
          <p class="muted">Chaque royaume cache deux missions de cinq énigmes. Explore-les dans l’ordre que tu veux.</p>
          <div class="actions" style="margin-top:1rem;">
            <button class="btn btn-warning" type="button" on:click={() => (screen = 'codex')}>Voir mon codex</button>
            <button class="btn btn-quiet" type="button" on:click={resetProgress}>Effacer ma carte</button>
          </div>
        </div>
        <div class="numeria-banner-art"><WorldArt world="numeria" /></div>
      </div>

      <div class="panel-card stack">
        <p class="eyebrow center">Choisis une région de la carte</p>
        <div class="grade-tabs" role="tablist" aria-label="Degré scolaire">
          {#each ['6H','7H','8H'] as grade}
            <button class="choice-card grade-tab" class:is-selected={state.selectedGrade === grade} type="button" role="tab" aria-selected={state.selectedGrade === grade} on:click={() => selectGrade(grade as Grade)}>{gradeLabels[grade as Grade]}</button>
          {/each}
        </div>
      </div>

      <div class="realm-path" aria-label={`Royaumes ${state.selectedGrade}`}>
        {#each realms[state.selectedGrade] as realm, index}
          <button class="realm-card" type="button" on:click={() => openRealm(realm, index)}>
            <span class="realm-number" aria-hidden="true">{realm.icon}</span>
            <span class="realm-copy"><strong>{realm.name}</strong><span>{realm.desc}</span></span>
            <span class="realm-stars" aria-label={`${realmStars(realm)} étoiles sur 6`}>{'★'.repeat(realmStars(realm))}{'☆'.repeat(6 - realmStars(realm))}</span>
          </button>
        {/each}
      </div>
    </section>
  {:else if screen === 'realm'}
    <section class="panel-card realm-detail stack-lg">
      <button class="btn btn-quiet" type="button" on:click={() => (screen = 'map')}>← Retour à la carte</button>
      <div class="center">
        <span class="codex-symbol" style="margin:0 auto;" aria-hidden="true">{selectedRealm.icon}</span>
        <p class="eyebrow" style="margin-top:1rem;">Royaume {selectedRealmIndex + 1} sur 5</p>
        <h1 style="font-size:clamp(1.8rem,5vw,2.7rem); margin:.3rem 0;">{selectedRealm.name}</h1>
        <p class="muted">{selectedRealm.desc}</p>
      </div>
      <div class="stack">
        {#each [{ title: 'Sentier d’exploration', detail: 'Découvre les idées avec les parchemins d’aide.', icon: '↝', id: 0 }, { title: 'Énigmes du Gardien', detail: 'Montre ce que tu as compris et ouvre le codex.', icon: '♜', id: 1 }] as mission}
          <button class="choice-card mission-choice" type="button" on:click={() => startMission(mission.id)}>
            <span class="choice-icon" aria-hidden="true">{mission.icon}</span>
            <span class="mission-choice-copy"><strong>{mission.title}</strong><small>{mission.detail}</small></span>
            <span class="realm-stars" aria-label={`${missionStars(selectedRealm, mission.id)} étoiles sur 3`}>{'★'.repeat(missionStars(selectedRealm, mission.id))}{'☆'.repeat(3 - missionStars(selectedRealm, mission.id))}</span>
          </button>
        {/each}
      </div>
    </section>
  {:else if screen === 'game'}
    <section class="mission-shell">
      <MissionProgress current={questionIndex + 1} total={5} label="Énigme" {score} />
      <div class="challenge-card">
        <p class="challenge-prompt">{selectedRealm.name}</p>
        <div class="question-display"><h2>{questions[questionIndex]?.q}</h2></div>
        <div class:is-empty={!input} class="answer-display" aria-live="polite">{input || 'Compose ta réponse'}</div>

        {#if questions[questionIndex]?.help && !answered}
          <div class="help-row"><button class="btn btn-quiet help-toggle" type="button" aria-pressed={showHelp} on:click={revealHelp}>✦ {showHelp ? 'Masquer le parchemin' : 'Ouvrir un parchemin d’aide'}</button></div>
          {#if showHelp}<aside class="help-card"><h3>Une piste, pas la réponse</h3><p>{questions[questionIndex].help}</p></aside>{/if}
        {/if}

        {#if !answered}
          <div class="keypad numeria-keypad" aria-label="Clavier de Numéria">
            {#each ['1','2','3','4','5','6','7','8','9','.','0','/','\'','CLR','OK'] as key}
              <button class="choice-card" class:key-validate={key === 'OK'} type="button" on:click={() => pressKey(key)}>{key === 'CLR' ? 'Effacer' : key === 'OK' ? 'Valider' : key}</button>
            {/each}
          </div>
        {:else}
          <FeedbackPanel
            kind={wasCorrect ? 'correct' : 'incorrect'}
            title={feedbackTitle}
            explanation={feedbackExplanation}
            continueLabel={questionIndex === questions.length - 1 ? 'Voir mes étoiles' : 'Énigme suivante'}
            on:continue={continueMission}
          />
        {/if}
      </div>
    </section>
  {:else if screen === 'result'}
    <MissionResult
      {score}
      total={5}
      title="Royaume exploré !"
      message={stars === 3 ? 'Trois étoiles : ton raisonnement éclaire tout le royaume.' : stars > 0 ? 'La carte s’est précisée. Tu peux revenir chercher les étoiles restantes quand tu veux.' : 'Tu as découvert les énigmes de ce royaume. Le prochain essai sera déjà plus familier.'}
      transmissionMessage={sentMessage}
    >
      <div slot="detail" class="center"><div class="realm-stars" style="font-size:1.5rem;" aria-label={`${stars} étoiles sur 3`}>{'★'.repeat(stars)}{'☆'.repeat(3 - stars)}</div><p class="small muted">{helpUsed} parchemin{helpUsed > 1 ? 's' : ''} consulté{helpUsed > 1 ? 's' : ''}</p></div>
      <button class="btn btn-primary" type="button" on:click={() => openRealm(selectedRealm, selectedRealmIndex)}>Choisir la suite</button>
      <button class="btn btn-quiet" type="button" on:click={() => startMission(missionId)}>Rejouer la mission</button>
      <a class="btn btn-quiet" href="/">Retour au camp</a>
    </MissionResult>
  {:else}
    <section class="numeria-shell">
      <div class="mission-top">
        <div><p class="eyebrow">Trésors de compréhension</p><h1 style="margin:.2rem 0;">Mon codex</h1></div>
        <button class="btn btn-quiet" type="button" on:click={() => (screen = 'map')}>← Retour à la carte</button>
      </div>
      <p class="muted">Les artefacts ne récompensent pas une série de jours : ils rappellent les idées mathématiques que tu as comprises.</p>
      <div class="grid codex-grid">
        {#each Object.entries(codexItems) as [grade, item]}
          {@const unlocked = state.unlockedCodex.includes(grade as Grade)}
          <article class="panel-card codex-item" class:is-locked={!unlocked}>
            <span class="codex-symbol" aria-hidden="true">{unlocked ? item.icon : '?'}</span>
            <p class="eyebrow" style="margin-top:1rem;">Relique {grade}</p>
            <h2 style="font-size:1.2rem;">{unlocked ? item.name : 'Artefact encore voilé'}</h2>
            <p class="muted small">{unlocked ? item.desc : 'Réussis au moins 4 énigmes du Gardien de cette région pour révéler cette idée.'}</p>
          </article>
        {/each}
      </div>
    </section>
  {/if}
</WorldShell>
