<template>

  <component :is="tag" v-if="props.visible" :style="componentStyle">

    <P_1_C_79 :visible="true">

      <P_1_C_80 :items="props.results" />

    </P_1_C_79>

  </component>

</template>



<script lang="ts" setup>

import { defineProps } from 'vue';

import { IProps } from './P_1_C_78_inside_Obj';

import { useControl } from './P_1_C_78_control';

import { useComponentStyles } from './P_1_C_78_inside_UI';

import { useContainer } from './P_1_C_78_inside_utils';

import P_1_C_79 from '../P_1_C_79/P_1_C_79.vue';

import P_1_C_80 from '../P_1_C_80/P_1_C_80.vue';



const props = defineProps<IProps>();

useControl(props);



const { componentStyle } = useComponentStyles(props);

const { tag } = useContainer(props);

</script>