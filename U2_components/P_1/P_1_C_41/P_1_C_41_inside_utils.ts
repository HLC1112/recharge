import { computed } from 'vue';

import { IProps, INode } from './P_1_C_41_inside_Obj';



export function useContainer(props: IProps) {

  const containerClasses = computed(() => {

    return ['col-span-4', 'row-span-2', 'plane-sub'];

  });



  return { containerClasses };

}



export function getNodeClasses(node: INode & { isHighlighted?: boolean }) {

  const classes = ['node'];

  

  if (node.type === 'da_orchestrator') {

    classes.push('da_orchestrator');

  } else if (node.type === 'dsv') {

     classes.push('dsv');

  } else {

     classes.push('node-default');

  }



  if (node.isHighlighted) {

    classes.push('highlighted');

  }

  return classes;

}