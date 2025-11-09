<template>

  <component :is="tag" :id="elementId" :style="componentStyle" :class="elementClasses">

    <P_1_C_25 v-bind="frontendProps" @node-click="handleNodeClick" />

    <P_1_C_36 v-bind="httpsProps" @node-click="handleNodeClick" />

    <P_1_C_39 v-bind="backendProps" @node-click="handleNodeClick" />

  </component>

</template>



<script lang="ts" setup>

import { defineProps, defineEmits } from 'vue';

import { IProps } from './P_1_C_24_inside_Obj';

import { useControl } from './P_1_C_24_control';

import { useComponentStyles } from './P_1_C_24_inside_UI';

import { useElement, usePlaneNodes } from './P_1_C_24_inside_utils';



import P_1_C_25 from '../P_1_C_25/P_1_C_25.vue';

import P_1_C_36 from '../P_1_C_36/P_1_C_36.vue';

import P_1_C_39 from '../P_1_C_39/P_1_C_39.vue';



const props = defineProps<IProps>();

const emit = defineEmits(['node-click']);



const { handleNodeClick } = useControl(props, emit);

const { componentStyle } = useComponentStyles(props);

const { tag, elementId, elementClasses } = useElement(props);

const { frontendProps, httpsProps, backendProps } = usePlaneNodes(props);

</script>