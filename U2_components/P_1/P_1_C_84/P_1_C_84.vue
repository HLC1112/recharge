<template>

  <P_1_C_85 :modelValue="props.visible" @update:modelValue="handleClose">

    <div

      style="

        display: flex;

        flex-direction: column;

        height: 100%;

        position: relative;

      "

    >

      <div

        style="

          display: flex;

          justify-content: space-between;

          align-items: center;

          padding-bottom: 1rem;

          border-bottom: 1px solid #444;

          position: relative;

          z-index: 80;

        "

      >

        <P_1_C_86 :title="title" />

        <P_1_C_87 :disabled="isExecuting" @click="handleExecuteFlow" />

        <P_1_C_88 @click="handleClose" />

      </div>



      <div

        style="

          flex-grow: 1;

          display: grid;

          grid-template-rows: 2fr 1fr;

          overflow: hidden;

          padding-top: 1rem;

          position: relative;

        "

      >

        <div

          style="

            position: relative;

            overflow: auto;

            border: 1px solid #333;

            grid-row: 1;

          "

        >

          <P_1_C_96

            :links="linksForSvg"

            :highlighted-links="highlightedLinks"

            :node-container-id="'dsv-detail-grid'"

          />

          <P_1_C_89

            :nodes="nodesForGrid"

            :highlighted-nodes="highlightedNodes"

          />

        </div>



        <div

          style="

            grid-row: 2;

            overflow: hidden;

            display: flex;

            flex-direction: column;

            border-top: 1px solid #444;

            margin-top: 1rem;

          "

        >

          <P_1_C_95

            :logEntries="logEntries"

            style="flex-grow: 1; overflow-y: auto"

          />

        </div>

      </div>



      <P_1_C_90

        :eventIn="eventIn"

        :eventOut="eventOut"

        :fsmState="fsmState"

      />

    </div>

  </P_1_C_85>

</template>



<script lang="ts" setup>

import { defineProps, defineEmits } from 'vue';

import { IProps } from './P_1_C_84_inside_Obj';

import { useControl } from './P_1_C_84_control';

import { useComponentStyles } from './P_1_C_84_inside_UI';

import { useContainerLogic } from './P_1_C_84_inside_utils';



import P_1_C_85 from '../P_1_C_85/P_1_C_85.vue';

import P_1_C_86 from '../P_1_C_86/P_1_C_86.vue';

import P_1_C_87 from '../P_1_C_87/P_1_C_87.vue';

import P_1_C_88 from '../P_1_C_88/P_1_C_88.vue';

import P_1_C_89 from '../P_1_C_89/P_1_C_89.vue';

import P_1_C_90 from '../P_1_C_90/P_1_C_90.vue';

import P_1_C_95 from '../P_1_C_95/P_1_C_95.vue';

import P_1_C_96 from '../P_1_C_96/P_1_C_96.vue';



const props = defineProps<IProps>();

const emit = defineEmits(['update:visible', 'execute-flow']);



const {

  handleClose,

  handleExecuteFlow,

  isExecuting,

  title,

  nodesForGrid,

  linksForSvg,

  highlightedNodes,

  highlightedLinks,

  eventIn,

  eventOut,

  fsmState,

  logEntries,

} = useControl(props, emit);



const { componentStyle } = useComponentStyles(props);

const { containerTag } = useContainerLogic(props);

</script>