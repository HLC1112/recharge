<template>

  <component :is="tag" :style="componentStyle" :class="componentClasses">

    <slot>

      </slot>

  </component>

</template>



<script lang="ts" setup>

import { defineProps } from 'vue';

import { IProps } from './P_1_C_91_inside_Obj';

import { useControl } from './P_1_C_91_control';

import { useComponentStyles } from './P_1_C_91_inside_UI';

import { useContainer } from './P_1_C_91_inside_utils';



const props = defineProps<IProps>();

useControl(props);

const { componentStyle, componentClasses } = useComponentStyles(props);

const { tag } = useContainer(props);

</script>