import { computed } from 'vue';

import { IProps } from './P_1_C_79_inside_Obj';



// CL_18: Container

// This is a layout container.

export function useContainer(props: IProps) {

  // P_1_E_70: div#extraction-results

  const tag = computed(() => 'div');



  const elementId = 'extraction-results';



  // P_1_E_70: textContent: 提取结果

  const textContent = '提取结果';



  return { tag, elementId, textContent };

}