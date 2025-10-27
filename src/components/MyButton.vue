<script setup lang="ts"></script>

<template>
  <button class="input flex-container" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<style scoped>
.input {
  font-family: inherit;
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;
  /* border-radius: 5px; */
}

/* .input {
  color: var(--color-text);
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
}

button:hover {
  background-color: var(--color-background-mute);
}
button:active {
  background-color: var(--color-background-soft);
} */

.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
}
</style>
