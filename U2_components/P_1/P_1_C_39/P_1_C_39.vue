<template>
  <component :is="tag" :style="componentStyle" :class="containerClasses">
    <div class="plane-title">{{ textContent }}</div>

    <div class="plane-grid-container">
      <div class="plane-sub col-span-3 row-span-2">
        <P_1_C_40 :nodes="nodesForC40" :highlightedNodes="props.highlightedNodes" />
      </div>
      <div class="plane-sub col-span-3 row-span-2">
        <P_1_C_41 :nodes="nodesForC41" :highlightedNodes="props.highlightedNodes" />
      </div>
      <div class="plane-sub col-span-3 row-span-2">
       <P_1_C_42 :nodes="nodesForC42" :highlightedNodes="props.highlightedNodes" />
      </div>
      <div class="plane-sub col-span-3 row-span-2">
        <P_1_C_43 :nodes="nodesForC43" :highlightedNodes="props.highlightedNodes" />
      </div>
      <div class="plane-sub col-span-6 row-span-2">
        <P_1_C_44 :nodes="nodesForC44" :highlightedNodes="props.highlightedNodes" />
      </div>
      <div class="plane-sub col-span-6 row-span-2">
        <P_1_C_45 :nodes="nodesForC45" :highlightedNodes="props.highlightedNodes" />
      </div>
    </div>
  </component>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'; // [修正] 导入 computed
import type { CSSProperties } from 'vue';
import { IProps } from './P_1_C_39_inside_Obj';
import { useControl } from './P_1_C_39_control';
import { useComponentStyles } from './P_1_C_39_inside_UI';
import { useContainer } from './P_1_C_39_inside_utils';

import P_1_C_40 from '../P_1_C_40/P_1_C_40.vue';
import P_1_C_41 from '../P_1_C_41/P_1_C_41.vue';
import P_1_C_42 from '../P_1_C_42/P_1_C_42.vue';
import P_1_C_43 from '../P_1_C_43/P_1_C_43.vue';
import P_1_C_44 from '../P_1_C_44/P_1_C_44.vue';
import P_1_C_45 from '../P_1_C_45/P_1_C_45.vue';

const props = defineProps<IProps>();
const emit = defineEmits(['node-click']);

// [修正] useControl 现在只负责 emit，过滤逻辑移到这里
const { handleNodeClick } = useControl(props, emit); // [cite: 1135]

const { componentStyle } = useComponentStyles(props);
const { tag, containerClasses, textContent } = useContainer(props);

// [修正] 按 R1.mmd [cite: 1-51] 和 P_1_C_39_control.ts [cite: 1136-1140] 的定义过滤
const nodesForC40 = computed(() => props.nodes.filter(n => n.type === 'fsmbrain' || n.type === 'fsm_state' || n.type === 'maintaskevent' || n.type === 'endstate' || n.type === 'blockstate'));
const nodesForC41 = computed(() => props.nodes.filter(n => n.type === 'da_orchestrator' || n.type === 'dsv' || n.type === 'dc_component' || n.type === 'l_component' || n.type === 'da0_component' || n.type === 'adapter_component' || n.type === 'component'));
const nodesForC42 = computed(() => props.nodes.filter(n => n.type === 'db_component' || n.type === 'repo_iface' || n.type === 'repo_impl' || n.type === 'dat_component')); // 假设写入
const nodesForC43 = computed(() => props.nodes.filter(n => n.type === 'dat_component' || n.type === 'dlq' || n.type === 'monitor' || n.type === 'note')); // 假设读取
const nodesForC44 = computed(() => props.nodes.filter(n => n.type === 'bus'));
const nodesForC45 = computed(() => props.nodes.filter(n => n.type === 'event_node' || n.type === 'fail_event' || n.type === 'doc_node'));

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
.col-span-3 { grid-column: span 3 / span 3; }
.col-span-6 { grid-column: span 6 / span 6; }
.row-span-1 { grid-row: span 1 / span 1; }
.row-span-2 { grid-row: span 2 / span 2; }
</style>