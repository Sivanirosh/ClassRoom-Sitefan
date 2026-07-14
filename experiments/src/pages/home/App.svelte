<script lang="ts">
  import LabFooter from '../../lib/components/LabFooter.svelte';
  import LabHeader from '../../lib/components/LabHeader.svelte';
  import { exerciseCatalog } from '../../lib/catalog/discovery';

  const paperCount = exerciseCatalog.filter((record) => record.definition.status === 'planned').length;
  const prototypeCount = exerciseCatalog.filter((record) => record.hasPrototype).length;
</script>

<svelte:head>
  <title>Laboratoire d’exercices · PER</title>
</svelte:head>

<div class="site-shell">
  <LabHeader active="home" />

  <main>
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span></span> Concevoir avant de construire</p>
        <h1 id="hero-title">Des exercices qui rendent les idées <em>manipulables.</em></h1>
        <p class="hero-intro">
          Un espace indépendant pour étudier le PER, concevoir des boucles pédagogiques courtes et prototyper des interactions inspirées de Brilliant.
        </p>
        <div class="hero-actions">
          <a class="button button-primary" href="/catalog/">Ouvrir le catalogue <span aria-hidden="true">→</span></a>
          <a class="button button-secondary" href="#method">Voir la méthode</a>
        </div>
      </div>

      <aside class="hero-dashboard" aria-label="État du laboratoire">
        <div class="dashboard-topline">
          <span>État du laboratoire</span>
          <span class="live-dot">Prêt</span>
        </div>
        <div class="dashboard-count">
          <strong>{String(exerciseCatalog.length).padStart(2, '0')}</strong>
          <span>exercices documentés</span>
        </div>
        <div class="dashboard-grid">
          <div><strong>{paperCount}</strong><span>sur papier</span></div>
          <div><strong>{prototypeCount}</strong><span>prototypes</span></div>
          <div><strong>3</strong><span>degrés HarmoS</span></div>
          <div><strong>PER</strong><span>référentiel</span></div>
        </div>
      </aside>
    </section>

    <section class="scope-strip" aria-label="Périmètre actuel">
      <span>Périmètre actuel</span>
      <strong>6H</strong><i></i><strong>7H</strong><i></i><strong>8H</strong>
      <span class="scope-note">Disciplines fondamentales · Cycle 2</span>
    </section>

    <section class="method-section" id="method" aria-labelledby="method-title">
      <div class="section-heading">
        <p class="eyebrow"><span></span> Processus commun</p>
        <h2 id="method-title">Une idée progresse sans perdre son contexte.</h2>
        <p>La fiche, les références et le prototype conservent le même identifiant pendant toute leur durée de vie.</p>
      </div>

      <ol class="method-grid">
        <li>
          <span class="step-number">01</span>
          <div class="step-icon" aria-hidden="true">⌁</div>
          <h3>Étudier le PER</h3>
          <p>Identifier les objectifs, prérequis et obstacles récurrents pour chaque degré.</p>
          <small>Sources vérifiables</small>
        </li>
        <li>
          <span class="step-number">02</span>
          <div class="step-icon" aria-hidden="true">✎</div>
          <h3>Concevoir sur papier</h3>
          <p>Définir l’objectif, la manipulation, le retour pédagogique et les preuves attendues.</p>
          <small>Fiche structurée</small>
        </li>
        <li>
          <span class="step-number">03</span>
          <div class="step-icon" aria-hidden="true">◇</div>
          <h3>Prototyper en Svelte</h3>
          <p>Construire une seule boucle d’exercice, isolée du catalogue et des autres études.</p>
          <small>Interaction focalisée</small>
        </li>
        <li>
          <span class="step-number">04</span>
          <div class="step-icon" aria-hidden="true">◎</div>
          <h3>Observer et décider</h3>
          <p>Tester la compréhension, noter les écarts et intégrer uniquement les pistes validées.</p>
          <small>Décision documentée</small>
        </li>
      </ol>
    </section>

    <section class="principle-card">
      <p class="eyebrow"><span></span> Principe directeur</p>
      <blockquote>Le dossier donne une identité. Les métadonnées permettent de retrouver l’idée.</blockquote>
      <p>Un classement plat évite les catégories rigides. Le niveau, la discipline, le concept et l’état restent filtrables dans le catalogue.</p>
    </section>
  </main>

  <LabFooter />
</div>
