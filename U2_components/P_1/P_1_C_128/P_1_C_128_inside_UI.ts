import { reactive, CSSProperties } from 'vue';
import { IProps } from './P_1_C_128_inside_Obj';

export function useComponentStyles(props: IProps) {
  const componentStyle = reactive<CSSProperties>({});

  return { componentStyle };
}