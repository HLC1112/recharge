import { IProps } from './P_1_C_24_inside_Obj';



export function useControl(

  props: IProps,

  emit: (event: 'node-click', payload: { nodeId: string; nodeData: any }) => void,

) {

  const handleNodeClick = (payload: { nodeId: string; nodeData: any }) => {

    emit('node-click', payload);

  };



  return {

    handleNodeClick,

  };

}