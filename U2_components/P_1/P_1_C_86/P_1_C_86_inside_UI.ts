import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_86_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    zIndex: 76,

  });



  return { componentStyle };

}