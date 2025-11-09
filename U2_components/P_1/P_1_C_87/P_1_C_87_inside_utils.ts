import { computed, CSSProperties } from 'vue';

import { IProps } from './P_1_C_87_inside_Obj';



// CL_9: Button

export function useButtonLogic(props: IProps) {

  const buttonTag = computed(() => props.tag || 'button');



  return { buttonTag };

}