import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_85_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    position: 'fixed',

    top: '0',

    left: '0',

    right: '0',

    bottom: '0',

    zIndex: 75,

    display: 'flex',

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  });



  return { componentStyle };

}



export function useDialogContentStyles(props: IProps) {

  const dialogContentStyle = reactive<CSSProperties>({

    position: 'relative',

    backgroundColor: 'rgb(17, 24, 39)',

    border: '1px solid rgba(129, 255, 238, 0.3)',

    borderRadius: '8px',

    padding: '1.5rem',

    boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',

    width: '90vw',

    height: '90vh',

  });



  return { dialogContentStyle };

}