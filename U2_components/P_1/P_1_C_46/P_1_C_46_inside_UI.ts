import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_46_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    position: 'absolute',

    top: '0px',

    left: '0px',

    width: '100%',

    height: '100%',

    pointerEvents: 'none',

    zIndex: 'auto',

  });



  return { componentStyle };

}