<template>

  <component :is="tag" :style="componentStyle" :class="componentClasses">

    STATE: {{ props.state || 'S1' }}

  </component>

</template>



<script lang="ts" setup>

import { defineProps } from 'vue';

import { IProps } from './P_1_C_94_inside_Obj';

import { useControl } from './P_1_C_94_control';

import { useComponentStyles } from './P_1_C_94_inside_UI';

import { useTag } from './P_1_C_94_inside_utils';



const props = defineProps<IProps>();

useControl(props);

const { componentStyle, componentClasses } = useComponentStyles(props);

const { tag } = useTag(props);

</script>