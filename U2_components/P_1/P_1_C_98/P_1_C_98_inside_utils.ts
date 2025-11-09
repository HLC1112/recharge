import { computed, CSSProperties } from 'vue';

import { IProps } from './P_1_C_98_inside_Obj';



export function useElement(props: IProps) {

  const tag = computed(() => props.tag || 'marker');



  return { tag };

}



export function useContainerLogic(props: IProps) {

  // Logic for CL_18 (Container)

  const containerTag = computed(() => 'div');

  

  return { containerTag };

}