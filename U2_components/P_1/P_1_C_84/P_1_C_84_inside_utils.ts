import { computed } from 'vue';

import { IProps } from './P_1_C_84_inside_Obj';



// CL_18: Container

export function useContainerLogic(props: IProps) {

  const containerTag = computed(() => 'div');



  return { containerTag };

}