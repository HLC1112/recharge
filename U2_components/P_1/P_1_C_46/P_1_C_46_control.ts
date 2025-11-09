import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue';

import { IProps, INode, ILink } from './P_1_C_46_inside_Obj';

import { findNodeElement, calculatePathD, getLinkVisuals } from './P_1_C_46_inside_utils';



export function useControl(props: IProps) {

  // 使用一个响应式计数器来触发连线重新计算
  const updateTrigger = ref(0);

  let resizeTimer: number | null = null;
  let mutationTimer: number | null = null;
  let observer: MutationObserver | null = null;

  // 监听窗口大小变化，触发连线重新计算（使用防抖）
  const handleResize = () => {
    // 防抖处理，避免频繁触发
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }
    resizeTimer = window.setTimeout(() => {
      // 使用 nextTick 确保 DOM 更新完成后再重新计算
      nextTick(() => {
        updateTrigger.value++;
      });
    }, 100); // 100ms 防抖延迟
  };

  onMounted(() => {
    window.addEventListener('resize', handleResize);

    // 初始计算一次连线
    nextTick(() => {
      updateTrigger.value++;
    });

    // 使用 MutationObserver 监听 DOM 变化，当节点位置改变时重新计算连线
    // 使用防抖来避免频繁触发
    observer = new MutationObserver(() => {
      if (mutationTimer) {
        clearTimeout(mutationTimer);
      }
      mutationTimer = window.setTimeout(() => {
        handleResize();
      }, 150); // MutationObserver 使用稍长的防抖延迟
    });

    // 观察整个文档的变化（特别是节点元素的位置变化）
    observer.observe(document.body, {
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



  const renderedLinks = computed(() => {

    // 依赖 updateTrigger 来触发重新计算

    const _trigger = updateTrigger.value;

    const highlightedSet = new Set(props.highlightedLinks || []);



    return props.links.map((link) => {

      const sourceEl = findNodeElement(link.source);

      const targetEl = findNodeElement(link.target);



      if (!sourceEl || !targetEl) {

        return { id: link.id, d: '', class: 'link-hidden', marker: '' };

      }

      try {
        const d = calculatePathD(sourceEl, targetEl);
        
        // 如果计算出的路径为空，也隐藏连线
        if (!d) {
          return { id: link.id, d: '', class: 'link-hidden', marker: '' };
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

        };
      } catch (error) {
        // 如果计算路径时出错，返回隐藏的连线
        console.warn(`[P_1_C_46] 计算连线路径失败 (${link.source} -> ${link.target}):`, error);
        return { id: link.id, d: '', class: 'link-hidden', marker: '' };
      }

    });

  });



  return {

    renderedLinks,

  };

}