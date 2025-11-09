import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_12_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    width: '100%',

    zIndex: 11,

    padding: '0.5rem', // p-2

    fontSize: '0.75rem', // text-xs

  });



  return { componentStyle };

}