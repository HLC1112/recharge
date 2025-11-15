import { computed } from 'vue';
import { IProps } from './P_1_C_139_inside_Obj';

export function useContainer(props: IProps) {
  const tag = computed(() => 'div');
  return { tag };
}