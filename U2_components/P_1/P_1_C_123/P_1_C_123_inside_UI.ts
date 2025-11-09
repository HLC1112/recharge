import { computed, reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_123_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    position: 'absolute',

    zIndex: 77,

  });



  const nodeClasses = computed(() => [

    'node',

    'bus',

    {

      'is-highlighted': props.isHighlighted,

      'is-failure': props.isFailure,

    },

  ]);



  return { componentStyle, nodeClasses };

}