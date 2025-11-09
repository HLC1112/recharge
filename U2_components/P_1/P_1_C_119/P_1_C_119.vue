<template>

  <component

    :is="tag"

    :style="componentStyle"

    :class="nodeClasses"

    @click="handleClick"

  >

    <slot>{{ props.nodeData?.label || 'DSV_FSM: ...' }}</slot>

  </component>

</template>



<script lang="ts" setup>

import { defineProps, defineEmits } from 'vue';

import { IProps } from './P_1_C_119_inside_Obj';

import { useControl } from './P_1_C_119_control';

import { useComponentStyles } from './P_1_C_119_inside_UI';

import { useCard } from './P_1_C_119_inside_utils';



const props = defineProps<IProps>();

const emit = defineEmits(['click']);



const { handleClick } = useControl(props, emit);

const { componentStyle, nodeClasses } = useComponentStyles(props);

const { tag } = useCard(props);

</script>