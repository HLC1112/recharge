<template>

  <component

    :is="tag"

    :style="[buttonStyle, componentStyle]"

    :class="buttonClasses"

    :id="buttonId"

    :disabled="props.disabled"

    @click="handleClick"

  >

    <slot>{{ props.title }}</slot>

  </component>

</template>



<script lang="ts" setup>

import { defineProps, defineEmits, withDefaults } from 'vue';

import { IProps } from './P_1_C_82_inside_Obj';

import { useControl } from './P_1_C_82_control';

import { useComponentStyles } from './P_1_C_82_inside_UI';

import { useButton } from './P_1_C_82_inside_utils';



const props = withDefaults(defineProps<IProps>(), {

  title: '下载代码',

  disabled: true,

});

const emit = defineEmits<{ (event: 'click'): void }>();



const { handleClick } = useControl(props, emit);

const { componentStyle } = useComponentStyles(props);

const { tag, buttonStyle, buttonClasses, buttonId } = useButton(props);

</script>