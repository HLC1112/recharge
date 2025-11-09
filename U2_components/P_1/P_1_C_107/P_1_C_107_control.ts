import { IProps } from './P_1_C_107_inside_Obj';



export function useControl(props: IProps, emit: any) {

  const handleClick = () => {

    emit('click', {

      nodeId: props.nodeData.id,

      nodeData: props.nodeData,

    });

  };



  // B-307: ON 'traceStep' event, HIGHLIGHT self.

  // This is controlled externally via the 'isHighlighted' prop.



  return {

    handleClick,

  };

}