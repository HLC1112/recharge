<template>
  <div
    :style="componentStyle"
    :class="nodeClasses"
    @click="handleClick"
  >
    <P_1_C_124
      :text="props.nodeData?.data?.label || 'Monitor Node'"
      styleClass="monitor"
      :isHighlighted="props.isHighlighted"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { IProps } from './P_1_C_137_inside_Obj';
import { useControl } from './P_1_C_137_control';
import { useComponentStyles } from './P_1_C_137_inside_UI';

const props = defineProps<IProps>();
const emit = defineEmits(['click']);

const { handleClick } = useControl(props, emit);
const { componentStyle, nodeClasses } = useComponentStyles(props);

</script>