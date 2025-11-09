import { computed } from 'vue';

import { IProps } from './P_1_C_70_inside_Obj';



export function useButton(props: IProps) {

  const buttonClasses = computed(() => {

    const classes = ['text-4xl']; // from style



    if (props.type) {

      classes.push(`button-type--${props.type}`);

    }

    if (props.disabled) {

      classes.push('is-disabled');

    }



    return classes;

  });



  return { buttonClasses };

}