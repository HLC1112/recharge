import { computed } from 'vue';
import { IProps, IEmits, INode } from './P_1_C_39_inside_Obj';

export function useControl(props: IProps, emit: IEmits) {
  const handleNodeClick = (payload: { nodeId: string; nodeData: INode }) => {
    emit('node-click', payload);
  };

  const nodesForC40 = computed(() =>
    props.nodes.filter((node) => node.type === 'fsm_state'),
  );

  const nodesForC41 = computed(() =>
    props.nodes.filter(
      (node) => node.type === 'da_orchestrator' || node.type === 'dsv',
    ),
  );

  // [移除] nodesForC42
  // [移除] nodesForC43

  const nodesForC44 = computed(() =>
    props.nodes.filter((node) => node.type === 'event_center'),
  );

  const nodesForC45 = computed(() =>
    props.nodes.filter(
      (node) => node.type === 'event_node' || node.type === 'fail_event',
    ),
  );

  return {
    handleNodeClick,
    nodesForC40,
    nodesForC41,
    // [移除] nodesForC42,
    // [移除] nodesForC43,
    nodesForC44,
    nodesForC45,
  };
}