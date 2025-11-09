<template>

  <component :is="tag" :style="componentStyle" v-if="props.visible">

    <P_1_C_76 :visible="true">

      <P_1_C_77 :progress="props.progress" />

    </P_1_C_76>

  </component>

</template>



<script lang="ts" setup>

import { defineProps } from 'vue';

import { IProps } from './P_1_C_75_inside_Obj';

import { useControl } from './P_1_C_75_control';

import { useComponentStyles } from './P_1_C_75_inside_UI';

import { useContainer } from './P_1_C_75_inside_utils';

import P_1_C_76 from '../P_1_C_76/P_1_C_76.vue';

import P_1_C_77 from '../P_1_C_77/P_1_C_77.vue';



const props = defineProps<IProps>();

useControl(props);



const { componentStyle } = useComponentStyles(props);

const { tag } = useContainer(props);

</script>