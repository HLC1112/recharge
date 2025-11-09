import { reactive, computed, CSSProperties } from 'vue';

import { IProps } from './P_1_C_48_inside_Obj';

import { IState } from './P_1_C_48_inside_State';



export function useComponentStyles(props: IProps, state: IState) {

  const componentStyle = computed((): CSSProperties => {

    return {

      position: 'fixed',

      top: '0px',

      right: state.isVisible ? '0px' : '-500px',

      width: props.size || '500px',

      height: '100%',

      zIndex: 1000,

      transition: 'right 0.3s ease-in-out',

    };

  });



  return { componentStyle };

}