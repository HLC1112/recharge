import { computed } from 'vue';
import { IProps } from './P_1_C_130_inside_Obj';

export function useContainer(props: IProps) {
  const tag = computed(() => 'div');
  return { tag };
}