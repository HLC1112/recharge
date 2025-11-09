import { computed, CSSProperties } from 'vue';

import { IProps } from './P_1_C_86_inside_Obj';



// CL_62: Text

export function useText(props: IProps) {

  const tag = computed(() => props.tag || 'div');



  return { tag };

}