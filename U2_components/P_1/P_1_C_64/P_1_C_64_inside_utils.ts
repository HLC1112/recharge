import { computed, CSSProperties } from 'vue';

import { IProps } from './P_1_C_64_inside_Obj';



export function useText(props: IProps) {

  const tag = computed(() => props.tag || 'div');



  const textStyle = computed((): CSSProperties => {

    const style: CSSProperties = {};

    return style;

  });



  const textClasses = computed(() => {

    const classes = ['bg-gray-800', 'text-gray-300', 'p-2'];

    return classes;

  });



  return { tag, textStyle, textClasses };

}