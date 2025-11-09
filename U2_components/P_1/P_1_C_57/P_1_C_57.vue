<template>

  <div ref="graphContainer" :style="componentStyle" :class="containerClasses">

    </div>

</template>



<script lang="ts" setup>

import { defineProps, ref, Ref, watch } from 'vue';

import { IProps, GraphData } from './P_1_C_57_inside_Obj';

import { useControl } from './P_1_C_57_control';

import { useComponentStyles } from './P_1_C_57_inside_UI';

import { useContainer, renderGraph } from './P_1_C_57_inside_utils';



const props = defineProps<IProps>();



const graphContainer = ref<HTMLElement | null>(null);



const { componentStyle } = useComponentStyles(props);

const { containerClasses } = useContainer(props);



useControl(props);



watch(

  () => props.graphData,

  (newData) => {

    if (graphContainer.value && newData) {

      renderGraph(graphContainer.value, newData);

    }

  },

  { deep: true },

);

</script>