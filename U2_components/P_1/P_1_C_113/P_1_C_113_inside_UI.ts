import { computed, reactive, CSSProperties } from 'vue';
import { IProps } from './P_1_C_113_inside_Obj';

export function useComponentStyles(props: IProps) {
  const componentStyle = reactive<CSSProperties>({
    // [修改] 从 'absolute' 变为 'relative'
    position: 'relative',
    // zIndex: 4, // 在 'relative' 布局中不再需要高 z-index
    zIndex: 3,
  });

  const nodeClasses = computed(() => [
    // 'node',              // 移除
    // 'da_orchestrator',   // 移除
    {
      'is-highlighted': props.isHighlighted,
      'is-failure': props.isFailure,
    },
  ]);

  return { componentStyle, nodeClasses };
}