import { IProps } from './P_1_C_25_inside_Obj';

export function useControl(
  props: IProps,
  emit: (event: 'node-click', payload: { nodeId: string; nodeData: any }) => void,
) {
  // [修正] 替换 handleClickWrapper
  // 此函数现在接收来自子平面（如 P_1_C_27）的事件并将其冒泡到父级（P_1_C_24）
  const handleNodeClick = (payload: { nodeId: string; nodeData: any }) => {
    emit('node-click', payload);
  };

  return { handleNodeClick };
}