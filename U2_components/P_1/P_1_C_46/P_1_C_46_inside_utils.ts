import { computed } from 'vue';

import { IProps, INode } from './P_1_C_46_inside_Obj';



export function useSvgCanvas(props: IProps) {

  const svgClasses = computed(() => {

    return ['svg-canvas'];

  });



  return { svgClasses };

}



export function findNodeElement(nodeId: string): HTMLElement | null {

  return document.getElementById(nodeId);

}



export function calculatePathD(

  sourceEl: HTMLElement,

  targetEl: HTMLElement,

): string {

  const sourceRect = sourceEl.getBoundingClientRect();

  const targetRect = targetEl.getBoundingClientRect();

  const svgRect = sourceEl.closest('svg')!.getBoundingClientRect();



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