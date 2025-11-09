import { computed } from 'vue';

import { IProps } from './P_1_C_52_inside_Obj';



export function useContainer(props: IProps) {

  const containerClasses = computed(() => {

    return ['p-4', 'border-t', 'border-gray-700'];

  });



  return { containerClasses };

}