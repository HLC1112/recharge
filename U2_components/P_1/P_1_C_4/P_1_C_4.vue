<template>

  <component :is="tag" v-if="isVisible" :style="componentStyle">

    <slot>

      </slot>

  </component>

</template>



<script lang="ts" setup>

import { defineProps } from 'vue';

import { IProps } from './P_1_C_4_inside_Obj';

import { useControl } from './P_1_C_4_control';

import { useComponentStyles } from './P_1_C_4_inside_UI';

import { useDialog } from './P_1_C_4_inside_utils';



const props = defineProps<IProps>();

useControl(props);



const { componentStyle } = useComponentStyles(props);

const { tag, isVisible } = useDialog(props);

</script>