import { computed } from 'vue';

import { IProps } from './P_1_C_68_inside_Obj';



export function useDialog(props: IProps) {

  const dialogClasses = computed(() => {

    return ['modal'];

  });



  return { dialogClasses };

}