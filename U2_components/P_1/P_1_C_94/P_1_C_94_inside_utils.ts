import { computed } from 'vue';

import { IProps } from './P_1_C_94_inside_Obj';



// Per YAML ui.libraryComponentId: CL_61 (Tag)

// Implementing as a span based on element style 'span#...'

export function useTag(props: IProps) {

  const tag = computed(() => 'span');



  return { tag };

}