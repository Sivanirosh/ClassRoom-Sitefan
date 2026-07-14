<script lang="ts">
  import { statusLabels } from '../catalog/presentation';
  import type { ExerciseStatus } from '../catalog/schema';

  let { status }: { status: ExerciseStatus } = $props();
</script>

<span class={`status-badge status-${status}`}>{statusLabels[status]}</span>
