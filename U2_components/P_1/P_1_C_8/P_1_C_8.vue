<template>
  <!-- 拖拽句柄：按住可拖动整个面板 -->
  <div :style="componentStyle" @mousedown="emit('drag-start', $event)">
    <slot>拖拽</slot>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import { IProps } from './P_1_C_8_inside_Obj'
import { useComponentStyles } from './P_1_C_8_inside_UI'

defineProps<IProps>()
const emit = defineEmits<{ (e: 'drag-start', ev: MouseEvent): void }>()

const { componentStyle } = useComponentStyles()
</script>
