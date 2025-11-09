<template>
  <div
    :style="componentStyle"
    :class="nodeClasses"
    @click="handleClick"
  >
    <P_1_C_124
      :text="props.nodeData?.label || 'UI Store...'"
      styleClass="uistore"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { IProps } from './P_1_C_107_inside_Obj';
import { useControl } from './P_1_C_107_control';
import { useComponentStyles } from './P_1_C_107_inside_UI';
// 导入 FlowChartNode

// 不再需要 useCard
// import { useCard } from './P_1_C_107_inside_utils';

const props = defineProps<IProps>();
const emit = defineEmits(['click']);

const { handleClick } = useControl(props, emit);
const { componentStyle, nodeClasses } = useComponentStyles(props);
// 不再需要 tag
// const { tag } = useCard(props);
</script>