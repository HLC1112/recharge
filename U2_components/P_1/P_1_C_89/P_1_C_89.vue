<template>
  <component :is="layoutTag" :style="componentStyle">
    <div
      v-for="node in props.nodes"
      :key="node.id"
      :id="node.id"
      :style="getNodeStyle(node)"
      :class="{ highlighted: isNodeHighlighted(node.id) }"
      @click="handleNodeClick(node)"
    >
      <component
        :is="getNodeComponent(node.componentId)"
        :nodeData="node"
        :isHighlighted="isNodeHighlighted(node.id)"
        
        :nodes="getNodesForChildContainer(node.componentId)"
        :highlightedNodes="allHighlightedNodes"
        />
    </div>
  </component>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { IProps, DsvNode } from './P_1_C_89_inside_Obj';
import { useControl } from './P_1_C_89_control';
import { useComponentStyles } from './P_1_C_89_inside_UI';
// --- [ 修正 ] ---
// 只导入 useLayoutLogic 和 useNode
import { useLayoutLogic, useNode } from './P_1_C_89_inside_utils';

const props = defineProps<IProps>();
const emit = defineEmits(['node-click']);
const { handleNodeClick } = useControl(props, emit);

const { componentStyle } = useComponentStyles(props);
const { layoutTag } = useLayoutLogic(props);

// --- [ 修正 ] ---
// 从 useNode(props) 的返回值中解构出所有需要的函数
const { 
  getNodeStyle, 
  isNodeHighlighted, 
  getNodeComponent, 
  getNodesForChildContainer, // <-- 新增
  allHighlightedNodes      // <-- 新增
} = useNode(props);
</script>