<template>

  <component

    :is="buttonTag"

    :style="componentStyle"

    id="close-dsv-detail-btn"

    @click="handleClick"

  >

    <slot>{{ '×' }}</slot>

  </component>

</template>



<script lang="ts" setup>

import { defineProps, defineEmits } from 'vue';

import { IProps } from './P_1_C_88_inside_Obj';

import { useControl } from './P_1_C_88_control';

import { useComponentStyles } from './P_1_C_88_inside_UI';

import { useButtonLogic } from './P_1_C_88_inside_utils';



const props = defineProps<IProps>();

const emit = defineEmits(['click']);

const { handleClick } = useControl(props, emit);



const { componentStyle } = useComponentStyles(props);

const { buttonTag } = useButtonLogic(props);

</script>