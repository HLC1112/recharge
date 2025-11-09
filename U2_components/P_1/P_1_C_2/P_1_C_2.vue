<template>

  <component :is="tag" :style="componentStyle">

    <P_1_C_24 />

  </component>

</template>



<script lang="ts" setup>

import { defineProps } from 'vue';

import { IProps } from './P_1_C_2_inside_Obj';

import { useControl } from './P_1_C_2_control';

import { useComponentStyles } from './P_1_C_2_inside_UI';

import { useContainer } from './P_1_C_2_inside_utils';



import P_1_C_24 from '../P_1_C_24/P_1_C_24.vue';



const props = defineProps<IProps>();

useControl(props);



const { componentStyle } = useComponentStyles(props);

const { tag } = useContainer(props);

</script>