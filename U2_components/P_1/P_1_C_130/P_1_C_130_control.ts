import { computed } from 'vue';
import { IProps, INode } from './P_1_C_130_inside_Obj';

export function useControl(props: IProps, emit: (event: 'node-click', payload: { nodeId: string; nodeData: INode }) => void) {
  const handleNodeClick = (nodeId: string, nodeData: INode) => {
    emit('node-click', { nodeId, nodeData });
  };

  const highlightedNodesSet = computed(() => new Set(props.highlightedNodes));

  const renderedNodes = computed(() => {
    return props.nodes.map((node) => ({
      ...node,
      label: node.label || node.id,
      // [ ★ 修正 ★ ] 恢复为使用 node.styleClass
      styleClass: node.styleClass || 'default', 
      isHighlighted: highlightedNodesSet.value.has(node.id),
    }));
  });

  return { handleNodeClick, renderedNodes };
}