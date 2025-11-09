import { computed } from 'vue';

import { IProps } from './P_1_C_78_inside_Obj';



// CL_18: Container

// Implementing as a basic layout container (div).

export function useContainer(props: IProps) {

  const tag = computed(() => 'div');



  return { tag };

}