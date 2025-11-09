<template>

  <div :style="componentStyle" :class="containerClasses">

    <slot>{{ props.analysisText }}</slot>

  </div>

</template>



<script lang="ts" setup>

import { defineProps, withDefaults } from 'vue';

import { IProps } from './P_1_C_58_inside_Obj';

import { useControl } from './P_1_C_58_control';

import { useComponentStyles } from './P_1_C_58_inside_UI';

import { useContainer } from './P_1_C_58_inside_utils';



const props = withDefaults(defineProps<IProps>(), {

  analysisText: '',

});

useControl(props);



const { componentStyle } = useComponentStyles(props);

const { containerClasses } = useContainer(props);

</script>