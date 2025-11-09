<template>

  <P_1_C_48 :visible="props.visible">

    <P_1_C_49 :title="props.title" />

    <P_1_C_50 @click="handleClose" />

    <P_1_C_51 :entries="props.logEntries" />

    <P_1_C_52 :visible="isFailure">

      <P_1_C_59 @click="handleStartDebug" />

      <P_1_C_60 @click="handleExtractCode" />

    </P_1_C_52>

  </P_1_C_48>

</template>



<script lang="ts" setup>

import { defineProps, defineEmits, withDefaults } from 'vue';

import { IProps, IEmits } from './P_1_C_47_inside_Obj';

import { useControl } from './P_1_C_47_control';



import P_1_C_48 from '../P_1_C_48/P_1_C_48.vue';

import P_1_C_49 from '../P_1_C_49/P_1_C_49.vue';

import P_1_C_50 from '../P_1_C_50/P_1_C_50.vue';

import P_1_C_51 from '../P_1_C_51/P_1_C_51.vue';

import P_1_C_52 from '../P_1_C_52/P_1_C_52.vue';

import P_1_C_59 from '../P_1_C_59/P_1_C_59.vue';

import P_1_C_60 from '../P_1_C_60/P_1_C_60.vue';



const props = withDefaults(defineProps<IProps>(), {

  visible: false,

  title: '',

  logEntries: () => [],

  traceStatus: 'idle',

  failureContext: null,

});



const emit = defineEmits<IEmits>();



const { handleClose, handleStartDebug, handleExtractCode, isFailure } =

  useControl(props, emit);

</script>