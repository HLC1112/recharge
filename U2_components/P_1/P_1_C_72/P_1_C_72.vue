<template>

  <component :is="tag" :style="[textStyle, componentStyle]" :class="textClasses">

    <slot>{{ props.title }}</slot>

  </component>

</template>



<script lang="ts" setup>

import { defineProps, withDefaults } from 'vue';

import { IProps } from './P_1_C_72_inside_Obj';

import { useControl } from './P_1_C_72_control';

import { useComponentStyles } from './P_1_C_72_inside_UI';

import { useText } from './P_1_C_72_inside_utils';



const props = withDefaults(defineProps<IProps>(), {

  title: '选择包含Kotlin文件的...',

});

useControl(props);



const { componentStyle } = useComponentStyles(props);

const { tag, textStyle, textClasses } = useText(props);

</script>