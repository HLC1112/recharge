import { computed, reactive, CSSProperties } from 'vue';
import { IProps } from './P_1_C_129_inside_Obj';

export function useComponentStyles(props: IProps) {
  const componentStyle = reactive<CSSProperties>({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 90,
    pointerEvents: 'none', // Allow clicks to go through to nodes
  });

  // [修改] Class 唯一化
  const componentClasses = computed(() => ['db-detail-svg']);

  const svgAttributes = computed(() => ({
    width: '100%',
    height: '100%',
    preserveAspectRatio: 'none',
  }));

  return { componentStyle, componentClasses, svgAttributes };
}