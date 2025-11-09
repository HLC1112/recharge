import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_88_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    position: 'absolute',

    top: '8px',

    right: '16px',

    fontSize: '3rem',

    lineHeight: '1',

    zIndex: 76,

    color: 'rgba(255, 255, 255, 0.7)',

    background: 'transparent',

    border: 'none',

    cursor: 'pointer',

  });



  return { componentStyle };

}