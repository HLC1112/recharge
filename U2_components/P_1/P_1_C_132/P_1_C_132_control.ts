import { IProps } from './P_1_C_132_inside_Obj';

export function useControl(props: IProps, emit: any) {
  const handleClick = () => {
    emit('click', {
      nodeId: props.nodeData.id,
      nodeData: props.nodeData,
    });
  };

  return {
    handleClick,
  };
}