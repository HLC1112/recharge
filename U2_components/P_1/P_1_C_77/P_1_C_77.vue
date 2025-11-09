<template>

  <div :style="componentStyle">

    <div :style="[progressBarContainerStyle, progressBarInnerStyle]" class="bg-yellow-400 rounded-full">

      </div>

  </div>

</template>



<script lang="ts" setup>

import { defineProps } from 'vue';

import { IProps } from './P_1_C_77_inside_Obj';

import { useControl } from './P_1_C_77_control';

import { useComponentStyles } from './P_1_C_77_inside_UI';

import { useProgress } from './P_1_C_77_inside_utils';



// 定义组件属性

const props = defineProps<IProps>();



// 运行控制逻辑（本组件主要负责UI展示，控制函数可能为空或负责事件监听）

useControl(props);



// 获取组件的容器（外部 div）样式

const { componentStyle } = useComponentStyles(props);



// 获取进度条条（内部 div）的容器样式和宽度样式

const { progressBarContainerStyle, progressBarInnerStyle } = useProgress(props);

</script>