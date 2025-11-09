<template>

  <component

    :is="buttonTag"

    :style="componentStyle"

    id="cancel-extraction-btn"

    class="tech-button"

    @click="handleClick"

  >

    <slot>{{ '取消' }}</slot>

  </component>

</template>



<script lang="ts" setup>

import { defineProps, defineEmits } from 'vue';

import { IProps } from './P_1_C_83_inside_Obj';

import { useControl } from './P_1_C_83_control';

import { useComponentStyles } from './P_1_C_83_inside_UI';

import { useButtonLogic } from './P_1_C_83_inside_utils';



const props = defineProps<IProps>();

const emit = defineEmits(['click']);

const { handleClick } = useControl(props, emit);



const { componentStyle } = useComponentStyles(props);

const { buttonTag } = useButtonLogic(props);

</script>