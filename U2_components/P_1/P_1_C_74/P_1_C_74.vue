<template>

  <component :is="tag" :id="textId" :style="[textStyle, componentStyle]" :class="textClasses">

    <slot>{{ props.pathInfo }}</slot>

  </component>

</template>



<script lang="ts" setup>

import { defineProps } from 'vue';

import { IProps } from './P_1_C_74_inside_Obj';

import { useControl } from './P_1_C_74_control';

import { useComponentStyles } from './P_1_C_74_inside_UI';

import { useText } from './P_1_C_74_inside_utils';



const props = defineProps<IProps>();

useControl(props);



const { componentStyle } = useComponentStyles(props);

const { tag, textId, textStyle, textClasses } = useText(props);

</script>