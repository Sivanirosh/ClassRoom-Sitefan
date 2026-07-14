<script lang="ts">
  type ActivePage = 'home' | 'catalog';

  let { active = 'home' }: { active?: ActivePage } = $props();
</script>

<header class="lab-header">
  <a class="lab-brand" href="/" aria-label="Accueil du laboratoire">
    <span class="lab-brand-mark" aria-hidden="true">
      <span></span><span></span><span></span>
    </span>
    <span>
      <strong>Laboratoire</strong>
      <small>Exercices · PER</small>
    </span>
  </a>

  <nav aria-label="Navigation principale">
    <a class:active={active === 'home'} aria-current={active === 'home' ? 'page' : undefined} href="/">Accueil</a>
    <a class:active={active === 'catalog'} aria-current={active === 'catalog' ? 'page' : undefined} href="/catalog/">Catalogue</a>
  </nav>

  <span class="developer-label">Interface développeur</span>
</header>
