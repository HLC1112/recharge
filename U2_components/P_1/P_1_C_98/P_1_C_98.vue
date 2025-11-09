<template>

  <component

    :is="tag"

    :style="[componentStyle]"

    id="arrowhead"

    markerWidth="10"

    markerHeight="7"

    refX="0"

    refY="3.5"

    orient="auto"

  >

    <polygon class="arrow-head" points="0 0, 10 3.5, 0 7" />

  </component>

</template>



<script lang="ts" setup>

import { defineProps } from 'vue';

import { IProps } from './P_1_C_98_inside_Obj';

import { useControl } from './P_1_C_98_control';

import { useComponentStyles } from './P_1_C_98_inside_UI';

import { useElement } from './P_1_C_98_inside_utils';



const props = defineProps<IProps>();

useControl(props);



const { componentStyle } = useComponentStyles(props);

const { tag } = useElement(props);

</script>