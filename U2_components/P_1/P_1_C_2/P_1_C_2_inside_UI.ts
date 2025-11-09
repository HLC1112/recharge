import { computed, CSSProperties } from 'vue';

import { IProps } from './P_1_C_2_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = computed(

    (): CSSProperties => ({

      position: 'absolute',

      top: '0px',

      left: '0px',

      right: '0px', // This might be adjusted based on isSidePanelOpen

      bottom: '0px',

      padding: '1rem', // p-4

      // Example adjustment based on prop:

      // right: props.isSidePanelOpen ? '500px' : '0px',

      // transition: 'right 0.3s ease-in-out',

    }),

  );



  return { componentStyle };

}