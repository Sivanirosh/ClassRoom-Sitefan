<script lang="ts">
  import { onMount } from 'svelte';
  import { getStudentName, submitActivityResult } from '$lib/client/activity';
  import { readStudentData, writeStudentData } from '$lib/client/student-storage';
  import WorldArt from '$lib/components/WorldArt.svelte';
  import WorldShell from '$lib/components/WorldShell.svelte';

  type Screen = 'home' | 'cv' | 'letter';
  type CvFields = {
    perso: string;
    accroche: string;
    ecole: string;
    stages: string;
    langues: string;
    info: string;
    hobbies: string;
    references: string;
  };
  type LetterFields = {
    exp: string;
    dest: string;
    date: string;
    objet: string;
    appel: string;
    p1: string;
    p2: string;
    p3: string;
    sig: string;
  };

  const emptyCv: CvFields = { perso: '', accroche: '', ecole: '', stages: '', langues: '', info: '', hobbies: '', references: '' };
  const emptyLetter: LetterFields = { exp: '', dest: '', date: '', objet: '', appel: 'Madame, Monsieur,', p1: '', p2: '', p3: '', sig: '' };

  const cvExamples = [
    `[PROFIL]\nCamille Roch — Région de Sion\n\n[ACCROCHE]\nCurieuse, ponctuelle et à l’aise dans le travail en équipe, je souhaite découvrir les métiers liés à la nature.\n\n[EXPÉRIENCE]\nJournée découverte dans un service d’entretien : plantation, rangement du matériel et observation des règles de sécurité.`,
    `[PROFIL]\nNoé Martin — Région de Lausanne\n\n[ACCROCHE]\nCalme, attentif et motivé, je m’intéresse aux métiers de la santé et au contact avec les personnes.\n\n[ATOUTS]\nÉcoute, soin, organisation et envie d’apprendre.`,
    `[PROFIL]\nSasha Diallo — Région de Delémont\n\n[ACCROCHE]\nDynamique et serviable, j’aime organiser, accueillir et réaliser des projets concrets.\n\n[INTÉRÊTS]\nCuisine, natation, dessin numérique et activités de groupe.`
  ];

  const letterExamples = [
    `Objet : Demande d’une journée de découverte\n\nMadame, Monsieur,\n\nJe m’intéresse à votre métier car j’apprécie le travail concret et les activités variées. Je souhaiterais observer votre équipe pendant une journée.\n\nJe suis curieux·se, ponctuel·le et prêt·e à respecter vos consignes.\n\nJe vous remercie pour votre attention et reste disponible pour en discuter.`,
    `Objet : Candidature à une place de stage\n\nMadame, Monsieur,\n\nJe souhaite mieux connaître les métiers de la santé et du contact humain. Les activités de votre établissement correspondent à ce que j’aimerais découvrir.\n\nÀ l’école, j’apprécie les projets qui demandent de l’écoute, de la précision et de l’organisation.\n\nJe serais heureux·se de pouvoir me présenter lors d’un entretien.`,
    `Objet : Demande d’informations sur votre métier\n\nMadame, Monsieur,\n\nVotre domaine m’intéresse et j’aimerais comprendre les tâches réalisées au quotidien ainsi que la formation nécessaire.\n\nJe prépare actuellement mon projet avec ma classe. Votre réponse m’aiderait à préciser mes idées.\n\nMerci d’avance pour le temps accordé à ma demande.`
  ];

  let studentName = 'Explorateur';
  let screen: Screen = 'home';
  let cvExample = '';
  let letterExample = '';
  let completionMessage = '';
  let completionOk = false;
  let submitting = false;
  let cv: CvFields = { ...emptyCv };
  let letter: LetterFields = { ...emptyLetter };

  $: cvFilled = filledCount(cv);
  $: letterFilled = filledCount(letter);
  $: cvPercent = Math.round((cvFilled / Object.keys(emptyCv).length) * 100);
  $: letterPercent = Math.round((letterFilled / Object.keys(emptyLetter).length) * 100);

  onMount(() => {
    studentName = getStudentName();
    cv = readStudentData<CvFields>('pcp-cv', studentName, { ...emptyCv }, isCvFields);
    letter = readStudentData<LetterFields>('pcp-letter', studentName, { ...emptyLetter }, isLetterFields);
  });

  function hasStringFields(value: unknown, keys: string[]): value is Record<string, string> {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
    const record = value as Record<string, unknown>;
    return keys.every((key) => typeof record[key] === 'string');
  }

  function isCvFields(value: unknown): value is CvFields {
    return hasStringFields(value, Object.keys(emptyCv));
  }

  function isLetterFields(value: unknown): value is LetterFields {
    return hasStringFields(value, Object.keys(emptyLetter));
  }

  function filledCount(fields: CvFields | LetterFields): number {
    return Object.values(fields).filter((value) => value.trim().length >= 2).length;
  }

  function saveCv() {
    writeStudentData('pcp-cv', studentName, cv);
  }

  function saveLetter() {
    writeStudentData('pcp-letter', studentName, letter);
  }

  function openScreen(next: Screen) {
    screen = next;
    completionMessage = '';
    completionOk = false;
  }

  async function markComplete(kind: 'CV' | 'Lettre de motivation') {
    if (submitting) return;
    const percent = kind === 'CV' ? cvPercent : letterPercent;
    if (percent < 50) {
      completionOk = false;
      completionMessage = 'Ton document a une bonne base. Complète encore au moins la moitié des étapes avant de le signaler comme terminé.';
      return;
    }

    submitting = true;
    completionMessage = 'Le document est noté dans ton carnet…';
    completionOk = true;
    const report = await submitActivityResult({
      studentName,
      world: 'pcp',
      mission: kind,
      score: 1,
      total: 1,
      scoreBasis: 'last',
      errorCount: 0,
      metadata: { completedAt: new Date().toISOString(), completionPercent: percent }
    });
    completionMessage = report.message;
    submitting = false;
  }
