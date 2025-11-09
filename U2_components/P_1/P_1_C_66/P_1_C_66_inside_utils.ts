import { computed } from 'vue';

import { IProps } from './P_1_C_66_inside_Obj';



export function useScrollbar(props: IProps) {

  const scrollbarClasses = computed(() => {

    return [

      'bg-black',

      'text-white',

      'p-4',

      'flex-grow',

      'overflow-y-auto',

    ];

  });



  return { scrollbarClasses };

}