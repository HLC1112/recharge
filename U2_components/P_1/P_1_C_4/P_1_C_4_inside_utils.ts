import { computed } from 'vue';

import { IProps } from './P_1_C_4_inside_Obj';



// Per YAML ui.libraryComponentId: CL_23 (Dialog)

export function useDialog(props: IProps) {

  const tag = computed(() => 'div');



  const isVisible = computed(() => props.visible);



  return { tag, isVisible };

}