<template>
  <component
    :is="tag"
    :id="elementId"
    :style="componentStyle"
    :class="elementClasses"
    @click="handleClickWrapper"
  >
    <div class="plane-title">{{ textContent }}</div>

    <div class="plane-grid-container">
      <div class="plane-sub col-span-2 row-span-1">
        <P_1_C_26 :nodes="nodesForC26" :highlightedNodes="props.highlightedNodes" />
      </div>
      <div class="plane-sub col-span-3 row-span-2">
        <P_1_C_27 :nodes="nodesForC27" :highlightedNodes="props.highlightedNodes" />
      </div>
      <div class="plane-sub col-span-2 row-span-1">
        <P_1_C_28 :nodes="nodesForC28" :highlightedNodes="props.highlightedNodes" />
      </div>
      <div class="plane-sub col-span-2 row-span-1">
        <P_1_C_29 :nodes="nodesForC29" :highlightedNodes="props.highlightedNodes" />
      </div>
      <div class="plane-sub col-span-2 row-span-1">
        <P_1_C_30 :nodes="nodesForC30" :highlightedNodes="props.highlightedNodes" />
      </div>
      <div class="plane-sub col-span-1 row-span-1">
        <P_1_C_31 :nodes="nodesForC31" :highlightedNodes="props.highlightedNodes" />
      </div>
      <div class="plane-sub col-span-2 row-span-1">
        <P_1_C_32 :nodes="nodesForC32" :highlightedNodes="props.highlightedNodes" />
      </div>
      <div class="plane-sub col-span-2 row-span-1">
        <P_1_C_33 :nodes="nodesForC33" :highlightedNodes="props.highlightedNodes" />
      </div>
      <div class="plane-sub col-span-5 row-span-2">
        <P_1_C_34 :nodes="nodesForC34" :highlightedNodes="props.highlightedNodes" />
      </div>
      <div class="plane-sub col-span-8 row-span-1">
        <P_1_C_35 :nodes="nodesForC35" :highlightedNodes="props.highlightedNodes" />
      </div>
    </div>
  </component>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'; // [修正] 导入 computed
import { IProps } from './P_1_C_25_inside_Obj';
import { useControl } from './P_1_C_25_control';
import { useComponentStyles } from './P_1_C_25_inside_UI';
import { useElement } from './P_1_C_25_inside_utils';

// 子组件
import P_1_C_26 from '../P_1_C_26/P_1_C_26.vue';
import P_1_C_27 from '../P_1_C_27/P_1_C_27.vue';
import P_1_C_28 from '../P_1_C_28/P_1_C_28.vue';
import P_1_C_29 from '../P_1_C_29/P_1_C_29.vue';
import P_1_C_30 from '../P_1_C_30/P_1_C_30.vue';
import P_1_C_31 from '../P_1_C_31/P_1_C_31.vue';
import P_1_C_32 from '../P_1_C_32/P_1_C_32.vue';
import P_1_C_33 from '../P_1_C_33/P_1_C_33.vue';
import P_1_C_34 from '../P_1_C_34/P_1_C_34.vue';
import P_1_C_35 from '../P_1_C_35/P_1_C_35.vue';

const props = defineProps<IProps>();
const emit = defineEmits(['node-click']);

const { handleClickWrapper } = useControl(props, emit);
const { componentStyle } = useComponentStyles(props);
const { tag, elementId, elementClasses, textContent } = useElement(props);

// 根据parentComponentId过滤节点，如果没有parentComponentId则回退到类型/ID匹配
const nodesForC26 = computed(() => {
  const filtered = props.nodes.filter(n => {
    const parentId = (n as any).parentComponentId;
    return parentId === 'P_1_C_26' ||
      (!parentId && (n.type === 'trigger' || 
        ['FE_TRIGGER_UI', 'FE_TRIGGER_SLOT', 'BE_Trigger'].some(id => n.id.toUpperCase() === id.toUpperCase())));
  });
  if (filtered.length > 0) {
    console.log(`[P_1_C_25] nodesForC26: 输入 ${props.nodes.length} 个节点, 过滤后 ${filtered.length} 个节点`);
    console.log(`[P_1_C_25] nodesForC26 示例:`, filtered.slice(0, 3).map(n => ({ id: n.id, parentComponentId: (n as any).parentComponentId })));
  }
  return filtered;
});

const nodesForC27 = computed(() => {
  const filtered = props.nodes.filter(n => {
    // 排除 FE_APPFSM 节点，因为它只是容器标题，不应该作为普通节点显示
    if (n.id === 'FE_APPFSM' || n.id.toUpperCase() === 'FE_APPFSM') {
      return false;
    }
    const parentId = (n as any).parentComponentId;
    return parentId === 'P_1_C_27' ||
      (!parentId && ['fsmbrain', 'festate', 'endstate', 'blockstate'].includes(n.type));
  });
  console.log(`[P_1_C_25] nodesForC27: 输入 ${props.nodes.length} 个节点, 过滤后 ${filtered.length} 个节点`);
  if (filtered.length > 0) {
    console.log(`[P_1_C_25] nodesForC27 节点列表:`, filtered.map(n => ({ id: n.id, parentComponentId: (n as any).parentComponentId })));
  }
  return filtered;
});

const nodesForC28 = computed(() => props.nodes.filter(n => {
  const parentId = (n as any).parentComponentId;
  return parentId === 'P_1_C_28' ||
    (!parentId && (n.id.toUpperCase() === 'FE_TSDSV' || n.id === 'fe_tsdsv'));
}));

const nodesForC29 = computed(() => props.nodes.filter(n => {
  const parentId = (n as any).parentComponentId;
  return parentId === 'P_1_C_29' ||
    (!parentId && n.type === 'ufstore');
}));

const nodesForC30 = computed(() => props.nodes.filter(n => {
  const parentId = (n as any).parentComponentId;
  return parentId === 'P_1_C_30' ||
    (!parentId && n.type === 'uistore');
}));

const nodesForC31 = computed(() => props.nodes.filter(n => {
  const parentId = (n as any).parentComponentId;
  return parentId === 'P_1_C_31' ||
    (!parentId && (n.id.toUpperCase() === 'FE_L_WRITER' || n.id === 'fe_l_writer'));
}));

const nodesForC32 = computed(() => props.nodes.filter(n => {
  const parentId = (n as any).parentComponentId;
  return parentId === 'P_1_C_32' ||
    (!parentId && n.type === 'cache');
}));

const nodesForC33 = computed(() => props.nodes.filter(n => {
  const parentId = (n as any).parentComponentId;
  return parentId === 'P_1_C_33' ||
    (!parentId && (n.id.toUpperCase() === 'FE_APICLIENT' || n.id === 'fe_apiclient'));
}));

const nodesForC34 = computed(() => props.nodes.filter(n => {
  const parentId = (n as any).parentComponentId;
  return parentId === 'P_1_C_34';
}));

const nodesForC35 = computed(() => props.nodes.filter(n => {
  const parentId = (n as any).parentComponentId;
  return parentId === 'P_1_C_35' ||
    (!parentId && n.type === 'appevent');
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
  padding: 24px;
  overflow: hidden;
}
.col-span-1 { grid-column: span 1 / span 1; }
.col-span-2 { grid-column: span 2 / span 2; }
.col-span-3 { grid-column: span 3 / span 3; }
.col-span-5 { grid-column: span 5 / span 5; }
.col-span-8 { grid-column: span 8 / span 8; }
.row-span-1 { grid-row: span 1 / span 1; }
.row-span-2 { grid-row: span 2 / span 2; }
</style>