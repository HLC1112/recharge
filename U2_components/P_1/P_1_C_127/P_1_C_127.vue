<template>
  <div :style="componentStyle" :class="containerClasses" id="FE_APPFSM" data-container-id="FE_APPFSM">
    <span class="plane-title-text">DSV_FSM: RiskScoringFsm(流程编排与状态机)</span>
    <div class="node-container">
      <div
        v-for="node in renderedNodes"
        :key="node.id"
        :id="node.id"
        :style="getNodeStyle(node)"
        @click="handleNodeClick(node.id, node)"
      >
        <P_1_C_120
          :nodeData="node"
          :isHighlighted="node.isHighlighted"
          :isFailure="false" 
        />
      </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, withDefaults } from 'vue';
import { IProps, IEmits, INode } from './P_1_C_127_inside_Obj';
import { useControl } from './P_1_C_127_control';
import { useComponentStyles } from './P_1_C_127_inside_UI';
import { useContainer, getNodeStyle } from './P_1_C_127_inside_utils';

// 导入此容器要渲染的 FSM 状态节点组件
import P_1_C_120 from '../P_1_C_120/P_1_C_120.vue';

const props = withDefaults(defineProps<IProps>(), {
  nodes: () => [],
  highlightedNodes: () => [],
});

const emit = defineEmits<IEmits>();

const { componentStyle } = useComponentStyles(props);
const { containerClasses } = useContainer(props);
const { handleNodeClick, renderedNodes } = useControl(props, emit);
</script>

<style scoped>
/* 样式基于 P_1_C_27.vue */
.plane-title-text {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 10;
  color: #8ef9f3;
  font-weight: 600;
  font-size: 14px;
}
.node-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 32px;
  width: 100%;
  height: 100%;
  align-content: flex-start;
  overflow-y: auto; /* 允许内部滚动 */
}
</style>