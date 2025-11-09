import { IProps } from './P_1_C_104_inside_Obj';

import { simulateApiCall } from './P_1_C_104_U10_service';



export function useControl(props: IProps, emit: any) {

  const handleClick = () => {

    emit('click', {

      nodeId: props.nodeData.id,

      nodeData: props.nodeData,

    });

  };



  // B-304: ON 'traceStep' event, HIGHLIGHT self and simulate API call.

  const handleTraceStep = (event: any) => {

    if (props.isHighlighted) {

      // Logic to simulate API call

      simulateApiCall(props.nodeData);

    }

  };



  return {

    handleClick,

    handleTraceStep,

  };

}