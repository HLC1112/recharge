import { reactive, CSSProperties } from 'vue';
import { IProps } from './P_1_C_39_inside_Obj';

export function useComponentStyles(props: IProps) {
  const componentStyle = reactive<CSSProperties>({
    position: 'relative',     // ⬅️ from 'absolute' to 'relative'
    flex: 1,                  // ✅ 参与父容器的纵向伸展
    zIndex: 2,
  });
  return { componentStyle };
}
