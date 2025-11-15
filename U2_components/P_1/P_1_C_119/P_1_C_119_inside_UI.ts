import { computed, reactive, CSSProperties } from 'vue';
import { IProps } from './P_1_C_119_inside_Obj';

export function useComponentStyles(props: IProps) {
  const componentStyle = reactive<CSSProperties>({
    // [修改] 从 'absolute' 变为 'relative'
    position: 'relative',
    // zIndex: 77,
    zIndex: 3,
  });

  const nodeClasses = computed(() => [
    'node',
    'da_orchestrator',
    {
      'highlighted': props.isHighlighted, // [FIX] 'is-highlighted' -> 'highlighted'
      'is-failure': props.isFailure,
    },
  ]);

  return { componentStyle, nodeClasses };
}