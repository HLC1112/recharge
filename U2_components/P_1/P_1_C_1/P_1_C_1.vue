<template>

  <component :is="tag" :style="componentStyle">

    <slot></slot>

  </component>

</template>



<script lang="ts" setup>

import { defineProps } from 'vue';

import { IProps } from './P_1_C_1_inside_Obj';

import { useControl } from './P_1_C_1_control';

import { useComponentStyles } from './P_1_C_1_inside_UI';

import { useContainer } from './P_1_C_1_inside_utils';



const props = defineProps<IProps>();

useControl(props);



const { componentStyle } = useComponentStyles(props);

const { tag } = useContainer(props);

</script>