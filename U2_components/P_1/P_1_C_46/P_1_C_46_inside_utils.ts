import { computed } from 'vue';

import { IProps, INode } from './P_1_C_46_inside_Obj';



export function useSvgCanvas(props: IProps) {

  const svgClasses = computed(() => {

    return ['svg-canvas'];

  });



  return { svgClasses };

}



export function findNodeElement(nodeId: string): HTMLElement | null {
  // 首先尝试直接查找节点
  let element = document.getElementById(nodeId);
  
  // 如果找不到，且节点ID是容器节点（如 FE_APPFSM），尝试查找对应的容器元素
  if (!element) {
    if (nodeId === 'FE_APPFSM' || nodeId.toUpperCase() === 'FE_APPFSM') {
      // FE_APPFSM 对应 P_1_C_27 容器
      // 首先尝试通过 data-container-id 查找
      const container = document.querySelector(`[data-container-id="${nodeId}"]`) ||
                       document.querySelector(`[id="${nodeId}"]`) ||
                       // 如果还是找不到，尝试查找包含 "FE_APPFSM" 文本的元素
                       Array.from(document.querySelectorAll('*')).find(el => 
                         el.textContent?.includes('FE_APPFSM') && 
                         (el as HTMLElement).offsetWidth > 0 && 
                         (el as HTMLElement).offsetHeight > 0
                       ) as HTMLElement | null;
      if (container) {
        return container as HTMLElement;
      }
    }
  }
  
  return element;
}



export function calculatePathD(
  sourceEl: HTMLElement,
  targetEl: HTMLElement,
): string {
  // 检查元素是否存在
  if (!sourceEl || !targetEl) {
    return '';
  }

  // 获取元素的边界矩形
  const sourceRect = sourceEl.getBoundingClientRect();
  const targetRect = targetEl.getBoundingClientRect();

  // 查找 SVG 元素，如果找不到则使用父容器
  const svgEl = sourceEl.closest('svg') || targetEl.closest('svg');
  if (!svgEl) {
    // 如果找不到 SVG，使用 document.body 作为参考
    const sourceX = sourceRect.left + sourceRect.width / 2;
    const sourceY = sourceRect.top + sourceRect.height / 2;
    const targetX = targetRect.left + targetRect.width / 2;
    const targetY = targetRect.top + targetRect.height / 2;
    return `M${sourceX},${sourceY} L${targetX},${targetY}`;
  }

  const svgRect = svgEl.getBoundingClientRect();

  const sourceX = sourceRect.left - svgRect.left + sourceRect.width / 2;
  const sourceY = sourceRect.top - svgRect.top + sourceRect.height / 2;
  const targetX = targetRect.left - svgRect.left + targetRect.width / 2;
  const targetY = targetRect.top - svgRect.top + targetRect.height / 2;

  return `M${sourceX},${sourceY} L${targetX},${targetY}`;
}



export function getLinkVisuals(linkId: string, highlightedSet: Set<string>) {

  const isHighlighted = highlightedSet.has(linkId);

  return {

    class: isHighlighted ? 'link-highlighted' : 'link-default',

    marker: isHighlighted ? 'url(#arrowhead-highlighted)' : 'url(#arrowhead)',

  };

}
