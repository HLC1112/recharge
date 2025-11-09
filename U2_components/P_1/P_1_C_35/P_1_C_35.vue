<template>

  <div :style="componentStyle" :class="containerClasses">

    <span class="plane-title-text">前端事件</span>

    <div class="node-container">

      <div

        v-for="node in renderedNodes"

        :key="node.id"

        :id="node.id"

        :class="getNodeClasses(node)"

        :style="node.style || (node as any).cssStyle || ''"

        @click="handleNodeClick(node.id, node)"

      >

        {{ node.label || (node as any).text || node.id }}

      </div>

    </div>

  </div>

</template>



<script lang="ts" setup>

import { defineProps, defineEmits, withDefaults } from 'vue';

import { IProps, IEmits, INode } from './P_1_C_35_inside_Obj';

import { useControl } from './P_1_C_35_control';

import { useComponentStyles } from './P_1_C_35_inside_UI';

import { useContainer, getNodeClasses } from './P_1_C_35_inside_utils';



const props = withDefaults(defineProps<IProps>(), {

  nodes: () => [],

  highlightedNodes: () => [],

});



const emit = defineEmits<IEmits>();



const { componentStyle } = useComponentStyles(props);

const { containerClasses } = useContainer(props);

const { handleNodeClick, renderedNodes } = useControl(props, emit);

</script>