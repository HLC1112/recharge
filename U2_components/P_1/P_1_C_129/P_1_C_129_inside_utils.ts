import { computed } from 'vue';
import { IProps, INode } from './P_1_C_129_inside_Obj';

export function useSvgCanvas(props: IProps) {
  const tag = computed(() => 'svg');
  return { tag };
}

export function findNodeElement(nodeId: string): HTMLElement | null {
  if (!nodeId) {
    return null;
  }

  // [修改] 优先使用全局 getElementById，这可以找到 P_1_C_42/43/89 中的所有节点
  let element = document.getElementById(nodeId);
  if (element) {
    return element;
  }
  
  // [修改] 备用方案：在 #db-detail-modal 弹窗内查找
  const container = document.getElementById('db-detail-modal');
  if (container) {
    element = container.querySelector(`[id="${nodeId}"]`);
  }

  // ... (findNodeElement 的其余部分保持不变) ...
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

// ★★★ 核心修改点 ↓↓↓ ★★★
export function calculatePathD(
  sourceEl: HTMLElement,
  targetEl: HTMLElement,
): string {
  if (!sourceEl || !targetEl) {
    return '';
  }

  const sourceRect = sourceEl.getBoundingClientRect();
  const targetRect = targetEl.getBoundingClientRect();

  // [FIX] 寻找 SVG 画布 (P_1_C_129)，它位于 #db-detail-modal 内部
  // 1. 找到共同的弹窗祖先
  const modalEl = sourceEl.closest('#db-detail-modal');
  
  // 2. 从弹窗祖先中找到 SVG 画布 (P_1_C_129.vue 在 UI.ts 中定义了 .db-detail-svg)
  const svgEl = modalEl?.querySelector('svg.db-detail-svg');

  if (!svgEl) {
    // [修改] 更新警告日志
    console.warn('[P_1_C_129] 无法找到 <svg.db-detail-svg> 画布。回退到视口坐标。');
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

  return `M${sourceX},${sourceY} L${targetX},${targetY}`;
}
// ★★★ 核心修改点 ↑↑↑ ★★★

export function getLinkVisuals(linkId: string, highlightedSet: Set<string>) {
  const isHighlighted = highlightedSet.has(linkId);

  return {
    class: isHighlighted ? 'link-highlighted' : 'link-default',
    // [修改] 引用 P_1_C_129.vue 中定义的 marker ID
    marker: isHighlighted ? 'url(#arrowhead-db-highlighted)' : 'url(#arrowhead-db)',
  };
}