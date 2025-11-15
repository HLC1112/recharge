// U2_components/P_1/P_1_C_89/P_1_C_89_inside_utils.ts
import { computed, CSSProperties, defineAsyncComponent } from 'vue';
import { IProps, DsvNode } from './P_1_C_89_inside_Obj';
// 导入 P_1_C_84 的 IProps 来获取 nodesForDbsContainer
import type { IProps as P_1_C_84_IProps } from '../P_1_C_84/P_1_C_84_inside_Obj'; 


// CL_33: Layout (Row/Col)
export function useLayoutLogic(props: IProps) {
  const layoutTag = computed(() => 'div');
  return { layoutTag };
}

// Lazy load node components
const nodeComponentMap = {
  P_1_C_119: defineAsyncComponent(
     () => import('../P_1_C_119/P_1_C_119.vue'),
  ),
  P_1_C_120: defineAsyncComponent(
    () => import('../P_1_C_120/P_1_C_120.vue'),
  ),
  P_1_C_121: defineAsyncComponent(
    () => import('../P_1_C_121/P_1_C_121.vue'),
  ),
  P_1_C_122: defineAsyncComponent(
    () => import('../P_1_C_122/P_1_C_122.vue'),
  ),
  P_1_C_123: defineAsyncComponent(
    () => import('../P_1_C_123/P_1_C_123.vue'),
  ),
  P_1_C_130: defineAsyncComponent(
     () => import('../P_1_C_130/P_1_C_130.vue'),
  ),
  
  // --- [ 新增 ] ---
  P_1_C_139: defineAsyncComponent(
    () => import('../P_1_C_139/P_1_C_139.vue'),
  ),
  // --- [ 结束 ] ---
  
  // --- [ 新增修正 ] ---
  // 添加 P_1_C_128 (DB Modal) 所需的 P_1_C_13x 节点
  P_1_C_135: defineAsyncComponent(
    () => import('../P_1_C_135/P_1_C_135.vue'),
  ),
  P_1_C_136: defineAsyncComponent(
     () => import('../P_1_C_136/P_1_C_136.vue'),
  ),
  P_1_C_137: defineAsyncComponent(
     () => import('../P_1_C_137/P_1_C_137.vue'),
  ),
  // [ ★ 移除 ★ ] P_1_C_139 (Note 节点)
  // --- [ 修正结束 ] ---
};

// useNode 现在接收 P_1_C_84 传入的完整 props
export function useNode(props: IProps & P_1_C_84_IProps) {

  const getNodeComponent = (componentId: string) => {
     return (nodeComponentMap as any)[componentId] || null;
  };

  const getNodeStyle = (node: DsvNode): CSSProperties => {
    return {
      gridRowStart: node.layout.gridRowStart,
      gridColumnStart: node.layout.gridColumnStart,
      gridRowEnd: node.layout.gridRowEnd || 'auto',
       gridColumnEnd: node.layout.gridColumnEnd || 'auto',
       position: 'relative',
     };
  };

  const isNodeHighlighted = (nodeId: string): boolean => {
    return props.highlightedNodes?.includes(nodeId) || false;
  };

  // --- [ 修正 ] ---
  
  // 1. 获取子容器所需的子节点列表
  const getNodesForChildContainer = (componentId?: string) => {
    if (componentId === 'P_1_C_130') {
      return props.nodesForDbsContainer || [];
    }
    // [ ★ 新增 ★ ]
    if (componentId === 'P_1_C_139') {
      return props.nodesForEventBusContainer || [];
    }
    // [ ★ 结束新增 ★ ]
    return [];
  };

  // 2. 获取 P_1_C_130 (DBS 容器) 所需的高亮列表
  const allHighlightedNodes = computed(() => props.highlightedNodes || []);
  // --- [ 结束 ] ---


  return { 
    getNodeStyle, 
    isNodeHighlighted, 
    getNodeComponent,
    // --- [ 修正 ] ---
    getNodesForChildContainer,
    allHighlightedNodes,
    // --- [ 结束 ] ---
  };
}