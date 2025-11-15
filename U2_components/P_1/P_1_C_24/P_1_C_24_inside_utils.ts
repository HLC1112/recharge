import { computed, CSSProperties } from 'vue';

import { IProps } from './P_1_C_24_inside_Obj';



// CL_18: Container

// description: 用于搭建页面基本布局的容器组件 (如Header, Footer, Aside, Main)。



export function useElement(props: IProps) {

  const tag = computed(() => 'div');
  const elementId = computed(() => 'main-container');



  const elementClasses = computed(() => [

    'w-full',

    'h-full',

    'relative',

    'flex',

    'flex-col',

  ]);



  return { tag, elementId, elementClasses };

}



export function usePlaneNodes(props: IProps) {

  // 根据parentComponentId过滤节点到对应的平面
  // 前端平面：P_1_C_25及其子组件（P_1_C_26 到 P_1_C_35）
  // HTTPS平面：P_1_C_36及其子组件（P_1_C_37, P_1_C_38）
  // 后端平面：P_1_C_39及其子组件（P_1_C_40 到 P_1_C_45）

  const frontendParentIds = ['P_1_C_25', 'P_1_C_26', 'P_1_C_27', 'P_1_C_28', 'P_1_C_29', 'P_1_C_30', 'P_1_C_31', 'P_1_C_32', 'P_1_C_33', 'P_1_C_34', 'P_1_C_35'];
  const httpsParentIds = ['P_1_C_36', 'P_1_C_37', 'P_1_C_38'];
  const backendParentIds = ['P_1_C_39', 'P_1_C_40', 'P_1_C_41', 'P_1_C_42', 'P_1_C_43', 'P_1_C_44', 'P_1_C_45'];

  const filterNodesByParentIds = (parentIds: string[]) => {
     const filtered = props.nodes.filter((node: any) => {
      const parentId = node.parentComponentId;
      if (parentId) {
        const matched = parentIds.includes(parentId);
        if (matched && parentIds.includes('P_1_C_25')) {
           // 前端平面调试日志
          console.log(`[usePlaneNodes] 前端节点匹配: ${node.id} -> parentComponentId: ${parentId}`);
        }
        return matched;
      }
       // 如果没有parentComponentId，根据类型或ID推断（后备方案）
      // 前端：trigger, festate, endstate, blockstate, fsmbrain, feinfra, ufstore, uistore, cache, appevent
      // HTTPS：httpevent, beinfra (网关)
      // 后端：其他类型
      const nodeType = node.type || '';
       const nodeId = (node.id || '').toUpperCase();
      
      // 前端节点类型
      if (['trigger', 'festate', 'endstate', 'blockstate', 'fsmbrain', 'feinfra', 'ufstore', 'uistore', 'cache', 'appevent'].includes(nodeType) ||
          nodeId.startsWith('FE_') || nodeId.startsWith('E0')) {
        return parentIds.includes('P_1_C_25');
      }
      // HTTPS节点类型
      if (['httpevent'].includes(nodeType) || 
          (nodeType === 'beinfra' && (nodeId.includes('GATEWAY') || nodeId.includes('API'))) ||
           nodeId.startsWith('HTTP_')) {
        return parentIds.includes('P_1_C_36');
      }
      // 后端节点类型（默认）
      if (['fsm_state', 'da_orchestrator', 'dsv', 'db_component', 'bus', 'fail_event', 'event_node', 'doc_node'].includes(nodeType) ||
          nodeId.startsWith('BE_') || nodeId.startsWith('BD_') || nodeId.startsWith('DA_') || nodeId.startsWith('DSV_') ||
          nodeId.startsWith('QRY') || nodeId.startsWith('CMD') || nodeId.startsWith('EVT') || nodeId.startsWith('FAIL') || nodeId.startsWith('DOC')) {
        return parentIds.includes('P_1_C_39');
      }
      return false;
    });
    
    // 调试日志
    if (parentIds.includes('P_1_C_25')) {
      console.log(`[usePlaneNodes] 前端平面: 输入 ${props.nodes.length} 个节点, 过滤后 ${filtered.length} 个节点`);
      if (filtered.length > 0) {
        console.log(`[usePlaneNodes] 前端节点示例:`, filtered.slice(0, 3).map(n => ({ id: n.id, parentComponentId: n.parentComponentId })));
      }
    }
    
    return filtered;
  };

  const frontendNodes = computed(() => filterNodesByParentIds(frontendParentIds));

  const httpsNodes = computed(() => {
    const filtered = filterNodesByParentIds(httpsParentIds);
    console.log(`[usePlaneNodes] HTTPS平面: 输入 ${props.nodes.length} 个节点, 过滤后 ${filtered.length} 个节点`);
    // 检查 BE_APIGateway 节点
    const beGateway = props.nodes.find(n => n.id === 'BE_APIGateway');
     if (beGateway) {
      console.log(`[usePlaneNodes] BE_APIGateway 节点信息:`, {
        id: beGateway.id,
        parentComponentId: (beGateway as any).parentComponentId,
        type: beGateway.type,
         inFiltered: filtered.some(n => n.id === 'BE_APIGateway')
      });
    }
    return filtered;
  });

  const backendNodes = computed(() => filterNodesByParentIds(backendParentIds));


  // ★★★ [修改] 传递 tracedNodeSet ★★★
  const frontendProps = computed(() => ({
    nodes: frontendNodes.value,
    highlightedNodes: props.highlightedNodes,
    tracedNodeSet: props.tracedNodeSet, // <-- 新增
  }));

  const httpsProps = computed(() => ({
    nodes: httpsNodes.value,
    highlightedNodes: props.highlightedNodes,
    tracedNodeSet: props.tracedNodeSet, // <-- 新增
  }));

  const backendProps = computed(() => ({
    nodes: backendNodes.value,
    highlightedNodes: props.highlightedNodes,
    tracedNodeSet: props.tracedNodeSet, // <-- 新增
  }));
  // ★★★ 修改结束 ★★★

  return {
    frontendProps,
    httpsProps,
    backendProps,
  };
}