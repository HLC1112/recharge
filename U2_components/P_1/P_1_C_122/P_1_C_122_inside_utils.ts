import { computed } from 'vue';

import { IProps } from './P_1_C_122_inside_Obj';



// Per YAML ui.libraryComponentId: CL_12 (Card)

export function useCard(props: IProps) {

  const tag = computed(() => 'div');



  return { tag };

}