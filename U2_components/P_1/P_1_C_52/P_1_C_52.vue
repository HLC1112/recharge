<template>

  <div v-if="props.visible" :style="componentStyle" :class="containerClasses">

    <slot></slot>

  </div>

</template>



<script lang="ts" setup>

import { defineProps, withDefaults } from 'vue';

import { IProps } from './P_1_C_52_inside_Obj';

import { useControl } from './P_1_C_52_control';

import { useComponentStyles } from './P_1_C_52_inside_UI';

import { useContainer } from './P_1_C_52_inside_utils';



const props = withDefaults(defineProps<IProps>(), {

  visible: false,

});

useControl(props);



const { componentStyle } = useComponentStyles(props);

const { containerClasses } = useContainer(props);

</script>