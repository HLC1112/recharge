import { computed } from 'vue';

import { IProps, DsvNode, DsvLink } from './P_1_C_84_inside_Obj';



export function useControl(

  props: IProps,

  emit: (event: 'update:visible' | 'execute-flow', ...args: any[]) => void,

) {

  const handleClose = () => {

    emit('update:visible', false);

  };



  const handleExecuteFlow = () => {

    emit('execute-flow');

  };



  const isExecuting = computed(() => props.flowState?.status === 'running');



  const title = computed(

    () => props.dsvNodeData?.name || 'DSV 详情（内部流程）',

  );



  const nodesForGrid = computed(

    (): DsvNode[] => props.dsvNodeData?.internalNodes || [],

  );



  const linksForSvg = computed(

    (): DsvLink[] => props.dsvNodeData?.internalLinks || [],

  );



  const highlightedNodes = computed(

    () => props.flowState?.highlightedNodes || [],

  );



  const highlightedLinks = computed(

    () => props.flowState?.highlightedLinks || [],

  );



  const eventIn = computed(() => props.flowState?.eventIn);



  const eventOut = computed(() => props.flowState?.eventOut);



  const fsmState = computed(() => props.flowState?.fsmState || 'S1');



  const logEntries = computed(() => props.flowState?.logs || []);



  return {

    handleClose,

    handleExecuteFlow,

    isExecuting,

    title,

    nodesForGrid,

    linksForSvg,

    highlightedNodes,

    highlightedLinks,

    eventIn,

    eventOut,

    fsmState,

    logEntries,

  };

}