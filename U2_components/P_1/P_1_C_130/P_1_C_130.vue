<template>
  <div :style="componentStyle" :class="containerClasses" data-container-id="DBS_Container">
    <span :style="planeTitleStyle">DBS Repositories</span>
    <div :style="nodeContainerStyle">
      <div
        v-for="node in renderedNodes"
        :key="node.id"
        :id="node.id"
        :style="nodeStyle"
        @click="handleNodeClick(node.id, node)"
      >
        <P_1_C_124
          :text="node.label"
          :styleClass="node.styleClass"
          :isHighlighted="node.isHighlighted"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits, withDefaults } from 'vue';
import { IProps, INode } from './P_1_C_130_inside_Obj';
import { useControl } from './P_1_C_130_control';
import { useComponentStyles, useChildStyles } from './P_1_C_130_inside_UI';
// 导入 P_1_C_124 以便在模板中使用
import P_1_C_124 from '../P_1_C_124/P_1_C_124.vue';

const props = withDefaults(defineProps<IProps>(), {
  nodes: () => [],
  highlightedNodes: () => [],
});
const emit = defineEmits(['node-click']);

const { componentStyle, containerClasses } = useComponentStyles(props);
const { planeTitleStyle, nodeContainerStyle, nodeStyle } = useChildStyles(props);
const { handleNodeClick, renderedNodes } = useControl(props, emit);
</script>