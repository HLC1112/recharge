<template>

  <button

    :style="componentStyle"

    :class="buttonClasses"

    @click="handleClick"

    :disabled="props.disabled"

  >

    <slot>{{ props.title }}</slot>

  </button>

</template>



<script lang="ts" setup>

import { defineProps, defineEmits, withDefaults } from 'vue';

import { IProps, IEmits } from './P_1_C_59_inside_Obj';

import { useControl } from './P_1_C_59_control';

import { useComponentStyles } from './P_1_C_59_inside_UI';

import { useButton } from './P_1_C_59_inside_utils';



const props = withDefaults(defineProps<IProps>(), {

  title: '一键 DEBUG',

  disabled: false,

});



const emit = defineEmits<IEmits>();



const { handleClick } = useControl(props, emit);

const { componentStyle } = useComponentStyles(props);

const { buttonClasses } = useButton(props);

</script>