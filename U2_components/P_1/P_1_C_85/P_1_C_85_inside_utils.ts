import { computed } from 'vue';

import { IProps } from './P_1_C_85_inside_Obj';



// CL_23: Dialog

export function useDialogLogic(props: IProps) {

  const dialogTag = computed(() => props.tag || 'div');



  return { dialogTag };

}