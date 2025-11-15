import { computed, reactive, CSSProperties } from 'vue';
import { IProps } from './P_1_C_135_inside_Obj';

export function useComponentStyles(props: IProps) {
  const componentStyle = reactive<CSSProperties>({
    position: 'absolute',
    zIndex: 4,
  });

  // 包装器只负责高亮，具体样式由 P_1_C_124 处理
  const nodeClasses = computed(() => [
    {
      'is-highlighted': props.isHighlighted,
      'is-failure': props.isFailure,
    },
  ]);

  return { componentStyle, nodeClasses };
}