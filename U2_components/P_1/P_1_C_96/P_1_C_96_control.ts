import { computed } from 'vue';

import { IProps, INode, ILink, IProcessedLink } from './P_1_C_96_inside_Obj';

import { calculateLinkPath } from './P_1_C_96_inside_utils';



export function useControl(props: IProps) {

  const nodeMap = computed(() => {

    return new Map(props.nodes.map((node) => [node.id, node]));

  });



  const processedLinks = computed((): IProcessedLink[] => {

    const highlightedSet = new Set(props.highlightedLinks || []);



    return props.links

      .map((link) => {

        const sourceNode = nodeMap.value.get(link.source);

        const targetNode = nodeMap.value.get(link.target);



        if (sourceNode && targetNode) {

          const d = calculateLinkPath(sourceNode, targetNode);

          const isHighlighted = highlightedSet.has(link.id);



          return {

            id: link.id,

            d: d,

            isHighlighted: isHighlighted,

            isFailure: false, // Failure state not specified for links in this component

          };

        }

        return null;

      })

      .filter((link): link is IProcessedLink => link !== null);

  });



  return {

    processedLinks,

  };

}