<template>
  <button :class="['button', variant]">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary'
  }
});

const primary = '#6366f1';
const spacing = 16;
</script>

<style scoped>
.button {
  padding: v-bind(spacing + 'px');
  color: white;
  border-radius: 0.5rem;
}

.button.primary {
  background: v-bind(primary);
  border: 2px solid v-bind(primary);
}
</style>

<style>
.m-1 { margin: 0.25rem; }
.m-2 { margin: 0.5rem; }
.m-4 { margin: 1rem; }
</style>
