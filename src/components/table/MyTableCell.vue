<script setup lang="ts">
type CellType = "head" | "foot" | "default";

type Props = {
  type?: CellType;
  break?: boolean;
};

const props = defineProps<Props>();
</script>

<template>
  <th v-if="props.type === 'head'" class="data strong">
    <slot></slot>
  </th>
  <td v-else-if="props.type === 'foot'" class="data strong">
    <slot></slot>
  </td>
  <td v-else class="data">
    <slot></slot>
  </td>
</template>

<style scoped>
.data {
  min-width: 50px;
  max-width: 250px;
  padding: 0.5rem;
  line-height: 1.2;
}

:is(th, td):not(:first-child) {
  border-left: 1px solid darkgray;
}

.strong {
  font-weight: 500;
}
</style>
