import { computed, CSSProperties } from 'vue';

import { IProps } from './P_1_C_55_inside_Obj';



export function useText(props: IProps) {

  const tag = computed(() => props.tag || 'div');



  const textStyle = computed((): CSSProperties => {

    const style: CSSProperties = {};

    return style;

  });



  const textClasses = computed(() => {

    const classes = ['plane-title'];

    return classes;

  });



  return { tag, textStyle, textClasses };

}