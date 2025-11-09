import { computed, CSSProperties } from 'vue';

import { IProps } from './P_1_C_74_inside_Obj';



// Implements logic from CL_62 (Text)

export function useText(props: IProps) {

  // Per P_1_E_67 'span#...'

  const tag = computed(() => props.tag || 'span');



  // Per P_1_E_67 '...#selected-folder-path'

  const textId = computed(() => 'selected-folder-path');



  const textStyle = computed((): CSSProperties => {

    const style: CSSProperties = {

      // Base text styles (if any) would go here.

    };



    if (props.lineClamp) {

      style.display = '-webkit-box';

      style.webkitBoxOrient = 'vertical';

      style.webkitLineClamp = props.lineClamp;

      style.overflow = 'hidden';

      style.textOverflow = 'ellipsis';

    }



    return style;

  });



  const textClasses = computed(() => {

    const classes = [

      // Per P_1_E_67 style

      'text-gray-400',

      'text-sm',

    ];



    if (props.type) {

      classes.push(`text-type--${props.type}`);

    }

    if (props.size) {

      classes.push(`text-size--${props.size}`);

    }

    if (props.truncated) {

      classes.push('is-truncated');

    }



    return classes;

  });



  return { tag, textId, textStyle, textClasses };

}