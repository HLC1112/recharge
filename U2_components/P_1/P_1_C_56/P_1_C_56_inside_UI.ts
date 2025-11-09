import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_56_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    position: 'absolute',

    top: '0.5rem', // top-2

    right: '1rem', // right-4

    zIndex: 51,

  });



  return { componentStyle };

}