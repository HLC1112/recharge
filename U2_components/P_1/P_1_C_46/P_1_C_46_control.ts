import { computed } from 'vue';

import { IProps, INode, ILink } from './P_1_C_46_inside_Obj';

import { findNodeElement, calculatePathD, getLinkVisuals } from './P_1_C_46_inside_utils';



export function useControl(props: IProps) {

  const renderedLinks = computed(() => {

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