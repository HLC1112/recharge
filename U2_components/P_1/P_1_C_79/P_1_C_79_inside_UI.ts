import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_79_inside_Obj';



export function useComponentStyles(props: IProps) {

  // Style derived from P_1_E_70

  const componentStyle = reactive<CSSProperties>({

    // zIndex: 71

    zIndex: 71,

    // The 'hidden' class from P_1_E_70 style is implemented

    // via v-if="props.visible" in the .vue file.

    // Adding some margin for layout

    marginTop: '1rem',

  });



  return { componentStyle };

}