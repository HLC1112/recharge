import { computed } from 'vue';

import { IProps } from './P_1_C_51_inside_Obj';



export function useScrollbar(props: IProps) {

  const scrollbarClasses = computed(() => {

    return ['p-4', 'flex-grow', 'overflow-y-auto'];

  });



  return { scrollbarClasses };

}