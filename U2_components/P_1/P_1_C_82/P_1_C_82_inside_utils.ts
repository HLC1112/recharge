import { computed, CSSProperties } from 'vue';

import { IProps } from './P_1_C_82_inside_Obj';



export function useButton(props: IProps) {

  const tag = computed(() => 'button');



  const buttonStyle = computed((): CSSProperties => {

    const style: CSSProperties = {};

    return style;

  });



  const buttonClasses = computed(() => {

    return ['flex-1', 'tech-button'];

  });



  const buttonId = computed(() => {

    return 'download-code-btn';

  });



  return { tag, buttonStyle, buttonClasses, buttonId };

}