<template>
  <div
    :style="componentStyle"
    :class="nodeClasses"
    @click="handleClick"
  >
    <P_1_C_124
      :text="props.nodeData?.label || '用户提交注册表单'"
      styleClass="trigger"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { IProps } from './P_1_C_99_inside_Obj';
import { useControl } from './P_1_C_99_control';
import { useComponentStyles } from './P_1_C_99_inside_UI';
// 1. 不再需要 useCard，因为我们用固定的 <div> 作为包装器
// import { useCard } from './P_1_C_99_inside_utils'; 

// 2. 导入 FlowChartNode

const props = defineProps<IProps>();
const emit = defineEmits(['click']);

const { handleClick } = useControl(props, emit);
// 3. 'nodeClasses' 现在只包含高亮逻辑
const { componentStyle, nodeClasses } = useComponentStyles(props); 
// 4. 'tag' 不再需要
// const { tag } = useCard(props);
</script>