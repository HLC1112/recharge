<template>

  <component

    :is="tag"

    :style="componentStyle"

    class="plane-title text-2xl"

  >

    <slot>{{ props.title }}</slot>

  </component>

</template>



<script lang="ts" setup>

import { defineProps } from 'vue';

import { IProps } from './P_1_C_86_inside_Obj';

import { useControl } from './P_1_C_86_control';

import { useComponentStyles } from './P_1_C_86_inside_UI';

import { useText } from './P_1_C_86_inside_utils';



const props = withDefaults(defineProps<IProps>(), {

  title: 'DSV 详情（内部流程）',

});

useControl(props);



const { componentStyle } = useComponentStyles(props);

const { tag } = useText(props);

</script>