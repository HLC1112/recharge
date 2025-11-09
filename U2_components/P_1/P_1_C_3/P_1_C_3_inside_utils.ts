import { computed } from 'vue';

import { IProps } from './P_1_C_3_inside_Obj';



// Per YAML ui.libraryComponentId: CL_18 (Container)

export function useContainer(props: IProps) {

  const tag = computed(() => 'div');



  return { tag };

}