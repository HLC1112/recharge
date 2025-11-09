import { computed } from 'vue';

import { IProps, INode } from './P_1_C_33_inside_Obj';



export function useContainer(props: IProps) {

  const containerClasses = computed(() => {

    return ['col-span-2', 'row-span-1', 'plane-sub'];

  });



  return { containerClasses };

}



export function getNodeClasses(node: INode & { isHighlighted?: boolean }) {

  const classes = ['node', 'feinfra'];

  if (node.isHighlighted) {

    classes.push('highlighted');

  }

  return classes;

}