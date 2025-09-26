<script setup lang="ts">
import TableExp from "./experiments/TableExp.vue";
</script>

<template>
  <div class="exp-container">
    <div style="background-color: aliceblue; width: 100%; height: 1rem"></div>
    <TableExp />
  </div>
</template>

<style scoped>
.exp-container {
  min-height: 100vh;
  width: min(600px, 90vw);
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
