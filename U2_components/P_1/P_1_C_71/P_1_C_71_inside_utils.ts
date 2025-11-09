import { computed, CSSProperties } from 'vue';

import { IProps } from './P_1_C_71_inside_Obj';



export function useText(props: IProps) {

  const tag = computed(() => props.tag || 'span');



  const textStyle = computed((): CSSProperties => {

    const style: CSSProperties = {};

    return style;

  });



  const textClasses = computed(() => {

    const classes = ['text-red-400', 'font-bold'];

    return classes;

  });



  return { tag, textStyle, textClasses };

}