import { IProps } from './P_1_C_114_inside_Obj';



export function useControl(props: IProps, emit: any) {

  // B-314: ON CLICK, SHOW component (P_1_C_84).

  const handleClick = () => {

    emit('click', {

      nodeId: props.nodeData.id,

      nodeData: props.nodeData,

    });

  };



  // B-314: ON 'traceStep' event, HIGHLIGHT self.

  // This is controlled externally via the 'isHighlighted' prop.



  return {

    handleClick,

  };

}