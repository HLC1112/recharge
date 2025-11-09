import { IProps } from './P_1_C_118_inside_Obj';



export function useControl(props: IProps, emit: any) {

  const handleClick = () => {

    emit('click', {

      nodeId: props.nodeData.id,

      nodeData: props.nodeData,

    });

  };



  // B-318: ON 'traceStep' event, HIGHLIGHT self (as failure).

  // This is controlled externally via the 'isHighlighted' and 'isFailure' props.



  return {

    handleClick,

  };

}