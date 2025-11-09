import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_1_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    width: '100vw',

    height: '100vh',

    overflow: 'hidden ',

  });



  return { componentStyle };

}