<template>

  <component :is="tag" :style="componentStyle" :class="componentClasses" v-bind="pathAttributes" />

</template>



<script lang="ts" setup>

import { defineProps } from 'vue';

import { IProps } from './P_1_C_97_inside_Obj';

import { useControl } from './P_1_C_97_control';

import { useComponentStyles } from './P_1_C_97_inside_UI';

import { usePath } from './P_1_C_97_inside_utils';



const props = defineProps<IProps>();

useControl(props);

const { componentStyle, componentClasses, pathAttributes } =

  useComponentStyles(props);

const { tag } = usePath(props);

</script>