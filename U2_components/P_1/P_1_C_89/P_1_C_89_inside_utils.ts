import { computed, CSSProperties, defineAsyncComponent } from 'vue';

import { IProps, DsvNode } from './P_1_C_89_inside_Obj';



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

};



export function useNode(props: IProps) {

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



  return { getNodeStyle, isNodeHighlighted, getNodeComponent };

}