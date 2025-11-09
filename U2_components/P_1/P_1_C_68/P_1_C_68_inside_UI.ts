import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_68_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    position: 'fixed',

    top: '0px',

    right: '0px',

    bottom: '0px',

    left: '0px',

    zIndex: 70,

  });



  return { componentStyle };

}