</script>

<svelte:head>
  <title>Atelier Avenir — Camp des Curieux</title>
  <meta name="description" content="Un atelier guidé pour préparer un CV, une lettre et présenter son projet." />
</svelte:head>

<WorldShell world="pcp" {studentName} section={screen === 'cv' ? 'Mon CV' : screen === 'letter' ? 'Ma lettre' : ''}>
  {#if screen === 'home'}
    <section class="workshop-home stack-lg">
      <div class="panel-card workshop-hero">
        <div class="workshop-hero-copy">
          <p class="eyebrow">Un atelier, pas une course</p>
          <h1>Donne une forme à ton projet</h1>
          <p class="muted">Avec ton enseignant·e, avance étape par étape : rassemble tes idées, choisis tes mots et fabrique un document dont tu peux être fier·e.</p>
          <div class="session-promise">
            <span class="promise-item">Sauvegarde <strong>automatique</strong></span>
            <span class="promise-item">Exemples <strong>guidés</strong></span>
            <span class="promise-item">Prêt à <strong>imprimer</strong></span>
          </div>
        </div>
        <div class="workshop-hero-art"><WorldArt world="pcp" /></div>
      </div>

      <div class="grid workshop-options">
        <button class="choice-card workshop-option" type="button" on:click={() => openScreen('cv')}>
          <span class="choice-icon" aria-hidden="true">▤</span>
          <strong>Construire mon CV</strong>
          <p>Présente ce que tu sais faire, ce que tu as découvert et ce qui t’intéresse.</p>
          <div class="workshop-progress">
            <span class="small">{cvFilled} étapes sur {Object.keys(emptyCv).length}</span>
            <div class="progress-track" role="progressbar" aria-label={`CV complété à ${cvPercent}%`} aria-valuemin="0" aria-valuemax="100" aria-valuenow={cvPercent}><span class="progress-fill" style={`width:${cvPercent}%`}></span></div>
          </div>
        </button>

        <button class="choice-card workshop-option" type="button" on:click={() => openScreen('letter')}>
          <span class="choice-icon" aria-hidden="true">✉</span>
          <strong>Écrire une lettre</strong>
          <p>Explique pourquoi tu écris, ce qui t’attire et ce que tu peux apporter.</p>
          <div class="workshop-progress">
            <span class="small">{letterFilled} étapes sur {Object.keys(emptyLetter).length}</span>
            <div class="progress-track" role="progressbar" aria-label={`Lettre complétée à ${letterPercent}%`} aria-valuemin="0" aria-valuemax="100" aria-valuenow={letterPercent}><span class="progress-fill" style={`width:${letterPercent}%`}></span></div>
          </div>
        </button>
      </div>

      <p class="privacy-note"><span aria-hidden="true">⌂</span><span>Les brouillons de {studentName} sont enregistrés seulement sous son prénom sur cet appareil partagé.</span></p>
    </section>
  {:else if screen === 'cv'}
    <section class="stack-lg">
      <div class="workshop-toolbar no-print">
        <button class="btn btn-quiet" type="button" on:click={() => openScreen('home')}>← Atelier</button>
        <div class="workshop-progress" style="min-width:min(18rem,100%);">
          <span class="small"><strong>CV :</strong> {cvFilled} étapes sur {Object.keys(emptyCv).length}</span>
          <div class="progress-track" role="progressbar" aria-label={`CV complété à ${cvPercent}%`} aria-valuemin="0" aria-valuemax="100" aria-valuenow={cvPercent}><span class="progress-fill" style={`width:${cvPercent}%`}></span></div>
        </div>
        <div class="actions">
          <button class="btn btn-quiet" type="button" on:click={() => window.print()}>Imprimer / PDF</button>
          <button class="btn btn-primary" type="button" disabled={submitting} on:click={() => markComplete('CV')}>{submitting ? 'Enregistrement…' : 'Mon CV est prêt'}</button>
        </div>
      </div>

      {#if completionMessage}<p class:good={completionOk} class:bad={!completionOk} class="feedback no-print" role="status">{completionMessage}</p>{/if}

      <div class="document-layout">
        <aside class="document-guide no-print">
          <div class="document-guide-card">
            <p class="eyebrow">Ton fil conducteur</p>
            <h2>Clair, vrai, concret</h2>
            <p>Écris des informations exactes. Utilise des verbes d’action et demande une relecture avant d’imprimer.</p>
          </div>
          <div class="document-guide-card stack">
            <h2>Voir un exemple</h2>
            <p>Inspire-toi de la structure, sans recopier les phrases.</p>
            <div class="example-picker">
              {#each cvExamples as example, index}<button class="btn btn-quiet" type="button" on:click={() => (cvExample = example)}>Profil {index + 1}</button>{/each}
            </div>
          </div>
          {#if cvExample}<div class="example-panel"><strong>Modèle d’inspiration</strong><br /><br />{cvExample}</div>{/if}
          <p class="autosave-note">✓ Chaque modification est enregistrée automatiquement pour {studentName}.</p>
        </aside>

        <div class="document-sheet">
          <div class="pcp-grid two">
            <div class="stack-lg">
              <label class="document-field" for="cv-perso"><span>Coordonnées</span><textarea id="cv-perso" class="pcp-field" bind:value={cv.perso} on:input={saveCv} placeholder="Prénom et nom\nRégion / adresse\nTéléphone et e-mail (avec un adulte)"></textarea></label>
              <label class="document-field" for="cv-langues"><span>Langues</span><textarea id="cv-langues" class="pcp-field" bind:value={cv.langues} on:input={saveCv} placeholder="Langue — niveau ou contexte d’utilisation"></textarea></label>
              <label class="document-field" for="cv-info"><span>Outils numériques</span><textarea id="cv-info" class="pcp-field" bind:value={cv.info} on:input={saveCv} placeholder="Traitement de texte, présentation, recherche…"></textarea></label>
              <label class="document-field" for="cv-hobbies"><span>Centres d’intérêt</span><textarea id="cv-hobbies" class="pcp-field" bind:value={cv.hobbies} on:input={saveCv} placeholder="Activité — depuis quand — ce qu’elle t’apporte"></textarea></label>
            </div>
            <div class="stack-lg">
              <label class="document-field" for="cv-hook"><span>Ma phrase de présentation</span><textarea id="cv-hook" class="pcp-field" bind:value={cv.accroche} on:input={saveCv} placeholder="Je suis… J’aime… Je souhaite découvrir…"></textarea></label>
              <label class="document-field" for="cv-school"><span>Parcours scolaire</span><textarea id="cv-school" class="pcp-field" bind:value={cv.ecole} on:input={saveCv} placeholder="Années — école — lieu — projets utiles"></textarea></label>
              <label class="document-field" for="cv-stages"><span>Découvertes et expériences</span><textarea id="cv-stages" class="pcp-field" bind:value={cv.stages} on:input={saveCv} placeholder="Date — métier ou activité — lieu\n• Ce que tu as observé ou réalisé"></textarea></label>
              <label class="document-field" for="cv-refs"><span>Personne de référence</span><textarea id="cv-refs" class="pcp-field" bind:value={cv.references} on:input={saveCv} placeholder="À compléter avec l’accord d’un adulte"></textarea></label>
            </div>
          </div>
        </div>
      </div>
    </section>
  {:else}
    <section class="stack-lg">
      <div class="workshop-toolbar no-print">
        <button class="btn btn-quiet" type="button" on:click={() => openScreen('home')}>← Atelier</button>
        <div class="workshop-progress" style="min-width:min(18rem,100%);">
          <span class="small"><strong>Lettre :</strong> {letterFilled} étapes sur {Object.keys(emptyLetter).length}</span>
          <div class="progress-track" role="progressbar" aria-label={`Lettre complétée à ${letterPercent}%`} aria-valuemin="0" aria-valuemax="100" aria-valuenow={letterPercent}><span class="progress-fill" style={`width:${letterPercent}%`}></span></div>
        </div>
        <div class="actions">
          <button class="btn btn-quiet" type="button" on:click={() => window.print()}>Imprimer / PDF</button>
          <button class="btn btn-primary" type="button" disabled={submitting} on:click={() => markComplete('Lettre de motivation')}>{submitting ? 'Enregistrement…' : 'Ma lettre est prête'}</button>
        </div>
      </div>

      {#if completionMessage}<p class:good={completionOk} class:bad={!completionOk} class="feedback no-print" role="status">{completionMessage}</p>{/if}

      <div class="document-layout">
        <aside class="document-guide no-print">
          <div class="document-guide-card">
            <p class="eyebrow">La recette en trois idées</p>
            <h2>Moi · Vous · Ensemble</h2>
            <p><strong>Moi :</strong> pourquoi j’écris. <strong>Vous :</strong> ce qui m’attire. <strong>Ensemble :</strong> ce que je propose comme prochaine étape.</p>
          </div>
          <div class="document-guide-card stack">
            <h2>Voir un exemple</h2>
            <p>Repère le rôle de chaque paragraphe, puis utilise tes propres mots.</p>
            <div class="example-picker">
              {#each letterExamples as example, index}<button class="btn btn-quiet" type="button" on:click={() => (letterExample = example)}>Lettre {index + 1}</button>{/each}
            </div>
          </div>
          {#if letterExample}<div class="example-panel"><strong>Modèle d’inspiration</strong><br /><br />{letterExample}</div>{/if}
          <p class="autosave-note">✓ Chaque modification est enregistrée automatiquement pour {studentName}.</p>
        </aside>

        <div class="document-sheet letter-sheet">
          <label class="document-field sender" for="letter-sender"><span>Expéditeur ou expéditrice</span><textarea id="letter-sender" class="pcp-field" bind:value={letter.exp} on:input={saveLetter} placeholder="Prénom et nom\nAdresse\nTéléphone et e-mail"></textarea></label>
          <label class="document-field recipient" for="letter-recipient"><span>Destinataire</span><textarea id="letter-recipient" class="pcp-field" bind:value={letter.dest} on:input={saveLetter} placeholder="Organisation\nPersonne responsable\nAdresse"></textarea></label>
          <label class="document-field" for="letter-date"><span>Lieu et date</span><textarea id="letter-date" class="pcp-field" bind:value={letter.date} on:input={saveLetter} placeholder="Lieu, le …"></textarea></label>
          <label class="document-field" for="letter-subject"><span>Objet précis</span><textarea id="letter-subject" class="pcp-field" bind:value={letter.objet} on:input={saveLetter} placeholder="Objet : Demande de…"></textarea></label>
          <label class="document-field" for="letter-call"><span>Formule d’appel</span><textarea id="letter-call" class="pcp-field" bind:value={letter.appel} on:input={saveLetter}></textarea></label>
          <label class="document-field" for="letter-me"><span>1. Moi — pourquoi j’écris</span><textarea id="letter-me" class="pcp-field" bind:value={letter.p1} on:input={saveLetter} placeholder="Je vous écris parce que…"></textarea></label>
          <label class="document-field" for="letter-you"><span>2. Vous — ce qui m’intéresse</span><textarea id="letter-you" class="pcp-field" bind:value={letter.p2} on:input={saveLetter} placeholder="Votre activité m’intéresse car…"></textarea></label>
          <label class="document-field" for="letter-us"><span>3. Ensemble — la prochaine étape</span><textarea id="letter-us" class="pcp-field" bind:value={letter.p3} on:input={saveLetter} placeholder="Je serais heureux·se de…"></textarea></label>
          <label class="document-field signature" for="letter-sign"><span>Salutations et signature</span><textarea id="letter-sign" class="pcp-field" bind:value={letter.sig} on:input={saveLetter} placeholder="Avec mes meilleures salutations,\nPrénom Nom"></textarea></label>
        </div>
      </div>
    </section>
  {/if}
</WorldShell>
