import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue';
import { IProps, IProcessedLink } from './P_1_C_129_inside_Obj';
// [修改] 确保从 'inside_utils' 导入
import { findNodeElement, calculatePathD, getLinkVisuals } from './P_1_C_129_inside_utils';

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

    // [修改] 观察 #db-detail-modal 内部的变化
    const modalElement = document.getElementById('db-detail-modal');
    observer.observe(modalElement || document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    });
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
          // console.warn(`[P_1_C_129] 未找到连线节点: ${link.source} -> ${link.target}`);
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
          console.warn(`[P_1_C_129] 计算连线路径失败 (${link.source} -> ${link.target}):`, error);
          return null; // 返回 null 以便过滤
        }
      })
      .filter((link): link is IProcessedLink => link !== null);
  });

  return {
    processedLinks,
  };
}