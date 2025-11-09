import { computed, reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_97_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    // SVG path styles are typically controlled by attributes (stroke, fill, etc.)

    // or CSS classes, not inline layout styles like position.

  });



  // Style 'path.edge' from P_1_E_87

  const componentClasses = computed(() => [

    'edge',

    {

      'is-highlighted': props.isHighlighted,

      'is-failure': props.isFailure,

    },

  ]);



  const pathAttributes = computed(() => ({

    d: props.d || '',

    // Add other default SVG path attributes if needed

  }));



  return { componentStyle, componentClasses, pathAttributes };

}