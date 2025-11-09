import { computed, CSSProperties } from 'vue';

import { IProps } from './P_1_C_80_inside_Obj';



// CL_21: Descriptions

// Implementing as a Definition List (<dl>)

export function useDescriptions(props: IProps) {

  // P_1_E_71: div#extracted-files-list...

  // Since CL_21 is Descriptions, we use <dl> tag

  const tag = computed(() => 'dl');



  // P_1_E_71: id=extracted-files-list

  const elementId = 'extracted-files-list';



  // Style for the content itself (e.g., background, text color)

  const contentStyle = computed((): CSSProperties => {

    const style: CSSProperties = {

      // from style: bg-gray-900

      backgroundColor: 'rgb(17 24 39)',

      // Default text color for dark bg

      color: 'rgb(209 213 219)', // gray-300

    };

    return style;

  });



  // Classes from P_1_E_71 that are not handled by inline styles

  const componentClasses = computed(() => {

    const classes = [];

    // e.g., if we had modifiers

    return classes;

  });



  const descriptionsItems = computed(() => props.items);



  return { tag, elementId, contentStyle, componentClasses, descriptionsItems };

}