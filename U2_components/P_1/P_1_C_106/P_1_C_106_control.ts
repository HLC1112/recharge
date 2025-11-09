import { IProps } from './P_1_C_106_inside_Obj';



export function useControl(props: IProps, emit: any) {

  const handleClick = () => {

    emit('click', {

      nodeId: props.nodeData.id,

      nodeData: props.nodeData,

    });

  };



  // B-306: ON 'traceStep' event, HIGHLIGHT self.

  // This is controlled externally via the 'isHighlighted' prop.



  return {

    handleClick,

  };

}