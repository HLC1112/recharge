import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue';
import { IProps, IProcessedLink } from './P_1_C_96_inside_Obj';
// [修正] 确保从 'inside_utils' 导入新的 DOM-based 函数
import { findNodeElement, calculatePathD, getLinkVisuals } from './P_1_C_96_inside_utils';

export function useControl(props: IProps) {
  const updateTrigger = ref(0);
  let resizeTimer: number | null = null;
  let mutationTimer: number | null = null;
  let observer: MutationObserver | null = null;

  const handleResize = () => {
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }
    resizeTimer = window.setTimeout(() => {
      nextTick(() => {
        updateTrigger.value++;
      });
    }, 100);
  };

  onMounted(() => {
    window.addEventListener('resize', handleResize);

    nextTick(() => {
      updateTrigger.value++;
    });

    observer = new MutationObserver(() => {
      if (mutationTimer) {
        clearTimeout(mutationTimer);
      }
      mutationTimer = window.setTimeout(() => {
         handleResize();
      }, 150);
    });

    // ★★★ 核心修复 ★★★
    // [修改] 观察 #dsv-detail-modal 内部的变化, 而不是 document.body
    // 这确保了在 modal 内部节点渲染完成后才计算连线
    const modalElement = document.getElementById('dsv-detail-modal');
    observer.observe(modalElement || document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    });
    // ★★★ 修复结束 ★★★
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }
    if (mutationTimer) {
      clearTimeout(mutationTimer);
    }
    if (observer) {
      observer.disconnect();
    }
  });

  const processedLinks = computed((): IProcessedLink[] => {
    const _trigger = updateTrigger.value;
    const highlightedSet = new Set(props.highlightedLinks || []);

    return props.links
      .map((link) => {
        const sourceEl = findNodeElement(link.source);
        const targetEl = findNodeElement(link.target);

        if (!sourceEl || !targetEl) {
           return { 
            id: link.id, 
            d: '', 
            class: 'link-hidden', 
            marker: '', 
            isHighlighted: false, 
            isFailure: false 
          };
        }
        
        try {
          const d = calculatePathD(sourceEl, targetEl);
          
           if (!d) {
           return { 
             id: link.id, 
             d: '', 
             class: 'link-hidden', 
             marker: '', 
             isHighlighted: false, 
             isFailure: false 
           };
          }

          const { class: linkClass, marker } = getLinkVisuals(
            link.id,
            highlightedSet,
          );

          return {
             id: link.id,
            d,
            class: linkClass,
            marker,
             isHighlighted: highlightedSet.has(link.id),
            isFailure: false,
          };
        } catch (error) {
          console.warn(`[P_1_C_96] 计算连线路径失败 (${link.source} -> ${link.target}):`, error);
          return null; // 返回 null 以便过滤
        }
      })
      .filter((link): link is IProcessedLink => link !== null);
  });

  return {
    processedLinks,
  };
}