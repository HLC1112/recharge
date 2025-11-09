import { computed } from 'vue';

import { IProps, INode, ILink } from './P_1_C_46_inside_Obj';

import { findNodeElement, calculatePathD, getLinkVisuals } from './P_1_C_46_inside_utils';



export function useControl(props: IProps) {

  const renderedLinks = computed(() => {

    const highlightedSet = new Set(props.highlightedLinks);



    return props.links.map((link) => {

      const sourceEl = findNodeElement(link.source);

      const targetEl = findNodeElement(link.target);



      if (!sourceEl || !targetEl) {

        return { id: link.id, d: '', class: 'link-hidden', marker: '' };

      }



      const d = calculatePathD(sourceEl, targetEl);

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

    });

  });



  return {

    renderedLinks,

  };

}