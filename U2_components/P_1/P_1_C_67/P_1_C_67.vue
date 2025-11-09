<template>

  <P_1_C_68 :visible="props.visible">

    <P_1_C_69 />

    <P_1_C_70 @click="handleClose" />

    <P_1_C_71 :nodeName="props.failureNodeName" />

    <P_1_C_72 />

    <P_1_C_73 @folder-selected="handleFolderSelect" />

    <P_1_C_74 :path="selectedFolderPath" />

    <P_1_C_75 :visible="props.isScanning" :progress="props.scanProgress" />

    <P_1_C_78 :visible="canShowResults" :results="props.scanResults" />

    <P_1_C_81 @click="handleStartExtraction" :disabled="!canStartExtraction" />

    <P_1_C_82 @click="handleDownload" :disabled="!canDownload" />

    <P_1_C_83 @click="handleClose" />

  </P_1_C_68>

</template>



<script lang="ts" setup>

import { defineProps, defineEmits, withDefaults } from 'vue';

import { IProps, IEmits } from './P_1_C_67_inside_Obj';

import { useControl } from './P_1_C_67_control';

import { state } from './P_1_C_67_inside_State';



import P_1_C_68 from '../P_1_C_68/P_1_C_68.vue';

import P_1_C_69 from '../P_1_C_69/P_1_C_69.vue';

import P_1_C_70 from '../P_1_C_70/P_1_C_70.vue';

import P_1_C_71 from '../P_1_C_71/P_1_C_71.vue';

import P_1_C_72 from '../P_1_C_72/P_1_C_72.vue';

import P_1_C_73 from '../P_1_C_73/P_1_C_73.vue';

import P_1_C_74 from '../P_1_C_74/P_1_C_74.vue';

import P_1_C_75 from '../P_1_C_75/P_1_C_75.vue';

import P_1_C_78 from '../P_1_C_78/P_1_C_78.vue';

import P_1_C_81 from '../P_1_C_81/P_1_C_81.vue';

import P_1_C_82 from '../P_1_C_82/P_1_C_82.vue';

import P_1_C_83 from '../P_1_C_83/P_1_C_83.vue';



const props = withDefaults(defineProps<IProps>(), {

  visible: false,

  failureNodeName: '',

  scanProgress: 0,

  scanResults: () => [],

  isScanning: false,

});



const emit = defineEmits<IEmits>();



const {

  handleClose,

  handleFolderSelect,

  handleStartExtraction,

  handleDownload,

  selectedFolderPath,

  canStartExtraction,

  canDownload,

  canShowResults,

} = useControl(props, emit);

</script>