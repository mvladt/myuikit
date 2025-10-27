<script setup lang="ts"></script>

<template>
  <div class="exp-container">
    <slot></slot>
  </div>
</template>

<style scoped>
.exp-container {
  min-height: calc(100vh - 4rem);
  width: min(600px, 90vw);
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
}
</style>
