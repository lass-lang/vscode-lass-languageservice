<script>
  let primary = '#6366f1';
  let spacing = 16;
  
  export let variant = 'primary';
</script>

<button class="button {variant}">
  <slot />
</button>

<style>
  .button {
    padding: calc(var(--spacing) * 1px);
    color: white;
    border-radius: 0.5rem;
  }
  
  .button.primary {
    background: var(--primary);
    border: 2px solid var(--primary);
  }
  
  :global(.m-1) { margin: 0.25rem; }
  :global(.m-2) { margin: 0.5rem; }
  :global(.m-4) { margin: 1rem; }
</style>
