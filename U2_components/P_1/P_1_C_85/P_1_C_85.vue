<template>
  <component
    :is="dialogTag"
    v-if="props.modelValue"
    :style="componentStyle"
    :id="props.id" class="modal"
    @click.self="handleClose"
  >
    <div :style="dialogContentStyle">
      <slot></slot>
    </div>
  </component>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { IProps } from './P_1_C_85_inside_Obj';
import { useControl } from './P_1_C_85_control';
import {
  useComponentStyles,
  useDialogContentStyles,
} from './P_1_C_85_inside_UI';
import { useDialogLogic } from './P_1_C_85_inside_utils';

const props = defineProps<IProps>(); // <-- [修改] 保持不变 (props.id 会被自动接收)
const emit = defineEmits(['update:modelValue']);
const { handleClose } = useControl(props, emit);

const { componentStyle } = useComponentStyles(props);
const { dialogContentStyle } = useDialogContentStyles(props);
const { dialogTag } = useDialogLogic(props);
</script>