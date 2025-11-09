<template>

  <div v-if="state.isVisible" :style="componentStyle" :class="drawerClasses">

    <slot></slot>

  </div>

</template>



<script lang="ts" setup>

import { defineProps, withDefaults, watch } from 'vue';

import { IProps } from './P_1_C_48_inside_Obj';

import { useControl } from './P_1_C_48_control';

import { state } from './P_1_C_48_inside_State';

import { useComponentStyles } from './P_1_C_48_inside_UI';

import { useDrawer } from './P_1_C_48_inside_utils';



const props = withDefaults(defineProps<IProps>(), {

  visible: false,

  direction: 'rtl',

  size: '500px',

});



useControl(props);



const { componentStyle } = useComponentStyles(props, state);

const { drawerClasses } = useDrawer(props);



watch(

  () => props.visible,

  (newValue) => {

    state.isVisible = newValue;

  },

);

</script>