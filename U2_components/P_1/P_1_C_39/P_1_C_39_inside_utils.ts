import { computed } from 'vue';
import { IProps } from './P_1_C_39_inside_Obj';

/** 与 P_1_C_36 保持一致：提供 tag / classes / 标题 */
export function useContainer(props: IProps) {
  const tag = computed(() => 'section');
  const containerClasses = computed(() => ['plane', 'flex-1']);
  const textContent = computed(
    () => '后端平面 (Backend Plane) - 业务逻辑与数据处理层'
  );
  return { tag, containerClasses, textContent };
}
