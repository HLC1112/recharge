<template>
  <div
    :style="componentStyle"
    :class="nodeClasses"
    @click="handleClick"
  >
    <P_1_C_124
      :text="props.nodeData?.label || 'APIClient'"
      styleClass="feinfra"
    />
  </div>
</template>

<script lang="ts" setup>
// MODIFIED: 'defineProps' 和 'defineEmits' 是编译器宏，无需导入。
// import { defineProps, defineEmits } from 'vue';
//
import { IProps } from './P_1_C_104_inside_Obj';
import { useControl } from './P_1_C_104_control';
import { useComponentStyles } from './P_1_C_104_inside_UI';
// 导入 FlowChartNode

// 不再需要 useCard
// import { useCard } from './P_1_C_104_inside_utils';

const props = defineProps<IProps>();
const emit = defineEmits(['click']);

const { handleClick } = useControl(props, emit);
const { componentStyle, nodeClasses } = useComponentStyles(props);
// 不再需要 tag
// const { tag } = useCard(props);
</script>