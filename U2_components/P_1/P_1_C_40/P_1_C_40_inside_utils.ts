import { computed } from 'vue';

import { IProps, INode } from './P_1_C_40_inside_Obj';



export function useContainer(props: IProps) {

  const containerClasses = computed(() => {

    return []; // 移除 plane-sub，因为父容器已经有了边框

  });



  return { containerClasses };

}



export function getNodeClasses(node: INode & { isHighlighted?: boolean }) {

  const classes = ['node', 'fsm_state'];

  if (node.isHighlighted) {

    classes.push('highlighted');

  }

  return classes;

}