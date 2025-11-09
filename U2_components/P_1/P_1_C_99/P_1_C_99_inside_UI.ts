import { computed, reactive, CSSProperties } from 'vue';
import { IProps } from './P_1_C_99_inside_Obj';

export function useComponentStyles(props: IProps) {
  const componentStyle = reactive<CSSProperties>({
    position: 'absolute',
    zIndex: 4,
  });

  // 修改 nodeClasses
  const nodeClasses = computed(() => [
    // 'node',     // 移除: FlowChartNode 会提供 .flow-node
    // 'trigger',  // 移除: FlowChartNode 会提供 .style-trigger
    {
      // 保留: 这是 P_1_C_99 包装器提供的高亮/失败逻辑
      'is-highlighted': props.isHighlighted,
      'is-failure': props.isFailure,
    },
  ]);

  return { componentStyle, nodeClasses };
}