import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_80_inside_Obj';



export function useComponentStyles(props: IProps) {

  // Style derived from P_1_E_71

  const componentStyle = reactive<CSSProperties>({

    // zIndex: 72

    zIndex: 72,

    // from style: h-40 (approx 10rem / 160px)

    height: '10rem',

    // from style: overflow-y-auto

    overflowY: 'auto',

    // Add padding for aesthetics

    padding: '0.5rem 1rem',

  });



  return { componentStyle };

}