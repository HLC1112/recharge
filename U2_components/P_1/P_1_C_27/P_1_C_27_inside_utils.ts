import { computed } from 'vue';

import { IProps, INode } from './P_1_C_27_inside_Obj';



export function useContainer(props: IProps) {

  const containerClasses = computed(() => {

    return []; // 移除 plane-sub，因为父容器已经有了边框

  });



  return { containerClasses };

}



export function getNodeClasses(node: INode & { isHighlighted?: boolean }) {

  const classes = ['node'];

  

  if (node.type === 'festate') {

    classes.push('festate');

  } else if (node.type === 'endstate') {

    classes.push('endstate');

  } else if (node.type === 'blockstate') {

    classes.push('blockstate');

  } else {

    classes.push('node-default');

  }



  if (node.isHighlighted) {

    classes.push('highlighted');

  }

  return classes;

}