import { computed, reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_94_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    position: 'absolute',

    zIndex: 77,

  });



  const componentClasses = computed(() => ['dsv-state-indicator', 'badge']);



  return { componentStyle, componentClasses };

}