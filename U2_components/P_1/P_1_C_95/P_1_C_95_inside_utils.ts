import { computed } from 'vue';

import { IProps } from './P_1_C_95_inside_Obj';



// Per YAML ui.libraryComponentId: CL_50 (Scrollbar)

// Implementing as a simple container with scrolling.

export function useScrollbar(props: IProps) {

  const tag = computed(() => 'div');



  return { tag };

}