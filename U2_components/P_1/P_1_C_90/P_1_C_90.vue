<template>

  <component :is="containerTag" :style="componentStyle" id="dsv-events-bar">

    <span style="margin-right: 8px">事件进出:</span>

    <P_1_C_92 :eventData="props.eventIn" :active="!!props.eventIn" />

    <P_1_C_93
      :eventData="props.eventOut"
      :active="!!props.eventOut"
      style="margin-left: 8px"
    />

    <P_1_C_94 :state="props.fsmState" style="margin-left: auto" />

  </component>

</template>

<script lang="ts" setup>

import { defineProps } from 'vue';
import P_1_C_92 from '../P_1_C_92/P_1_C_92.vue';
import P_1_C_93 from '../P_1_C_93/P_1_C_93.vue';
import P_1_C_94 from '../P_1_C_94/P_1_C_94.vue';
import { IProps } from './P_1_C_90_inside_Obj';
import { useControl } from './P_1_C_90_control';
import { useComponentStyles } from './P_1_C_90_inside_UI';
import { useContainerLogic } from './P_1_C_90_inside_utils';

const props = defineProps<IProps>();
useControl(props);

const { componentStyle } = useComponentStyles(props);
const { containerTag } = useContainerLogic(props);

</script>