<template>

  <svg :style="componentStyle" :class="svgClasses">

    <defs>

      <marker

        id="arrowhead"

        markerWidth="10"

        markerHeight="7"

        refX="9"

        refY="3.5"

        orient="auto"

        fill="#999"

      >

        <polygon points="0 0, 10 3.5, 0 7" />

      </marker>

      <marker

        id="arrowhead-highlighted"

        markerWidth="10"

        markerHeight="7"

        refX="9"

        refY="3.5"

        orient="auto"

        fill="#ff0"

      >

        <polygon points="0 0, 10 3.5, 0 7" />

      </marker>

    </defs>

    <g class="links-group">

      <path

        v-for="link in renderedLinks"

        :key="link.id"

        :d="link.d"

        :class="link.class"

        :marker-end="link.marker"

      />

    </g>

  </svg>

</template>



<script lang="ts" setup>

import { defineProps, withDefaults } from 'vue';

import { IProps, INode, ILink } from './P_1_C_46_inside_Obj'; // IProps 定义已更新
import { useControl } from './P_1_C_46_control';
import { useComponentStyles } from './P_1_C_46_inside_UI';
import { useSvgCanvas } from './P_1_C_46_inside_utils';

// [修改] withDefaults 中添加新 props 的默认值
const props = withDefaults(defineProps<IProps>(), {
  nodes: () => [],
  links: () => [],
  highlightedLinks: () => [],
  
  // ★★★ 新增 props 默认值 ★★★
  dsvNodeIds: () => new Set<string>(),
  dbNodeIds: () => new Set<string>(),
  isDsvModalOpen: false,
  isDbModalOpen: false,
  // ★★★ 修改结束 ★★★
});

const { componentStyle } = useComponentStyles(props);
const { svgClasses } = useSvgCanvas(props);
const { renderedLinks } = useControl(props); // useControl 现在会使用新 props

</script>