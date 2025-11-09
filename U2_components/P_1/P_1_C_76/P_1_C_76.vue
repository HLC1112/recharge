<template>

  <component :is="tag" :id="containerId" :style="componentStyle" :class="containerClasses">

    <slot></slot>

  </component>

</template>



<script lang="ts" setup>

import { defineProps } from 'vue';

import { IProps } from './P_1_C_76_inside_Obj';

import { useControl } from './P_1_C_76_control';

import { useComponentStyles } from './P_1_C_76_inside_UI';

import { useContainer } from './P_1_C_76_inside_utils';



const props = defineProps<IProps>();

useControl(props);



const { componentStyle } = useComponentStyles(props);

const { tag, containerId, containerClasses } = useContainer(props);

</script>