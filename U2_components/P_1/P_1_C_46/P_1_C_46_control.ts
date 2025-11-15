// 文件：U2_components/P_1/P_1_C_46/P_1_C_46_control.ts
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue';
import { IProps, INode, ILink } from './P_1_C_46_inside_Obj';
import { findNodeElement, calculatePathD, getLinkVisuals } from './P_1_C_46_inside_utils';

export function useControl(props: IProps) {
  // 基础的 DOM 监听和防抖逻辑 (保持不变)
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


  // [修改] renderedLinks 计算属性
  const renderedLinks = computed(() => {
    const _trigger = updateTrigger.value;
    const highlightedSet = new Set(props.highlightedLinks || []);

    const { 
      isDsvModalOpen, dsvNodeIds, 
      isDbModalOpen, dbNodeIds 
    } = props;

    return props.links.map((link) => {
      
      // ★★★ 核心修复：新增过滤逻辑 ★★★
      // 如果连线的起点或终点是 FE_APPFSM 容器，则自动隐藏
      if (link.source === 'FE_APPFSM' || link.target === 'FE_APPFSM') {
        return { id: link.id, d: '', class: 'link-hidden', marker: '' };
      }
      // ★★★ 修复结束 ★★★

      // (现有的弹窗过滤逻辑)
      const isSourceInDsv = dsvNodeIds.has(link.source);
      const isTargetInDsv = dsvNodeIds.has(link.target);
      const isSourceInDb = dbNodeIds.has(link.source);
      const isTargetInDb = dbNodeIds.has(link.target);

      if (isDsvModalOpen && (isSourceInDsv || isTargetInDsv)) {
        return { id: link.id, d: '', class: 'link-hidden', marker: '' };
      }
      
      if (isDbModalOpen && (isSourceInDb || isTargetInDb)) {
        return { id: link.id, d: '', class: 'link-hidden', marker: '' };
      }

      // (现有的 DOM 查找和路径计算逻辑)
      const sourceEl = findNodeElement(link.source);
      const targetEl = findNodeElement(link.target);

      if (!sourceEl || !targetEl) {
        return { id: link.id, d: '', class: 'link-hidden', marker: '' };
      }

      try {
        const d = calculatePathD(sourceEl, targetEl);
        
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
         console.warn(`[P_1_C_46] 计算连线路径失败 (${link.source} -> ${link.target}):`, error);
        return { id: link.id, d: '', class: 'link-hidden', marker: '' };
      }

    });
  });

  return {
    renderedLinks,
  };
}