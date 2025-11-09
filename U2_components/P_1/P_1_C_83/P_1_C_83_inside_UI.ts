import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_83_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    flex: '1 1 0%',

    zIndex: 71,

  });



  return { componentStyle };

}