<template>
  <component
    :is="tag"
    v-bind="svgAttributes"
    :style="componentStyle"
    :class="componentClasses"
  >
    <defs>
      <marker
        id="arrowhead-dsv"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <polygon points="0 0, 10 5, 0 10" class="arrow-head" fill="#999"></polygon>
      </marker>
      <marker
        id="arrowhead-dsv-highlighted"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <polygon
          points="0 0, 10 5, 0 10"
          class="arrow-head"
          fill="#ff0"
        ></polygon>
      </marker>
    </defs>
    <P_1_C_97
      v-for="link in processedLinks"
      :key="link.id"
      :d="link.d"
      :class="link.class"  
      :isFailure="link.isFailure"
      :marker-end="
        link.isHighlighted
          ? 'url(#arrowhead-dsv-highlighted)'
          : 'url(#arrowhead-dsv)'
      "
    />
  </component>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { IProps } from './P_1_C_96_inside_Obj';
import { useControl } from './P_1_C_96_control';
import { useComponentStyles } from './P_1_C_96_inside_UI';
import { useSvgCanvas } from './P_1_C_96_inside_utils';
import P_1_C_97 from '../P_1_C_97/P_1_C_97.vue';

const props = defineProps<IProps>();

const { componentStyle, componentClasses, svgAttributes } =
  useComponentStyles(props);
const { tag } = useSvgCanvas(props);
const { processedLinks } = useControl(props);
</script>