import { computed } from 'vue';

import { IProps, IEmits, INode } from './P_1_C_36_inside_Obj';



export function useControl(props: IProps, emit: IEmits) {

  const handleNodeClick = (payload: { nodeId: string; nodeData: INode }) => {

    emit('node-click', payload);

  };



  const nodesForC37 = computed(() =>

    props.nodes.filter((node) => node.type === 'httpevent'),

  );



  const nodesForC38 = computed(() =>

    props.nodes.filter((node) => node.type === 'beinfra'),

  );



  return {

    handleNodeClick,

    nodesForC37,

    nodesForC38,

  };

}