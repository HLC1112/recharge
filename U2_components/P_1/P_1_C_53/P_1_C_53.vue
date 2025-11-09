<template>

  <P_1_C_54 :visible="props.visible">

    <P_1_C_55 :title="state.title" />

    <P_1_C_56 @click="handleClose" />

    <P_1_C_57 :graphData="props.failureContext.graphData || {}" />

    <P_1_C_58 :analysisText="props.failureContext.analysis || ''" />

    <P_1_C_59 @click="handleDebug" />

    <P_1_C_60 @click="handleExtractCode" />

    <P_1_C_61 @click="handleAskGemini" />

  </P_1_C_54>

</template>



<script lang="ts" setup>

import { defineProps, defineEmits, withDefaults } from 'vue';

import { IProps, IEmits } from './P_1_C_53_inside_Obj';

import { useControl } from './P_1_C_53_control';

import { state } from './P_1_C_53_inside_State';



import P_1_C_54 from '../P_1_C_54/P_1_C_54.vue';

import P_1_C_55 from '../P_1_C_55/P_1_C_55.vue';

import P_1_C_56 from '../P_1_C_56/P_1_C_56.vue';

import P_1_C_57 from '../P_1_C_57/P_1_C_57.vue';

import P_1_C_58 from '../P_1_C_58/P_1_C_58.vue';

import P_1_C_59 from '../P_1_C_59/P_1_C_59.vue';

import P_1_C_60 from '../P_1_C_60/P_1_C_60.vue';

import P_1_C_61 from '../P_1_C_61/P_1_C_61.vue';



const props = withDefaults(defineProps<IProps>(), {

  visible: false,

  failureContext: () => ({ graphData: {}, analysis: '' }),

});



const emit = defineEmits<IEmits>();



const { handleClose, handleDebug, handleExtractCode, handleAskGemini } =

  useControl(props, emit);

</script>