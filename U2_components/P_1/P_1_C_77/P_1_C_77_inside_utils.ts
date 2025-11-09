import { computed, CSSProperties } from 'vue';

import { IProps } from './P_1_C_77_inside_Obj';



/**

 * 负责处理进度条的动态样式计算。

 * @param props 组件属性

 * @returns 包含进度条的容器样式和内部动态宽度样式的对象

 */

export function useProgress(props: IProps) {

  // P_1_E_69 进度条元素的静态样式容器 (bg-yellow-400 h-2 rounded-full)

  // 这是进度条的**轨道**，但因为 P_1_E_69/P_1_C_77 是进度条本身，所以我们把它作为内部条。

  const progressBarContainerStyle = computed((): CSSProperties => ({

    // h-2 对应 height: 8px, rounded-full 对应 borderRadius: 9999px

    height: '100%',

    borderRadius: '4px',

    overflow: 'hidden',

    transition: 'width 0.3s ease-in-out', // 动画效果

  }));



  // 计算动态宽度 style.width: 对应 progress prop

  const progressBarInnerStyle = computed((): CSSProperties => {

    // 确保 progress 在 0 到 100 之间

    const clampedProgress = Math.max(0, Math.min(100, props.progress));

    return {

      // 宽度百分比

      width: `${clampedProgress}%`,

      // YAML 中指定的样式（bg-yellow-400 h-2 rounded-full 的部分实现）

      backgroundColor: 'rgba(251, 191, 36, 1)', // 对应 bg-yellow-400

      height: '100%', // 继承父容器高度

    };

  });



  return { progressBarContainerStyle, progressBarInnerStyle };

}