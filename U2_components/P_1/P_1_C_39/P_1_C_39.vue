<template>
  <component :is="tag" :style="componentStyle" :class="containerClasses">
    <div class="plane-title">{{ textContent }}</div>

    <div class="plane-grid-container">
      <div class="plane-sub col-span-4 row-span-2">
        <P_1_C_40 :nodes="nodesForC40" :highlightedNodes="props.highlightedNodes" @node-click="handleNodeClick" />
      </div>
      <div class="plane-sub col-span-4 row-span-2">
         <P_1_C_41 :nodes="nodesForC41" :highlightedNodes="props.highlightedNodes" @node-click="handleNodeClick" />
      </div>
      
      <div class="plane-sub col-span-4 row-span-2">
        <P_1_C_44 :nodes="nodesForC44" :highlightedNodes="props.highlightedNodes" @node-click="handleNodeClick" />
      </div>
      <div class="plane-sub col-span-12 row-span-2">
        <P_1_C_45 :nodes="nodesForC45" :highlightedNodes="props.highlightedNodes" @node-click="handleNodeClick" />
      </div>
    </div>
  </component>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'; 
import type { CSSProperties } from 'vue';
import { IProps } from './P_1_C_39_inside_Obj';
import { useControl } from './P_1_C_39_control';
import { useComponentStyles } from './P_1_C_39_inside_UI';
import { useContainer } from './P_1_C_39_inside_utils';

import P_1_C_40 from '../P_1_C_40/P_1_C_40.vue';
import P_1_C_41 from '../P_1_C_41/P_1_C_41.vue';
// [移除] P_1_C_42
// [移除] P_1_C_43
import P_1_C_44 from '../P_1_C_44/P_1_C_44.vue';
import P_1_C_45 from '../P_1_C_45/P_1_C_45.vue';

const props = defineProps<IProps>();
const emit = defineEmits(['node-click']);

const { handleNodeClick } = useControl(props, emit); 

const { componentStyle } = useComponentStyles(props);
const { tag, containerClasses, textContent } = useContainer(props);

// [修改] 移除 C42 和 C43 的过滤
const nodesForC40 = computed(() => props.nodes.filter(n => {
  const parentId = (n as any).parentComponentId;
  return parentId === 'P_1_C_40' || (!parentId && (n.type === 'fsmbrain' || n.type === 'fsm_state' || n.type === 'maintaskevent' || n.type === 'endstate' || n.type === 'blockstate'));
}));
const nodesForC41 = computed(() => props.nodes.filter(n => {
  const parentId = (n as any).parentComponentId;
  return parentId === 'P_1_C_41' || (!parentId && (n.type === 'da_orchestrator' || n.type === 'dsv' || n.type === 'dc_component' || n.type === 'l_component' || n.type === 'da0_component' || n.type === 'adapter_component' || n.type === 'component'));
}));
const nodesForC44 = computed(() => props.nodes.filter(n => {
  const parentId = (n as any).parentComponentId;
  return parentId === 'P_1_C_44' || (!parentId && n.type === 'bus');
}));
const nodesForC45 = computed(() => props.nodes.filter(n => {
  const parentId = (n as any).parentComponentId;
  return parentId === 'P_1_C_45' || (!parentId && (n.type === 'event_node' || n.type === 'fail_event' || n.type === 'doc_node'));
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
/* [修改] 调整 col-span */
.col-span-4 { grid-column: span 4 / span 4; }
.col-span-12 { grid-column: span 12 / span 12; }
.row-span-2 { grid-row: span 2 / span 2; }
</style>