import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_74_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    // Per P_1_E_67 zIndex

    zIndex: 71,

    // No layout styles (position, left, top, width, height) specified in YAML

  });



  return { componentStyle };

}