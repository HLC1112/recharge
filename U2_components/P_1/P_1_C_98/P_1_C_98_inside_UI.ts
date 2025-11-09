import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_98_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    position: 'absolute',

    left: '0px',

    top: '0px',

    zIndex: 'auto',

  });



  return { componentStyle };

}