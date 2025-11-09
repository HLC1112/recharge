// 文件：U2_components/P_1/P_1_C_9/P_1_C_9_control.ts
import { IProps } from './P_1_C_9_inside_Obj';

export function useControl(props: IProps, emit: (event: 'click') => void) {
  const handleClick = () => {
    if (props.disabled) return;
    // 只负责冒泡 click，具体打开弹窗由父层(P_1_C_6)处理
    emit('click');
  };
  return { handleClick };
}
