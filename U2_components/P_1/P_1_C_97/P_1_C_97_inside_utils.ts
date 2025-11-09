import { computed } from 'vue';

import { IProps } from './P_1_C_97_inside_Obj';



// This component represents an SVG <path> element.

// CL_18 (Container) is a fallback, but the element is <path>.

export function usePath(props: IProps) {

  const tag = computed(() => 'path');



  return { tag };

}