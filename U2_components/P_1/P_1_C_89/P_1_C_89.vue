<template>

  <component :is="layoutTag" :style="componentStyle" id="dsv-detail-grid">

    <div

      v-for="node in props.nodes"

      :key="node.id"

      :style="getNodeStyle(node)"

      :class="{ highlighted: isNodeHighlighted(node.id) }"

      @click="handleNodeClick(node)"

    >

      <component

        :is="getNodeComponent(node.componentId)"

        v-bind="node.data"

      />

    </div>

  </component>

</template>



<script lang="ts" setup>

import { defineProps, defineEmits } from 'vue';

import { IProps, DsvNode } from './P_1_C_89_inside_Obj';

import { useControl } from './P_1_C_89_control';

import { useComponentStyles } from './P_1_C_89_inside_UI';

import { useLayoutLogic, useNode } from './P_1_C_89_inside_utils';



const props = defineProps<IProps>();

const emit = defineEmits(['node-click']);

const { handleNodeClick } = useControl(props, emit);



const { componentStyle } = useComponentStyles(props);

const { layoutTag } = useLayoutLogic(props);

const { getNodeStyle, isNodeHighlighted, getNodeComponent } = useNode(props);

</script>