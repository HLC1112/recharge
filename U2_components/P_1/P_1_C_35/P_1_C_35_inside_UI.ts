import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_35_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    position: 'relative',

    width: '100%',

    height: '100%',

    zIndex: 3,

  });



  return { componentStyle };

}