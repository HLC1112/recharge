import { computed } from 'vue';

import { IProps } from './P_1_C_60_inside_Obj';



export function useButton(props: IProps) {

  const buttonClasses = computed(() => {

    const classes = ['w-full', 'tech-button']; // from style



    if (props.disabled) {

      classes.push('is-disabled');

    }



    return classes;

  });



  return { buttonClasses };

}