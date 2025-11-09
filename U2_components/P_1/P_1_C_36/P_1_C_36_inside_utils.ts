import { computed } from 'vue';
import { IProps } from './P_1_C_36_inside_Obj';

/**
 * 统一导出：tag / containerClasses / textContent
 * 让 P_1_C_36.vue 可以解构得到这三项
 */
export function useContainer(props: IProps) {
  // 组件外层语义标签
  const tag = computed(() => 'section');

  // 外层容器样式类（保持 plane + flex-1，参与三平面纵向伸展）
  const containerClasses = computed(() => {
    return ['plane', 'flex-1'];
  });

  // 标题文案
  const textContent = computed(
    () => 'HTTPS通信平面 (HTTPS Communication Plane) - 网络传输层'
  );

  return { tag, containerClasses, textContent };
}
