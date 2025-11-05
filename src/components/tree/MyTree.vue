<script setup lang="ts">
/**
 * Требует Vue 3.3+ (для defineOptions в <script setup>) — если у вас более старая версия, вместо defineOptions
 * нужно экспортировать компонент обычным defineComponent и задать name.
 */
import type { TreeNode } from "./myTree.d.ts";
import { ref, computed } from "vue";

defineOptions({ name: "MyTree" });

/** Props */
const props = defineProps<{
  nodes: TreeNode[]; // список узлов текущего уровня
  /** начальное развернутое множество ключей при неконтролируемом режиме (необязательно) */
  defaultExpandedKeys?: any[];
}>();

/** Emits */
type TogglePayload = {
  node: TreeNode;
  path: any[]; // путь ключей от корня до этой ноды (включая саму)
  expanded: boolean; // новое состояние (true если после клика стало развернуто)
};
const emits = defineEmits<{
  (e: "toggle", payload: TogglePayload): void;
}>();

/**
 * Внутренний Set для "неконтролируемого" режима.
 * Если node.expanded !== undefined — считаем, что родитель контролирует состояние этой ноды.
 */
const expandedSet = ref(new Set<any>(props.defaultExpandedKeys ?? []));

/** Вспомогательная: узнаем, развернута ли нода (приоритет: node.expanded если задано) */
function isExpanded(node: TreeNode): boolean {
  if (typeof node.expanded === "boolean") {
    return node.expanded;
  }
  return expandedSet.value.has(node.key);
}

/** Обработка клика "toggle" — если node.expanded задан, мы не трогаем set, просто эмитим;
 * иначе переключаем внутренний set и эмитим с новым состоянием.
 * path передаём наружу, чтобы родитель мог точно идентифицировать узел в глубине.
 */
function onToggle(node: TreeNode, path: any[]) {
  const controlled = typeof node.expanded === "boolean";
  let newExpanded: boolean;
  if (controlled) {
    // родитель контролирует состояние — только эмитируем
    newExpanded = !node.expanded;
  } else {
    // переключаем внутренний Set
    if (expandedSet.value.has(node.key)) {
      expandedSet.value.delete(node.key);
      newExpanded = false;
    } else {
      expandedSet.value.add(node.key);
      newExpanded = true;
    }
  }
  emits("toggle", { node, path, expanded: newExpanded });
}

/**
 * Utility: рекурсивная отрисовка в шаблоне — path строим на лету
 * В шаблоне используем компонент рекурсивно по имени 'MyTree' (defineOptions name).
 */
</script>

<template>
  <ul>
    <li v-for="node in props.nodes" :key="node.key">
      <div style="display: inline-flex; align-items: center; gap: 6px">
        <!-- Показываем кнопку только если есть children -->
        <button
          v-if="node.children && node.children.length"
          @click="() => onToggle(node, [node.key])"
          type="button"
          aria-label="toggle"
        >
          <!-- Понятный символ: если развернута — '-', иначе '+' -->
          {{ isExpanded(node) ? "-" : "+" }}
        </button>

        <!-- label слот: позволяет кастомизировать как рендерить label узла.
             Если слот не передан — рендерим node.label -->
        <span>
          <slot name="label" :node="node">
            {{ node.label }}
          </slot>
        </span>
      </div>

      <!-- children: рендерим рекурсивно, передаём path вниз.
           Здесь нужно расширить path: но шаблон v-for не даёт простой возможности
           — поэтому сделаем немного хитрость: используем локальный компонент MyTree
           рекурсивно и вычисляем path в событии @toggle дочернего уровня.
        -->
      <MyTree
        v-if="node.children && node.children.length && isExpanded(node)"
        :nodes="node.children"
        @toggle="
          (payload) => {
            // payload.path содержит путь внутри дочернего поддерева — prepend our node.key
            const fullPath = [node.key, ...payload.path];
            // передаём вверх полный путь
            emits('toggle', {
              node: payload.node,
              path: fullPath,
              expanded: payload.expanded,
            });
          }
        "
      />
    </li>
  </ul>
</template>

<!-- no styles by request -->
<style scoped></style>
