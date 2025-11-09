<template>

  <div :style="componentStyle" :class="containerClasses">

    <span class="plane-title-text">RESPONDER</span>

    <div class="node-container">

      <div

        v-for="node in renderedNodes"

        :key="node.id"

        :id="node.id"

        :class="getNodeClasses(node)"

        @click="handleNodeClick(node.id, node)"

      >

        {{ node.label || node.id }}

      </div>

    </div>

  </div>

</template>



<script lang="ts" setup>

import { defineProps, defineEmits, withDefaults } from 'vue';

import { IProps, IEmits, INode } from './P_1_C_31_inside_Obj';

import { useControl } from './P_1_C_31_control';

import { useComponentStyles } from './P_1_C_31_inside_UI';

import { useContainer, getNodeClasses } from './P_1_C_31_inside_utils';



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
}
</style>