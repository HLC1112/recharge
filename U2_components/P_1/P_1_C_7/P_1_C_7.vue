<template>
  <!-- 固定 id 供拖拽工具函数定位 -->
  <div id="trace-simulator" :style="componentStyle">
    <!-- 顶部拖拽句柄（独立组件） -->
    <P_1_C_8 @drag-start="onDragStart" />
    <!-- 追踪器面板内容区（交互按钮等通过插槽由 P_1_C_6 注入） -->
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type { IProps } from './P_1_C_7_inside_Obj'
import { useComponentStyles } from './P_1_C_7_inside_UI'
import { useContainer } from './P_1_C_7_inside_utils'
import P_1_C_8 from '../P_1_C_8/P_1_C_8.vue'

const props = defineProps<IProps>()
const { componentStyle } = useComponentStyles(props)
const { onDragStart } = useContainer(props)
</script>
