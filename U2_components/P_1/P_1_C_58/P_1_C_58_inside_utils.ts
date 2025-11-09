import { computed } from 'vue';

import { IProps } from './P_1_C_58_inside_Obj';



export function useContainer(props: IProps) {

  const containerClasses = computed(() => {

    return ['bg-gray-900', 'p-3', 'h-32', 'overflow-y-auto'];

  });



  return { containerClasses };

}