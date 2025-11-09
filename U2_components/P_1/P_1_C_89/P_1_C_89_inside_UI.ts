import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_89_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    display: 'grid',

    gridTemplateColumns: 'repeat(12, 1fr)',

    gridTemplateRows: 'repeat(6, 1fr)',

    zIndex: 76,

    width: '100%',

    height: '100%',

  });



  return { componentStyle };

}