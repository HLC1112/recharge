import { computed } from 'vue';

import { IProps } from './P_1_C_75_inside_Obj';



/**

 * Implements the logic for the CL_18 (Container) library component.

 */

export function useContainer(props: IProps) {

  // Use 'div' as default tag for a generic container

  const tag = computed(() => props.tag || 'div');



  return { tag };

}