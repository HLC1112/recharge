import { reactive, CSSProperties } from 'vue';

import { IProps } from './P_1_C_77_inside_Obj';



/**

 * 负责组件的容器样式（P_1_E_76，进度条的父容器 P_1_C_76）。

 * 进度条本身 (P_1_E_77/P_1_C_77) 的样式在 inside_utils.ts 中动态计算。

 * 由于 YAML 中只提供了 P_1_E_69 的样式，我们假设 P_1_C_77 组件的根元素是进度条本身，

 * 并且我们需要一个轨道来包含它。在此处定义**容器/轨道**的定位和基本布局。

 * @param props 组件属性

 * @returns 包含组件样式对象的响应式对象

 */

export function useComponentStyles(props: IProps) {

  // 这是 P_1_C_77 外部容器的样式，用于定位和作为轨道

  const componentStyle = reactive<CSSProperties>({

    position: 'absolute',

    // 假设 YAML 中的样式是进度条（内部 div），那么外部容器需要提供一个稳定的尺寸。

    // 由于缺乏外部容器 P_1_C_76 的具体定位信息，我们使用默认布局。

    // 但是，根据组件位置 P_1_C_75/P_1_C_76/P_1_C_77 的层级，这里应该设置绝对定位。

    // 假设父组件已经提供了定位，这里提供一个默认轨道样式。

    width: '100%', // 假设宽度由父容器决定

    height: '8px', // 轨道高度

    backgroundColor: 'rgba(0, 0, 0, 0.2)', // 轨道背景色

    borderRadius: '4px', // 轨道圆角

  });



  return { componentStyle };

}