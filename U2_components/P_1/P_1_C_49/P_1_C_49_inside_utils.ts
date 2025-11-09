import { computed, CSSProperties } from 'vue';

import { IProps } from './P_1_C_49_inside_Obj';



export function useText(props: IProps) {

  const tag = computed(() => props.tag || 'h2');



  const textStyle = computed((): CSSProperties => {

    const style: CSSProperties = {};

    return style;

  });



  const textClasses = computed(() => {

    const classes = ['text-xl', 'font-bold'];

    return classes;

  });



  return { tag, textStyle, textClasses };

}