import { computed, CSSProperties } from 'vue';

import { IProps } from './P_1_C_24_inside_Obj';



// CL_18: Container

// description: 用于搭建页面基本布局的容器组件 (如Header, Footer, Aside, Main)。



export function useElement(props: IProps) {

  const tag = computed(() => 'div');



  const elementId = computed(() => 'main-container');



  const elementClasses = computed(() => [

    'w-full',

    'h-full',

    'relative',

    'flex',

    'flex-col',

  ]);



  return { tag, elementId, elementClasses };

}



export function usePlaneNodes(props: IProps) {

  // Helper function to filter nodes based on their plane.

  // We assume node objects have a 'plane' property (e.g., 'frontend', 'https', 'backend')

  // This logic might need adjustment based on the actual node data structure.

  const filterNodesByPlane = (planeName: string) => {

    return props.nodes.filter((node: any) => node.plane === planeName);

  };



  const frontendNodes = computed(() => filterNodesByPlane('frontend'));

  const httpsNodes = computed(() => filterNodesByPlane('https'));

  const backendNodes = computed(() => filterNodesByPlane('backend'));



  const frontendProps = computed(() => ({

    nodes: frontendNodes.value,

    highlightedNodes: props.highlightedNodes,

  }));



  const httpsProps = computed(() => ({

    nodes: httpsNodes.value,

    highlightedNodes: props.highlightedNodes,

  }));



  const backendProps = computed(() => ({

    nodes: backendNodes.value,

    highlightedNodes: props.highlightedNodes,

  }));



  return {

    frontendProps,

    httpsProps,

    backendProps,

  };

}