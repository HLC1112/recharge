import { computed, reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_91_inside_Obj';



export function useComponentStyles(props: IProps) {

  // Style: div#dsv-events-bar absolute bottom-3 left-6 right-6 flex

  const componentStyle = reactive<CSSProperties>({

    position: 'absolute',

    bottom: '0.75rem', // bottom-3

    left: '1.5rem', // left-6

    right: '1.5rem', // right-6

    display: 'flex',

    zIndex: 76,

  });



  const componentClasses = computed(() => ['dsv-events-bar']);



  return { componentStyle, componentClasses };

}