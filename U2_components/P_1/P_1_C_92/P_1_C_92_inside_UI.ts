import { computed, reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_92_inside_Obj';



export function useComponentStyles(props: IProps) {

  const componentStyle = reactive<CSSProperties>({

    zIndex: 77,

  });



  // Style 'span#dsv-event-in badge'

  const componentClasses = computed(() => [

    'badge',

    {

      'is-highlighted': props.active,

    },

  ]);



  return { componentStyle, componentClasses };

}