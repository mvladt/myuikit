<script setup lang="ts"></script>

<template>
  <table v-bind="$attrs">
    <thead>
      <slot name="head"></slot>
    </thead>
    <tbody>
      <slot name="body"></slot>
    </tbody>
    <tfoot>
      <slot name="foot"></slot>
    </tfoot>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
:slotted(tbody tr) {
  border-top: 1px solid darkgray;
}
</style>
