import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_76_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    zIndex: 71,

  });



  return { componentStyle };

}