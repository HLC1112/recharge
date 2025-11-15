import { computed, reactive, CSSProperties } from 'vue';
import { IProps } from './P_1_C_97_inside_Obj';

export function useComponentStyles(props: IProps) {
  const componentStyle = reactive<CSSProperties>({
    // SVG path styles are typically controlled by attributes (stroke, fill, etc.)
    // or CSS classes, not inline layout styles like position.
  });

  // [FIX] 修改 componentClasses
  const componentClasses = computed(() => [
    'edge',
    // 使用传入的 class，如果没有则默认为 link-default
    props.class || 'link-default', 
    // 移除旧的 'is-highlighted' 和 'is-failure' 逻辑
    // {
    //   'is-highlighted': props.isHighlighted,
    //   'is-failure': props.isFailure,
    // },
  ]);

  const pathAttributes = computed(() => ({
    d: props.d || '',
    // Add other default SVG path attributes if needed
  }));

  return { componentStyle, componentClasses, pathAttributes };
}