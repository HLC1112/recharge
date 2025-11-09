import { computed } from 'vue';

import { IProps, IEmits, INode } from './P_1_C_45_inside_Obj';



export function useControl(props: IProps, emit: IEmits) {

  const handleNodeClick = (nodeId: string, nodeData: INode) => {

    emit('node-click', { nodeId, nodeData });

  };



  const highlightedNodesSet = computed(() => {

    return new Set(props.highlightedNodes);

  });



  const renderedNodes = computed(() => {

    return props.nodes.map((node) => ({

      ...node,

      isHighlighted: highlightedNodesSet.value.has(node.id),

      isFailure: node.type === 'fail_event',

    }));

  });



  return {

    handleNodeClick,

    renderedNodes,

  };

}