import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_64_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    position: 'absolute',

    zIndex: 61,

  });



  return { componentStyle };

}