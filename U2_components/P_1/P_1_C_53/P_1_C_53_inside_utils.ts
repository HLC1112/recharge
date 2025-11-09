import { computed } from 'vue';

import { IProps } from './P_1_C_53_inside_Obj';



export function useContainer(props: IProps) {

  const containerClasses = computed(() => {

    return ['p-1-c-53-container'];

  });



  return { containerClasses };

}