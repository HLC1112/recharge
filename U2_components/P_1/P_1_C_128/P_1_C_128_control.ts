import { computed } from 'vue';
import { IProps, DsvNode, DsvLink } from './P_1_C_128_inside_Obj';
import type { ILink as SvgLink } from '../P_1_C_129/P_1_C_129_inside_Obj';

export function useControl(
  props: IProps,
  // [ ★ 修改 ★ ] 移除 'execute-flow'
  emit: (event: 'update:visible', ...args: any[]) => void,
) {
  const handleClose = () => {
    emit('update:visible', false);
  };

  // [ ★ 移除 ★ ]
  // const handleExecuteFlow = () => {
  //   emit('execute-flow');
  // };
  // const isExecuting = computed(() => props.flowState?.status === 'running');

  const title = computed(
    () => props.dsvNodeData?.name || 'DB 详情',
  );

  const allInternalNodes = computed(
    (): DsvNode[] => props.dsvNodeData?.internalNodes || [],
  );

  const mysqlNodes = computed(() =>
    allInternalNodes.value.filter(
      (n: any) => n.parentComponentId?.trim() === 'P_1_C_42',
    ),
  );

  const mongoNodes = computed(() =>
    allInternalNodes.value.filter(
      (n: any) => n.parentComponentId?.trim() === 'P_1_C_43',
    ),
  );

  // ★★★ 核心修改点 ↓↓↓ ★★★
  // [新增] 过滤出那些直接属于 P_1_C_128 的“根”节点
  const rootNodes = computed(() =>
    allInternalNodes.value.filter(
      (n: any) => n.parentComponentId?.trim() === 'P_1_C_128',
    ),
  );
  // ★★★ 核心修改点 ↑↑↑ ★★★

  const linksForSvg = computed(
    (): SvgLink[] => {
      if (!props.dsvNodeData?.internalLinks) {
        return [];
      }
      return props.dsvNodeData.internalLinks.map((link: DsvLink) => ({
        id: link.id,
        source: link.from, // <-- 映射 from
        target: link.to,   // <-- 映射 to
      }));
    }
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
    // [ ★ 移除 ★ ]
    // handleExecuteFlow,
    // isExecuting,
    title,
     allInternalNodes,
    mysqlNodes,
    mongoNodes,
    rootNodes, // [新增] 导出 rootNodes
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