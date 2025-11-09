<template>
  <component :is="tag" :style="componentStyle" :class="containerClasses">
    <div class="plane-title">{{ textContent }}</div>

    <div class="plane-grid-container">
      <div class="plane-sub col-span-9 row-span-2">
        <P_1_C_37 :nodes="nodesForC37" :highlightedNodes="props.highlightedNodes" />
      </div>
      <div class="plane-sub col-span-3 row-span-2">
        <P_1_C_38 :nodes="nodesForC38" :highlightedNodes="props.highlightedNodes" />
      </div>
    </div>
  </component>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'; // [修正] 导入 computed
import type { CSSProperties } from 'vue';
import { IProps } from './P_1_C_36_inside_Obj';
import { useControl } from './P_1_C_36_control';
import { useComponentStyles } from './P_1_C_36_inside_UI';
import { useContainer } from './P_1_C_36_inside_utils';

import P_1_C_37 from '../P_1_C_37/P_1_C_37.vue';
import P_1_C_38 from '../P_1_C_38/P_1_C_38.vue';

const props = defineProps<IProps>();
const emit = defineEmits(['node-click']);

// [修正] useControl 现在只负责 emit，过滤逻辑移到这里
const { handleNodeClick } = useControl(props, emit); 

const { componentStyle } = useComponentStyles(props);
const { tag, containerClasses, textContent } = useContainer(props);

// 根据parentComponentId过滤节点，如果没有parentComponentId则回退到类型匹配
const nodesForC37 = computed(() => props.nodes.filter(n => {
  const parentId = (n as any).parentComponentId;
  return parentId === 'P_1_C_37' || (!parentId && n.type === 'httpevent');
}));
const nodesForC38 = computed(() => props.nodes.filter(n => {
  const parentId = (n as any).parentComponentId;
  return parentId === 'P_1_C_38' || (!parentId && n.type === 'beinfra');
}));

</script>

<style scoped>
/* ... 样式保持不变 ... */
.plane-grid-container {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: repeat(4, minmax(0, 1fr));
  gap: 12px;
  height: 100%;
  position: relative;
}
.plane-sub {
  position: relative;
  left: 0%;
  top: 0%;
  border: 1px dashed rgba(114, 174, 255, .35);
  border-radius: 10px;
 background: rgba(0,0,0,.16);
  padding: 8px;
  overflow: hidden;
}
.col-span-9 { grid-column: span 9 / span 9; }
.col-span-3 { grid-column: span 3 / span 3; }
.row-span-2 { grid-row: span 2 / span 2; }
</style>