import { computed, reactive, CSSProperties } from 'vue';
import { IProps } from './P_1_C_120_inside_Obj';

export function useComponentStyles(props: IProps) {
  const componentStyle = reactive<CSSProperties>({
    // [修改] 从 'absolute' 变为 'relative'
    // 这允许节点在 P_1_C_127 的 flex 容器中正确流动 
    position: 'relative',
    
    // zIndex: 77, // 在流式布局中不再需要高 z-index
    zIndex: 3,
  });

  const nodeClasses = computed(() => [
    'node',
    'fsm_state', // P_1_C_120 是 FSM 状态的专用组件，需要这些类
    {
      'highlighted': props.isHighlighted, // [FIX] 'is-highlighted' -> 'highlighted'
      'is-failure': props.isFailure,
    },
  ]);

  return { componentStyle, nodeClasses };
}