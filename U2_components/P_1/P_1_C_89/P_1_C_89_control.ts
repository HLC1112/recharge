import { IProps, DsvNode } from './P_1_C_89_inside_Obj';



export function useControl(

  props: IProps,

  emit: (event: 'node-click', ...args: any[]) => void,

) {

  const handleNodeClick = (node: DsvNode) => {

    emit('node-click', { nodeId: node.id, nodeData: node });

  };



  return {

    handleNodeClick,

  };

}