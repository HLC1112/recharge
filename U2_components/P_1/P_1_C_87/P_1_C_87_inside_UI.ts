import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_87_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    zIndex: 76,

    paddingTop: '0.5rem',

    paddingBottom: '0.5rem',

    paddingLeft: '1.25rem',

    paddingRight: '1.25rem',

  });



  return { componentStyle };

}