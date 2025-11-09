<!-- 文件：U2_components/P_1/P_1_C_6/P_1_C_6.vue -->
<template>
  <teleport to="body">
    <div :style="componentStyle">
      <P_1_C_7>
        <P_1_C_9 :disabled="props.isTracing" @click="onPickModule" />
        <P_1_C_10 :disabled="props.isTracing || !props.moduleReady" @click="onRunSuccessFlow" />
        <P_1_C_11 :disabled="props.isTracing || !props.moduleReady" @click="onRunFailureFlow" />
        <P_1_C_12 :modelValue="props.traceId || ''" @update:modelValue="onTraceIdInput" :disabled="props.isTracing" />
        <P_1_C_13 :disabled="!props.traceId || props.isTracing || !props.moduleReady" @click="onTraceById" />
      </P_1_C_7>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, watch } from 'vue';
import { IProps } from './P_1_C_6_inside_Obj';
import { useControl } from './P_1_C_6_control';
import { useComponentStyles } from './P_1_C_6_inside_UI';

import P_1_C_7 from '../P_1_C_7/P_1_C_7.vue';
import P_1_C_9 from '../P_1_C_9/P_1_C_9.vue';
import P_1_C_10 from '../P_1_C_10/P_1_C_10.vue';
import P_1_C_11 from '../P_1_C_11/P_1_C_11.vue';
import P_1_C_12 from '../P_1_C_12/P_1_C_12.vue';
import P_1_C_13 from '../P_1_C_13/P_1_C_13.vue';

const props = defineProps<IProps>();
const emit = defineEmits(['update:traceId', 'start-trace', 'open-module-loader']);

// 调试：监听 moduleReady 的变化
watch(() => props.moduleReady, (newVal) => {
  console.log(`[P_1_C_6] props.moduleReady 更新: ${newVal}`);
}, { immediate: true });

const { onPickModule, onRunSuccessFlow, onRunFailureFlow, onTraceById, onTraceIdInput } = useControl(props, emit);
const { componentStyle } = useComponentStyles(props);
</script>
