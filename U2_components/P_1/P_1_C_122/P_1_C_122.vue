<template>

  <component

    :is="tag"

    :style="componentStyle"

    :class="nodeClasses"

    @click="handleClick"

  >

    <slot>{{ props.nodeData?.label || 'DC: Risk.Score' }}</slot>

  </component>

</template>



<script lang="ts" setup>

import { defineProps, defineEmits } from 'vue';

import { IProps } from './P_1_C_122_inside_Obj';

import { useControl } from './P_1_C\_122_control';

import { useComponentStyles } from './P_1_C\_122_inside_UI';

import { useCard } from './P_1_C\_122_inside_utils';



const props = defineProps<IProps>();

const emit = defineEmits(['click']);



const { handleClick } = useControl(props, emit);

const { componentStyle, nodeClasses } = useComponentStyles(props);

const { tag } = useCard(props);

</script>