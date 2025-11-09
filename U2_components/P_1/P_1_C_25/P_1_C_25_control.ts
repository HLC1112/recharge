import { IProps } from './P_1_C_25_inside_Obj';



export function useControl(

  props: IProps,

  emit: (event: 'node-click', payload: { nodeId: string; nodeData: any }) => void,

) {

  const handleClickWrapper = (event: MouseEvent) => {

    // Logic to find if a child node was clicked

    const targetNode = (event.target as HTMLElement).closest('.node'); // Assuming nodes have a '.node' class



    if (targetNode) {

      const nodeId = targetNode.id;

      // Find the corresponding node data from the props

      const nodeData = props.nodes.find((n: any) => n.id === nodeId) || {};



      emit('node-click', { nodeId, nodeData });

    }

  };



  return { handleClickWrapper };

}