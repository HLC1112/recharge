import { computed } from 'vue';
import { IProps, INode } from './P_1_C_96_inside_Obj';

export function useSvgCanvas(props: IProps) {
  const tag = computed(() => 'svg');
  return { tag };
}

// [修正] 替换为 P_1_C_46 中基于 DOM 的 findNodeElement
export function findNodeElement(nodeId: string): HTMLElement | null {
  if (!nodeId) {
    return null;
  }

  // 1. 优先使用全局 getElementById，这速度最快
  let element = document.getElementById(nodeId);
  
  if (!element) {
    // --- [ 修正 ] ---
    // 2. 备用方案：在 #dsv-detail-modal 弹窗内查找
    //    (Bug修复：原先是 'dsv-detail-grid'，无法找到 P_1_C_130 中的节点)
    const container = document.getElementById('dsv-detail-modal');
    // --- [ 结束 ] ---
    if (container) {
      element = container.querySelector(`[id="${nodeId}"]`);
    }
  }

  // 3. 备用方案 (P_1_C_46 中的逻辑)，用于查找 FE_APPFSM 容器本身
  if (!element) {
     if (nodeId === 'FE_APPFSM' || nodeId.toUpperCase() === 'FE_APPFSM') {
      const container = document.querySelector(`[data-container-id="${nodeId}"]`) ||
                       document.querySelector(`[id="${nodeId}"]`) ||
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

// [修正] 替换为 P_1_C_46 中基于 DOM 的 calculatePathD
// ★★★ 这是本次修改的核心 ★★★
export function calculatePathD(
  sourceEl: HTMLElement,
  targetEl: HTMLElement,
): string {
  if (!sourceEl || !targetEl) {
    return '';
  }

  const sourceRect = sourceEl.getBoundingClientRect();
  const targetRect = targetEl.getBoundingClientRect();

  // [FIX] 寻找 SVG 画布 (P_1_C_96)
  // 1. 找到共同的弹窗祖先
  const modalEl = sourceEl.closest('#dsv-detail-modal');
  
  // 2. 从弹窗祖先中找到 SVG 画布 (P_1_C_96.vue 在 UI.ts 中定义了 .dsv-detail-svg)
  const svgEl = modalEl?.querySelector('svg.dsv-detail-svg');

  if (!svgEl) {
    console.warn('[P_1_C_96] 无法找到 <svg.dsv-detail-svg> 画布。回退到视口坐标。');
    const sourceX = sourceRect.left + sourceRect.width / 2;
    const sourceY = sourceRect.top + sourceRect.height / 2;
    const targetX = targetRect.left + targetRect.width / 2;
    const targetY = targetRect.top + targetRect.height / 2;
    return `M${sourceX},${sourceY} L${targetX},${targetY}`;
  }

  // 找到了 SVG，现在计算相对于 SVG 左上角的坐标
  const svgRect = svgEl.getBoundingClientRect();

  const sourceX = sourceRect.left - svgRect.left + sourceRect.width / 2;
  const sourceY = sourceRect.top - svgRect.top + sourceRect.height / 2;
  const targetX = targetRect.left - svgRect.left + targetRect.width / 2;
  const targetY = targetRect.top - svgRect.top + targetRect.height / 2;

  // 简单的直线
  return `M${sourceX},${sourceY} L${targetX},${targetY}`;
}
// ★★★ 修改结束 ★★★


// [修正] 添加 P_1_C_46 中的 getLinkVisuals
export function getLinkVisuals(linkId: string, highlightedSet: Set<string>) {
  const isHighlighted = highlightedSet.has(linkId);

  return {
    class: isHighlighted ? 'link-highlighted' : 'link-default',
    // 引用 P_1_C_96.vue 中定义的 marker ID
    marker: isHighlighted ? 'url(#arrowhead-dsv-highlighted)' : 'url(#arrowhead-dsv)',
  };
}