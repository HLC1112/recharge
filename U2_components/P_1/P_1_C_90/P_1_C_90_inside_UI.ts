import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_90_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    position: 'absolute',

    bottom: '12px',

    left: '24px',

    right: '24px',

    display: 'flex',

    alignItems: 'center',

    zIndex: 76,

  });



  return { componentStyle };

}