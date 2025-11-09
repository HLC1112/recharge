<template>

  <component :is="tag" :style="[textStyle, componentStyle]" :class="textClasses">

    <slot>{{ props.title }}</slot>

  </component>

</template>



<script lang="ts" setup>

import { defineProps, withDefaults } from 'vue';

import { IProps } from './P_1_C_64_inside_Obj';

import { useControl } from './P_1_C_64_control';

import { useComponentStyles } from './P_1_C_64_inside_UI';

import { useText } from './P_1_C_64_inside_utils';



const props = withDefaults(defineProps<IProps>(), {

  title: 'bash -- 110x30',

});

useControl(props);



const { componentStyle } = useComponentStyles(props);

const { tag, textStyle, textClasses } = useText(props);

</script>