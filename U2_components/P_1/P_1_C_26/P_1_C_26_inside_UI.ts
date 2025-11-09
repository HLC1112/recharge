import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_26_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    position: 'absolute',

    zIndex: 3,

  });



  return { componentStyle };

}