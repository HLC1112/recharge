<template>

  <div v-if="props.visible" :style="componentStyle" :class="dialogClasses">

    <slot></slot>

  </div>

</template>



<script lang="ts" setup>

import { defineProps, withDefaults } from 'vue';

import { IProps } from './P_1_C_68_inside_Obj';

import { useControl } from './P_1_C_68_control';

import { useComponentStyles } from './P_1_C_68_inside_UI';

import { useDialog } from './P_1_C_68_inside_utils';



const props = withDefaults(defineProps<IProps>(), {

  visible: false,

});

useControl(props);



const { componentStyle } = useComponentStyles(props);

const { dialogClasses } = useDialog(props);

</script>