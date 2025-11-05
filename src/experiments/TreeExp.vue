<script setup lang="ts">
import { ref } from "vue";

import MyTree from "../components/tree/MyTree.vue";
import ExpContainer from "../ExpContainer.vue";
import type { TreeNode } from "../components/tree/myTree";

const nodes = ref<TreeNode[]>([
  {
    key: 1,
    label: "Root 1",
    children: [
      { key: 11, label: "Child 1.1" },
      {
        key: 12,
        label: "Child 1.2",
        children: [{ key: 121, label: "Grandchild 1.2.1" }],
      },
    ],
  },
  { key: 2, label: "Root 2" },
]);

function onToggle(payload: { node: TreeNode; path: any[]; expanded: boolean }) {
  console.log("toggle", payload);
  // Пример: если вы хотите контролировать expanded, нужно найти node по path и обновить объект:
  // простая реализация (mutating nodes ref):
  const findAndSet = (list: TreeNode[], path: any[]) => {
    const key = path[0];
    const next = list.find((n) => n.key === key);
    if (!next) return;
    if (path.length === 1) {
      // устанавливем контролируемое поле expanded
      next.expanded = payload.expanded;
    } else if (next.children) {
      findAndSet(next.children, path.slice(1));
    }
  };
  findAndSet(nodes.value, payload.path);
}

const update = (tree: TreeNode[], key: any, news: TreeNode[]) => {
  for (const node of tree) {
    if (node.key === key) {
      node.children = news;
      return;
    }

    if (node.children) update(node.children, key, news);
  }
};
</script>

<template>
  <ExpContainer>
    <MyTree :nodes="nodes" @toggle="onToggle" />
  </ExpContainer>
</template>
