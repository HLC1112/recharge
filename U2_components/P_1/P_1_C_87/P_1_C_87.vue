<template>

  <component

    :is="buttonTag"

    :style="componentStyle"

    id="dsv-run-flow-btn"

    class="tech-button"

    :disabled="props.disabled"

    @click="handleClick"

  >

    <slot>{{ '执行流程' }}</slot>

  </component>

</template>



<script lang="ts" setup>

import { defineProps, defineEmits } from 'vue';

import { IProps } from './P_1_C_87_inside_Obj';

import { useControl } from './P_1_C_87_control';

import { useComponentStyles } from './P_1_C_87_inside_UI';

import { useButtonLogic } from './P_1_C_87_inside_utils';



const props = defineProps<IProps>();

const emit = defineEmits(['click']);

const { handleClick } = useControl(props, emit);



const { componentStyle } = useComponentStyles(props);

const { buttonTag } = useButtonLogic(props);

</script>