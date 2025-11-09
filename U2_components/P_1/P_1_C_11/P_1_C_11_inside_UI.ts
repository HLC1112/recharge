import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_11_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    width: '100%',

    zIndex: 11,

  });



  return { componentStyle };

}