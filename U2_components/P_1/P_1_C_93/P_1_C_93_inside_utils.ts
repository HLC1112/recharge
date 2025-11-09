import { computed, CSSProperties } from 'vue';

import { IProps } from './P_1_C_93_inside_Obj';



// CL_61: Tag

export function useTagLogic(props: IProps) {

  const tag = computed(() => props.tag || 'span');



  const tagStyle = computed((): CSSProperties => ({

    display: 'inline-block',

    padding: '0.25em 0.4em',

    fontSize: '75%',

    fontWeight: '700',

    lineHeight: '1',

    textAlign: 'center',

    whiteSpace: 'nowrap',

    verticalAlign: 'baseline',

    borderRadius: '0.25rem',

  }));



  const tagClasses = computed(() => [

    'badge',

    'dsv-event-out',

    { 'is-active': !!props.active },

  ]);



  const displayText = computed(() => {

    if (props.active && props.eventData) {

      return String(props.eventData);

    }

    return 'OUT';

  });



  return { tag, tagStyle, tagClasses, displayText };

}