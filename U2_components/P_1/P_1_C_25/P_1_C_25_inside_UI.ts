import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_25_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    flex: 1,

    zIndex: 2,

  });



  return { componentStyle };

}