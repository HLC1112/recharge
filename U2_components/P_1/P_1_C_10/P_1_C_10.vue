<template>

  <component

    :is="tag"

    :id="buttonId"

    :style="componentStyle"

    :class="buttonClasses"

    :disabled="props.disabled"

    @click="handleClick"

  >

    <slot>{{ buttonText }}</slot>

  </component>

</template>



<script lang="ts" setup>

import { defineProps, defineEmits } from 'vue';

import { IProps } from './P_1_C_10_inside_Obj';

import { useControl } from './P_1_C_10_control';

import { useComponentStyles } from './P_1_C_10_inside_UI';

import { useButton } from './P_1_C_10_inside_utils';



const props = defineProps<IProps>();

const emit = defineEmits(['click']);



const { handleClick } = useControl(props, emit);

const { componentStyle } = useComponentStyles(props);

const { tag, buttonText, buttonId, buttonClasses } = useButton(props);

</script>