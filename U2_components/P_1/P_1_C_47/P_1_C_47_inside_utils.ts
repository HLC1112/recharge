import { computed } from 'vue';

import { IProps } from './P_1_C_47_inside_Obj';



export function useContainer(props: IProps) {

  const containerClasses = computed(() => {

    return ['p-1-c-47-container'];

  });



  return { containerClasses };

}