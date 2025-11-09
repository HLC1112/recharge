<template>

  <P_1_C_63 :visible="props.visible">

    <P_1_C_64 :title="state.title">

      <P_1_C_65 @click="handleClose" />

    </P_1_C_64>

    <P_1_C_66 :logLines="props.logStream" />

  </P_1_C_63>

</template>



<script lang="ts" setup>

import { defineProps, defineEmits, withDefaults, watch } from 'vue';

import { IProps, IEmits } from './P_1_C_62_inside_Obj';

import { useControl } from './P_1_C_62_control';

import { state } from './P_1_C_62_inside_State';



import P_1_C_63 from '../P_1_C_63/P_1_C_63.vue';

import P_1_C_64 from '../P_1_C_64/P_1_C_64.vue';

import P_1_C_65 from '../P_1_C_65/P_1_C_65.vue';

import P_1_C_66 from '../P_1_C_66/P_1_C_66.vue';



const props = withDefaults(defineProps<IProps>(), {

  visible: false,

  logStream: () => [],

});



const emit = defineEmits<IEmits>();



const { handleClose } = useControl(props, emit);



watch(

  () => props.visible,

  (newValue) => {

    if (newValue) {

      emit('simulation-start');

    }

  },

);

</script>