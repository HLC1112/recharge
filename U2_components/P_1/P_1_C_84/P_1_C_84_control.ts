// U2_components/P_1/P_1_C_84/P_1_C_84_control.ts
import { computed } from 'vue';
import { IProps, DsvNode, DsvLink } from './P_1_C_84_inside_Obj';
import type { ILink as SvgLink } from '../P_1_C_96/P_1_C_96_inside_Obj';

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

  const allInternalNodes = computed(
    (): DsvNode[] => props.dsvNodeData?.internalNodes || [],
  );

  const nodesForFsmContainer = computed(() =>
    allInternalNodes.value.filter(
      (n: any) => n.parentComponentId?.trim() === 'P_1_C_127',
    ),
  );

  const nodesForDbsContainer = computed(() =>
    allInternalNodes.value.filter(
      (n: any) => n.parentComponentId?.trim() === 'P_1_C_130',
    ),
  );

  // [ ★ 新增 ★ ]
  // 过滤出 P_1_C_139 (EventBus 容器) 的子节点
  const nodesForEventBusContainer = computed(() => {
    const list = allInternalNodes.value.filter((n: any) => {
      const parentOk = n.parentComponentId?.trim() === 'P_1_C_139';
      const styleVal = (n as any).styleClass || (n as any).type;
      const styleOk = ['event_node', 'doc_node', 'fail_event', 'appevent'].includes(styleVal);
      const idOk = /^(QRY001_|CMD001_|CMD002_|CMD003_|EVT001_|EVT002_|DOC001_|DOC002_|DOC003_)/.test(String(n.id));
      return parentOk || styleOk || idOk;
    });
    return list;
  });

  // [修改] 从根网格中过滤掉 EventBus
  const nodesForRootGrid = computed(() =>
    allInternalNodes.value.filter(
      (n: any) =>
        n.parentComponentId?.trim() === 'P_1_C_84' &&
        n.id !== 'DBS_Container' &&
        n.id !== 'InternalEventBus' // <-- 排除 EventBus
    ),
  );
  
  // [修改] 单独找到 EventBus 节点数据 (现在是容器)
  const eventBusNodeData = computed(
   () =>
      allInternalNodes.value.find((n: any) => n.id === 'InternalEventBus') ||
      ({
        id: 'InternalEventBus',
        label: 'Internal EventBus',
        componentId: 'P_1_C_139', // <-- [修改] componentId
         styleClass: 'bus'
      } as DsvNode),
  );

  const dbsContainerNodeData = computed(
    () =>
      allInternalNodes.value.find((n: any) => n.id === 'DBS_Container') ||
      ({
        id: 'DBS_Container',
         label: 'DBS Repositories',
        componentId: 'P_1_C_130',
      } as DsvNode),
  );

  const highlightedNodesSet = computed(
    () => new Set(props.flowState?.highlightedNodes || []),
  );
  const isNodeHighlighted = (nodeId: string) =>
    highlightedNodesSet.value.has(nodeId);

  const linksForSvg = computed(
    (): SvgLink[] => {
      if (!props.dsvNodeData?.internalLinks) {
        return [];
      }
      return props.dsvNodeData.internalLinks.map((link: DsvLink) => ({
        id: link.id,
         source: link.from,
        target: link.to,
      }));
    },
  );

  const highlightedNodes = computed(
    () => props.flowState?.highlightedNodes || [],
  );

  const highlightedLinks = computed(
    () => props.flowState?.highlightedLinks || [],
  );

  // [ ★ 移除 ★ ]
  // const eventIn = computed(() => props.flowState?.eventIn);
  // const eventOut = computed(() => props.flowState?.eventOut);
  // const fsmState = computed(() => props.flowState?.fsmState || 'S1');
  // const logEntries = computed(() => props.flowState?.logs || []);

  return {
    handleClose,
    handleExecuteFlow,
    isExecuting,
    title,
    allInternalNodes,
    nodesForFsmContainer,
    nodesForDbsContainer,
    dbsContainerNodeData,
    isNodeHighlighted,
    nodesForRootGrid, // <-- 已修改
    eventBusNodeData, // <-- 已修改
    nodesForEventBusContainer, // <-- [新增]
    linksForSvg,
    highlightedNodes,
    highlightedLinks,
    // [ ★ 移除 ★ ]
    // eventIn,
    // eventOut,
    // fsmState,
    // logEntries,
  };
}