import { computed, reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_95_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    position: 'absolute',

    zIndex: 77,

    // Additional styles from 'event-log' class if needed

    overflowY: 'auto',

  });



  const componentClasses = computed(() => ['dsv-event-log', 'event-log']);



  return { componentStyle, componentClasses };

}