import { computed, CSSProperties } from 'vue';
import { IProps, INode } from './P_1_C_127_inside_Obj';

// 基于 P_1_C_27_inside_utils.ts [cite: 801]
export function useContainer(props: IProps) {
  const containerClasses = computed(() => {
    // 作为子平面，不需要 'plane-sub' 边框
    return [];
  });
  return { containerClasses };
}

// 辅助 P_1_C_127.vue 中的 v-for 布局
// 基于 P_1_C_89_inside_utils.ts [cite: 1627]
export function getNodeStyle(node: INode): CSSProperties {
  // P_1_C_127 是一个 flex 容器, P_1_C_120 节点在其中自动换行
  // 不需要 P_1_C_89 的网格布局。
  // 我们可以返回一个空对象，或者为 P_1_C_120 添加一些 flex 基础
  return {
    flex: '0 1 auto', // 允许节点收缩，但不允许放大，基于其内容大小
    minWidth: '100px', // 确保节点有一个最小宽度
  };
}