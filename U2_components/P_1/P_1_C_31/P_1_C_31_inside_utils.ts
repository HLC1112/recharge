import { computed } from 'vue';

import { IProps, INode } from './P_1_C_31_inside_Obj';



export function useContainer(props: IProps) {

  const containerClasses = computed(() => {

    return ['col-span-1', 'row-span-1', 'plane-sub'];

  });



  return { containerClasses };

}



export function getNodeClasses(node: INode & { isHighlighted?: boolean }) {

  const classes = ['node'];

  if (node.isHighlighted) {

    classes.push('highlighted');

  }

  return classes;

}