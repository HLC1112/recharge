import { computed } from 'vue';

import { IProps, INode } from './P_1_C_96_inside_Obj';



export function useSvgCanvas(props: IProps) {

  const tag = computed(() => 'svg');

  return { tag };

}



export function calculateLinkPath(sourceNode: INode, targetNode: INode): string {

  // Simple path from center of source to center of target

  // Assumes x, y are top-left coordinates

  const startX = sourceNode.x + sourceNode.width / 2;

  const startY = sourceNode.y + sourceNode.height / 2;

  const endX = targetNode.x + targetNode.width / 2;

  const endY = targetNode.y + targetNode.height / 2;



  // Simple straight line

  return `M ${startX} ${startY} L ${endX} ${endY}`;



  // TODO: Add more complex path calculation (e.g., orthogonal routing) if needed

}