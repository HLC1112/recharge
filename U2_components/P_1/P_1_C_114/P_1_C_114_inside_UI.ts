import { computed, reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_114_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    position: 'absolute',

    zIndex: 4,

  });



  const nodeClasses = computed(() => [

    'node',

    'dsv',

    {

      'is-highlighted': props.isHighlighted,

      'is-failure': props.isFailure,

    },

  ]);



  return { componentStyle, nodeClasses };

}