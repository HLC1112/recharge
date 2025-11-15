import { reactive, ref, nextTick } from 'vue';
import { parseMmdNodes, groupNodesByParentComponent, type ParsedNode } from './mmdParser';
// --- [新增] ---
import { fetchSuccessTracePath } from '../U3_api/successtraceApi';
// --- [新增结束] ---

type NodeType =
  | 'trigger' | 'festate' | 'endstate' | 'blockstate'
  | 'fsmbrain' | 'feinfra' | 'ufstore' | 'uistore'
  | 'cache' | 'appevent' | 'httpevent' | 'fsm_state'
  | 'da_orchestrator' | 'dsv' | 'db_component' | 'bus' |
'fail_event';

interface UINode {
  id: string;
  text: string;
  type: NodeType;
  pos: { top: string; left: string; };
  style?: string; // CSS内联样式
  parentComponentId?: string; // 父容器组件ID
  componentId?: string;
}

interface LinkDef { from: string; to: string; }

// --- 路径定义 (保持不变) ---
// === 修正：使用您提供的完整流程路径 ===

// 3.1 至 3.13 的完整成功追踪路径
// [注意] 这个数组现在仅作为 API 失败时的备用，或者如果您想保留本地模拟切换时使用
const successPath = [
  'FE_TRIGGER_UI', 
  'FE_TRIGGER_SLOT', 
  'E01', 
  // 'FE_APPFSM' (容器, 跳过)
  'FE_State_Idle', 
  'FE_State_Requesting',
  'E04', 
  'FE_STORE_UF', 
  'E05', 
  // 'FE_APPFSM' (容器, 跳过)
  'E07', 
  'FE_TSDSV', 
  'E20', 
  'FE_STORE_UI', 
  'E10',
  // 'FE_APPFSM' (容器, 跳过)
  'FE_APIClient', 
  'HTTP_Action_Req',
  'BE_APIGateway', 
  // 'BE_Trigger' (非节点, 跳过)
  // 'BE_FSM' (非节点, 跳过)
  'BD_Receiving', 
  'BD_Verifying',
  'QRY3301', 
  'InternalEventBus', // 对应 'InternalCommandBus'
  'DA_RiskFsm', 
  'S1', 
  'S2', 
  'CMD3302_A', 
  'InternalEventBus', // 对应 'InternalCommandBus'
  'DA0_RiskEventAccessor', 
  'InternalEventBus', 
  'EVT3302_B',
  'S2', // 重复访问
  'CMD3302_C', 
  'InternalEventBus', // 对应 'InternalCommandBus'
  'DC_RiskCalculator', 
  'L_RiskRules', 
  'InternalEventBus', 
  'EVT3303', 
  'S3', 
  'CMD3304', 
  'InternalEventBus', // 对应 'InternalCommandBus'
  'DA0_RiskActionTransaction',
  'Repo_IF_RiskEvents', 
  'Repo_IMPL_RiskEvents',
  'DB_RiskEvents_MySQL', 
  'Repo_IF_UserFlags', 
  'Repo_IMPL_UserFlags',
  'DB_UserFlags_MySQL',
  'DB_Outbox', 
  'InternalEventBus', // 对应 'DA0_RiskActionTransaction' 的 'publish EVT3305_DONE'
  'EVT3305', 
  'S4', 
  'DOC3306', 
  'Adapter_EventBus', 
  // 'ExitPoint' (非节点, 跳过)
  'BD_Decision', 
  'BD_Creating', 
  'DSV_AuthService', 
  'DB_Auth', 
  'DB_Outbox', // 重复访问
  'HTTP_Res_OK',
  'FE_APIClient', // 重复访问
  // 'FE_APPFSM' (容器, 跳过)
  'FE_Decision', 
  'FE_State_Allowed',
  'E17', 
  // 'FE_L_WRITER' (非节点, 跳过)
  'FE_CACHE_L',
  'E18', 
  // 'FE_APPFSM' (容器, 跳过)
  'E04', // 重复访问
  'E07', // 重复访问
  'FE_TSDSV', // 重复访问
  'FE_CACHE_L', // 重复访问
  'FE_STORE_UI' // 重复访问
];

// 完整故障追踪路径 (在 DSV 内部失败)
const errorPath = [
  'FE_TRIGGER_UI', 
  'FE_TRIGGER_SLOT', 
  'E01', 
  'FE_State_Idle', 
  'FE_State_Requesting',
  'E04', 
  'FE_STORE_UF', 
  'E05', 
  'E07', 
  'FE_TSDSV', 
  'E20', 
  'FE_STORE_UI', 
  'E10',
  'FE_APIClient', 
  'HTTP_Action_Req', 
  'BE_APIGateway', 
  'BD_Receiving', 
  'BD_Verifying',
  'QRY3301', 
  'InternalEventBus', // 对应 'InternalCommandBus'
  'DA_RiskFsm', 
  'S1', 
  'S2', 
  'CMD3302_A', 
  'InternalEventBus', // 对应 'InternalCommandBus'
  'DA0_RiskEventAccessor', 
  'InternalEventBus', 
  'EVT3302_B', 
  'S2', // 重复访问
  'CMD3302_C', 
  'InternalEventBus', // 对应 'InternalCommandBus'
  'DC_RiskCalculator', 
  'L_RiskRules', 
  'InternalEventBus',
  'EVT3303', 
  'S3', 
  'CMD3304', 
  'InternalEventBus', // 对应 'InternalCommandBus'
  'DA0_RiskActionTransaction',
  // --- ★ 故障分支开始 ★ ---
  'InternalEventBus', // 对应 'DA0_RiskActionTransaction' 的 'publish FAIL3401_ERR'
  'FAIL3401',
  'SF',
  'Adapter_EventBus',
  // 'ExitPoint' (非节点, 跳过)
  'BD_Decision', 
  'BD_Failing',
  'DSV_AuthService',
  'DB_RiskEvents_MySQL', // 写入失败日志
  'HTTP_Res_Blocked',
  'FE_APIClient', // 重复访问
  // 'FE_APPFSM' (容器, 跳过)
  'FE_Decision',
  'FE_State_Blocked',
  'E04', // 重复访问
  'E07', // 重复访问
  'FE_TSDSV', // 重复访问
  'FE_STORE_UI' // 重复访问
];


export function usePanelOrchestrator() {
  const state = reactive({
    nodes: [] as UINode[],
    links: [] as LinkDef[],
    ready: false,
    sidePanelOpen: false,
    logs: [] as string[],
     
    // 当前步骤高亮
    activeNodeId: '' as string | null,
    errorNodeId: '' as string | null,
    activeEdge: '' as string | null,
    errorEdge: '' as string | null,

    // ★★★ [修改] 新增状态 (用于全局灰掉) ★★★
    isGlobalTraceActive: false,
    tracedNodeSet: new Set<string>(),
    tracedLinkSet: new Set<string>(),
    // ★★★ 修改结束 ★★★

    modals: { debugVisible: false },
  });

  const timer = ref<number | null>(null);

  function addLog(msg: string, type: 'info' | 'success' | 'error' | 'warn' = 'info') {
    const prefix = { info:'[INFO]',success:'[SUCCESS]',error:'[ERROR]',warn:'[WARN]' }[type];
    state.logs.push(`${prefix} ${msg}`);
    state.sidePanelOpen = true;
  }

  function makeEdgeId(from: string, to: string) {
    return `edge-${from}-to-${to}`;
  }

  const typeToNode: Record<string, string> = {
    'evt:PXC1_901_1': 'FE_TSDSV',
    'evt:PXC1_901_2': 'FE_State_Blocked',
    'evt:PXC1_901_3': 'FE_State_Blocked',
    'evt:PXC1_902_1': 'FE_STORE_UI',
    'evt:PXC1_902_2': 'FE_State_Blocked',
    'evt:PXC1_902_3': 'FE_State_Blocked',
    'EVT_1006_SUCCESS': 'BD_Decision',
    'EVT_1006_FAILURE': 'BD_Failing',
    'EVT_1006_TIMEOUT': 'BD_Failing',
    'CMD_1004_START_RECHARGE': 'BD_Receiving',
    'CMD_1005_CREATE_ORDER': 'BD_Creating',
    'CMD_1007_PAY_ORDER': 'BD_Creating',
    'CMD_1010_UPDATE_ASSET': 'BD_Creating',
    'EVT_1008_1': 'BE_FSM',
    'EVT_1008_2': 'BE_FSM',
    'EVT_1008_3': 'BE_FSM',
    'EVT_1009_1': 'BE_FSM',
    'EVT_1009_2': 'BE_FSM',
    'EVT_1009_3': 'BE_FSM',
    'EVT_1011_1': 'BE_FSM',
    'EVT_1011_2': 'BE_FSM',
    'EVT_1011_3': 'BE_FSM',
    'EVT_1012_1': 'BE_FSM',
    'EVT_1012_2': 'BE_FSM',
    'EVT_1012_3': 'BE_FSM',
    // DSV internal events & docs
    'QRY001_GetApplicationDataQry': 'QRY001_GetApplicationDataQry',
    'CMD001_ApplyForAcceptorCmd': 'CMD001_ApplyForAcceptorCmd',
    'CMD002_ValidateDepositCmd': 'CMD002_ValidateDepositCmd',
    'CMD003_GrantPermissionCmd': 'CMD003_GrantPermissionCmd',
    'EVT001_PermissionGrantedEvt': 'EVT001_PermissionGrantedEvt',
    'EVT002_PermissionGrantFailedEvt': 'EVT002_PermissionGrantFailedEvt',
    'DOC001_ApplicationDataSnapshotDoc': 'DOC001_ApplicationDataSnapshotDoc',
    'DOC002_ValidationResultDoc': 'DOC002_ValidationResultDoc',
    'DOC003_ApplicationApprovedDoc': 'DOC003_ApplicationApprovedDoc',
  };

  function setActive(nodeId: string, prevId?: string | null) {
    const prev = prevId || state.activeNodeId;
    state.activeNodeId = nodeId;
    state.errorNodeId = null;
    state.activeEdge = prev ? makeEdgeId(String(prev), nodeId) : null;
    state.errorEdge = null;
    state.isGlobalTraceActive = true;
    state.tracedNodeSet.add(nodeId);
    if (prev) state.tracedLinkSet.add(makeEdgeId(String(prev), nodeId));
    try { document.getElementById('app')?.classList.add('is-tracing'); } catch (e) {}
  }

  function applyEvent(e: { type: string; payload: any }) {
    const candidates = [
      e?.payload?.nodeId,
      e?.payload?.class,
      e?.payload?.component,
      e?.payload?.location,
      typeToNode[e.type],
      e?.payload?.eventKey ? typeToNode[e.payload.eventKey] : undefined,
      e?.payload?.status === 'RECHARGE_SUCCESS' ? 'FE_STORE_UI' : undefined,
      e?.payload?.status === 'SUCCESS' ? 'FE_TSDSV' : undefined,
      e?.payload?.status === 'FAILURE' ? 'FE_State_Blocked' : undefined,
    ];
    const node = candidates.find((id) => id && state.nodes.some((n) => n.id === id));
    const prevId = e?.payload?.prevId && state.nodes.some((n) => n.id === e.payload.prevId) ? String(e.payload.prevId) : null;
    if (node) {
      setActive(String(node), prevId);
      addLog(`事件 ${e.type} -> ${node}`, 'info');
    } else {
      addLog(`事件未映射 ${e.type}`, 'warn');
    }
  }

  function applyNormalizedEvent(n: any) {
    if (!n) return;
    if (n.kind === 'payment') {
      setActive('FE_TSDSV');
      addLog(`支付:${n.status}:${n.orderId}`, n.status === 'SUCCESS' ? 'success' : n.status === 'FAILURE' ? 'error' : 'warn');
    } else if (n.kind === 'asset') {
      setActive(n.status === 'RECHARGE_SUCCESS' ? 'FE_STORE_UI' : 'FE_State_Blocked');
      addLog(`资产:${n.status}:${n.orderId}`, n.status === 'RECHARGE_SUCCESS' ? 'success' : n.status === 'FAILURE' ? 'error' : 'warn');
    }
  }

  function clearTrace() {
    state.activeNodeId = null;
    state.errorNodeId = null;
    state.activeEdge = null;
    state.errorEdge = null;
    if (timer.value) { clearInterval(timer.value); timer.value = null; }

    // ★★★ [修改] 清除全局追踪状态 ★★★
    state.isGlobalTraceActive = false;
    state.tracedNodeSet.clear();
    state.tracedLinkSet.clear();
    // 移除 CSS Class
    try {
      document.getElementById('app')?.classList.remove('is-tracing');
    } catch (e) {}
    // ★★★ 修改结束 ★★★
  }

  function loadDemoModule() {
    addLog('请使用“选择模块”加载 .mmd 文件。', 'warn');
  }
  
  // ... (toId, toLabel 函数保持不变) ...
    // —— 工具：规范化 id（内部使用），抽 label（展示用） ——
  const toId = (raw: string) =>
    raw
      .replace(/["'\[\]\(\)]/g, '')   
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_')           // 空格→下划线
      .replace(/[^\w\-]/g, '');       // 仅保留字母数字_-

  const toLabel = (raw: string) => {
    // 支持 A["前端 API"] / A[前端 API] / "前端 API" / (前端 API)
    const m = raw.match(/["\[]\s*(.*?)\s*["\]]/);
    if (m && m[1]) return m[1].trim();
    const n = raw.match(/^\s*"?\(?\s*(.*?)\s*\)?"?\s*$/);
    return (n?.[1] || raw).trim();
  };

  // [修改] loadModule 函数已更新
  function loadModule(mermaidText: string) {
    try {
      // 加载开始时，先重置 ready 状态和追踪状态
      state.ready = false;
      clearTrace(); // <-- [修改]
      
      console.log('[panelOrchestrator] loadModule 开始，重置 ready = false');
      
      const text = (mermaidText || '').replace(/\r\n/g, '\n');

      if (!/^\s*(graph|flowchart)\s+/im.test(text)) {
        addLog('未检测到合法的 Mermaid 图(缺少 "graph" 或 "flowchart" 开头)；尝试宽松解析。', 'warn');
      }

      // 1. 首先解析所有节点定义（使用映射表）
      console.log('[panelOrchestrator] 开始解析节点...');
      const parsedNodes = parseMmdNodes(text);
      console.log(`[panelOrchestrator] parseMmdNodes 返回 ${parsedNodes.length} 个节点`);
      
      const parsedNodesMap = new Map<string, ParsedNode>();
      parsedNodes.forEach(node => {
        parsedNodesMap.set(node.id, node);
        // 同时建立小写ID的映射（用于连线解析时的匹配）
        parsedNodesMap.set(node.id.toLowerCase(), node);
      });

      addLog(`从节点定义中解析到 ${parsedNodes.length} 个节点`, 'info');
      if (parsedNodes.length > 0) {
        const sampleNodes = parsedNodes.slice(0, 5).map(n => `${n.id}(${n.type || 'no-type'})`).join(', ');
        addLog(`示例节点: ${sampleNodes}${parsedNodes.length > 5 ? '...' : ''}`, 'info');
        
        // 检查示例节点的parentComponentId
        const sampleWithParent = parsedNodes.find(n => n.parentComponentId);
        if (sampleWithParent) {
          addLog(`示例节点映射: ${sampleWithParent.id} -> parentComponentId: ${sampleWithParent.parentComponentId}`, 'info');
        }
      }

      const nodesMap = new Map<string, UINode>();
      const links: LinkDef[] = [];

      // 映射样式类名到节点类型（用于没有映射表的节点）
      const styleClassToType: Record<string, NodeType> = {
         'trigger': 'trigger',
        'festate': 'festate',
        'endstate': 'endstate',
        'blockstate': 'blockstate',
        'fsmbrain': 'fsmbrain',
        'feinfra': 'feinfra',
        'ufstore': 'ufstore',
        'uistore': 'uistore',
         'cache': 'cache',
        'appevent': 'appevent',
         'httpevent': 'httpevent',
        'fsm_state': 'fsm_state',
        'da_orchestrator': 'da_orchestrator',
        'dsv': 'dsv',
          'db_component': 'db_component',
         'bus': 'bus',
         'fail_event': 'fail_event',
        'maintaskevent': 'fail_event',
        'beinfra': 'feinfra',
        'event_node': 'appevent',
        'doc_node': 'appevent',
        'repo_iface': 'db_component',
        'repo_impl': 'db_component',
        'dat_component': 'db_component',
        'adapter_component': 'feinfra',
        'l_component': 'feinfra',
        'dc_component': 'feinfra',
        'da0_component': 'db_component',
        'fedecision': 'festate',
       };

      // 解析连线：A --> B / A---B / A-.->B /
      // 参考源代码，支持多种连线格式
      const edgePatterns = [
        /^\s*([A-Za-z0-9_]+)\s*-->\s*([A-Za-z0-9_]+)\s*$/,  // A --> B
        /^\s*([A-Za-z0-9_]+)\s*--\s*"[^"]*"\s*-->\s*([A-Za-z0-9_]+)\s*$/,  // A --
        /^\s*([A-Za-z0-9_]+)\s*--\s*"[^"]*"\s*-->\s*([A-Za-z0-9_]+)\s*--\s*"[^"]*"\s*-->\s*([A-Za-z0-9_]+)/,  // 链式连线
        /^\s*([A-Za-z0-9_]+)\s*---\s*([A-Za-z0-9_]+)\s*$/,  // A --- B
        /^\s*([A-Za-z0-9_]+)\s*-\\.->\s*([A-Za-z0-9_]+)\s*$/,  // A -.-> B
      ];

      
      const parseToken = (raw: string) => {
        // 提取节点ID（去除引号和标签）
        const baseMatch = raw.match(/^[A-Za-z0-9_]+/);
        const base = baseMatch?.[0];
        const label = toLabel(raw);
         // 尝试匹配原始ID（保持大小写）
        const originalId = base || label;
        const normalizedId = toId(originalId);
         return {
          id: originalId, // 保持原始ID
          normalizedId, // 规范化ID（小写）
          label,
         };
      };

      // 将解析出的节点添加到nodesMap
       parsedNodes.forEach(parsedNode => {
         const normalizedId = toId(parsedNode.id);
        if (!nodesMap.has(normalizedId) && !nodesMap.has(parsedNode.id)) {
          const nodeData: UINode = {
            id: parsedNode.id, // 保持原始ID
            text: parsedNode.label,
            type: (parsedNode.type as NodeType) || 'festate',
            pos: { top: '50%', left: '50%' },
          };
          
           // 添加样式（优先使用cssStyle，如果没有则使用style）
           // 确保所有节点都有样式，即使 cssStyle 是空字符串也要应用默认样式
          const nodeStyle = parsedNode.cssStyle || 'border-radius: 8px';
          (nodeData as any).style = nodeStyle;
          (nodeData as any).cssStyle = nodeStyle;
          
          // 添加父组件和组件ID
           if (parsedNode.parentComponentId) {
             (nodeData as any).parentComponentId = parsedNode.parentComponentId;
          }
          if (parsedNode.componentId) {
            (nodeData as any).componentId = parsedNode.componentId;
          }
          
          nodesMap.set(parsedNode.id, nodeData);
          
          // 调试：输出前几个节点的样式信息，以及 BE_APIGateway 节点
           if (nodesMap.size <= 3 || parsedNode.id === 'BE_APIGateway') {
            console.log(`[panelOrchestrator] 添加节点 ${parsedNode.id}:`, {
               text: parsedNode.label,
              cssStyle: parsedNode.cssStyle,
              parentComponentId: parsedNode.parentComponentId,
               componentId: parsedNode.componentId,
                type: parsedNode.type
            });
          }
        }
      });

      // 2. 解析连线（从连线中可能发现新的节点）
       // 参考源代码，支持链式连线（A --> B --> C）
      text.split('\n').forEach(rawLine => {
        const line = rawLine.trim();
        if (!line || !line.includes('->')) return;
        if (line.startsWith('%')) return; // 跳过注释行

          // 处理链式连线：A --> B --> C --> D 或 A -- "label" --> B -- "label2" --> C
        // 使用更可靠的方法：按箭头分割，然后提取每段中的节点ID
         const nodeIds: string[] = [];
      
         // 先提取所有箭头前的节点ID（包括带标签的情况）
        // 匹配：节点ID，后面跟着可选的 -- "label" --> 或直接 -->
        const beforeArrowPattern = /([A-Za-z0-9_]+)(?:\s*--\s*"[^"]*"\s*)?\s*(?:-->|--|---|-\.->)/g;
         let match;
         while ((match = beforeArrowPattern.exec(line)) !== null) {
          if (match[1] && !nodeIds.includes(match[1])) {
             nodeIds.push(match[1]);
           }
         }
           
        // 提取最后一个节点ID（在最后一个箭头之后）
        // 使用更简单的方法：找到最后一个箭头后的所有内容
         const arrowPatterns = ['-->', '---', '-.->'];
        let lastArrowIndex = -1;
         let lastArrowPattern = '';
        for (const pattern of arrowPatterns) {
           const index = line.lastIndexOf(pattern);
          if (index > lastArrowIndex) {
            lastArrowIndex = index;
            lastArrowPattern = pattern;
          }
        }
        
         if (lastArrowIndex >= 0) {
          const afterLastArrow = line.substring(lastArrowIndex + lastArrowPattern.length).trim();
          // 移除可能的标签（-- "label"）
           const cleaned = afterLastArrow.replace(/--\s*"[^"]*"\s*/, '').trim();
           const lastNodeMatch = cleaned.match(/^([A-Za-z0-9_]+)/);
          if (lastNodeMatch && lastNodeMatch[1] && !nodeIds.includes(lastNodeMatch[1])) {
             nodeIds.push(lastNodeMatch[1]);
          }
         }
        
        // 如果上面的方法没有提取到足够的节点，尝试更简单的方法：直接按箭头分割
        if (nodeIds.length < 2) {
           // 移除所有标签，只保留节点ID和箭头
          const cleanedLine = line.replace(/--\s*"[^"]*"\s*/g, '--');
          // 按箭头分割
          const parts = cleanedLine.split(/(?:-->|--|---|-\.->)/);
          nodeIds.length = 0; // 清空之前的结果
           parts.forEach(part => {
            const nodeMatch = part.trim().match(/^([A-Za-z0-9_]+)/);
            if (nodeMatch && nodeMatch[1] && !nodeIds.includes(nodeMatch[1])) {
                 nodeIds.push(nodeMatch[1]);
            }
          });
        }
        
        // 调试：输出提取的节点ID
         if (nodeIds.length > 2) {
          console.log(`[panelOrchestrator] 链式连线解析: ${line.substring(0, 80)}... -> 节点: [${nodeIds.join(', ')}]`);
        }

        // 将链式连线转换为多个单独的连线
        for (let i = 0; i < nodeIds.length - 1; i++) {
           const fromId = nodeIds[i];
          const targetId = nodeIds[i + 1];
          
          if (!fromId || !targetId) continue;

          const L = { id: fromId, normalizedId: toId(fromId), label: fromId };
          const R = { id: targetId, normalizedId: toId(targetId), label: targetId };

          // 尝试从映射表中查找节点
           const leftNode = parsedNodesMap.get(L.id) || parsedNodesMap.get(L.normalizedId);
          const rightNode = parsedNodesMap.get(R.id) || parsedNodesMap.get(R.normalizedId);

          // 如果找到了映射的节点，使用映射信息；否则创建新节点
          if (leftNode && !nodesMap.has(leftNode.id)) {
             const leftNodeStyle = leftNode.cssStyle || 'border-radius: 8px';
            const leftNodeData: UINode = {
                id: leftNode.id,
               text: leftNode.label,
               type: (leftNode.type as NodeType) || 'festate',
               pos: { top: '50%', left: '50%' },
             };
            (leftNodeData as any).style = leftNodeStyle;
            (leftNodeData as any).cssStyle = leftNodeStyle;
            if (leftNode.parentComponentId) {
               (leftNodeData as any).parentComponentId = leftNode.parentComponentId;
            }
             if (leftNode.componentId) {
               (leftNodeData as any).componentId = leftNode.componentId;
            }
             nodesMap.set(leftNode.id, leftNodeData);
} else if (!leftNode && L.id && !nodesMap.has(L.id) && !nodesMap.has(L.normalizedId)) {
             // 跳过容器节点（如 FE_APPFSM），它们不应该作为普通节点显示
            if (L.id === 'FE_APPFSM' || L.id.toUpperCase() === 'FE_APPFSM') {
               // FE_APPFSM 是容器标题，不创建为节点，但连线仍然会被创建
             } else {
              // 后备方案：根据label推断类型
               let type: NodeType = 'festate';
              if (/(fail|错误|异常|超时)/i.test(L.label)) type = 'fail_event';
              else if (/^https?\b|\bpost\b|\bget\b/i.test(L.label)) type = 'httpevent';
              else if (/event|事件中心/i.test(L.label)) type = 'bus';
              else if (/api|网关|gateway|client|nginx|kong/i.test(L.label)) type = 'feinfra';
              else if (/^evt[:：]/i.test(L.label)) type = 'trigger';
              
              const fallbackLeftNode: UINode = {
                 id: L.id,
                 text: L.label,
                 type,
                 pos: { top: '50%', left: '50%' },
              };
              (fallbackLeftNode as any).style = 'border-radius: 8px';
              (fallbackLeftNode as any).cssStyle = 'border-radius: 8px';
              nodesMap.set(L.id, fallbackLeftNode);
            }
          }
             if (rightNode && !nodesMap.has(rightNode.id)) {
			const rightNodeStyle = rightNode.cssStyle || 'border-radius: 8px';
            const rightNodeData: UINode = {
                id: rightNode.id,
               text: rightNode.label,
               type: (rightNode.type as NodeType) || 'festate',
                pos: { top: '50%', left: '50%' },
            };
            (rightNodeData as any).style = rightNodeStyle;
            (rightNodeData as any).cssStyle = rightNodeStyle;
            if (rightNode.parentComponentId) {
               (rightNodeData as any).parentComponentId = rightNode.parentComponentId;
            }
             if (rightNode.componentId) {
              (rightNodeData as any).componentId = rightNode.componentId;
            }
             nodesMap.set(rightNode.id, rightNodeData);
          } else if (!rightNode && R.id && !nodesMap.has(R.id) && !nodesMap.has(R.normalizedId)) {
             // 跳过容器节点（如 FE_APPFSM），它们不应该作为普通节点显示
            if (R.id === 'FE_APPFSM' || R.id.toUpperCase() === 'FE_APPFSM') {
                 // FE_APPFSM 是容器标题，不创建为节点，但连线仍然会被创建
            } else {
              // 后备方案
               let type: NodeType = 'festate';
if (/(fail|错误|异常|超时)/i.test(R.label)) type = 'fail_event';
              else if (/^https?\b|\bpost\b|\bget\b/i.test(R.label)) type = 'httpevent';
              else if (/event|事件中心/i.test(R.label)) type = 'bus';
              else if (/api|网关|gateway|client|nginx|kong/i.test(R.label)) type = 'feinfra';
              else if (/^evt[:：]/i.test(R.label)) type = 'trigger';
              
              const fallbackRightNode: UINode = {
                id: R.id,
                 text: R.label,
                 type,
                 pos: { top: '50%', left: '50%' },
              };
              (fallbackRightNode as any).style = 'border-radius: 8px';
              (fallbackRightNode as any).cssStyle = 'border-radius: 8px';
              nodesMap.set(R.id, fallbackRightNode);
            }
          }

           // 添加连线（使用原始ID）
           if (L.id && R.id) {
             links.push({ from: L.id, to: R.id });
          }
         }
      });

      addLog(`总共解析到 ${nodesMap.size} 个节点，${links.length} 条连线`, 'info');
if (nodesMap.size === 0) {
        addLog('警告：未解析到任何节点，尝试检查文件格式', 'warn');
        const lines = text.split('\n').slice(0, 20);
        addLog(`文件前20行示例:\n${lines.join('\n')}`, 'info');
        throw new Error('未从 Mermaid 文本中解析到任何节点。');
      }

      // 验证节点是否包含parentComponentId
       const nodesWithParent = Array.from(nodesMap.values()).filter(n => (n as any).parentComponentId);
      addLog(`验证: ${nodesWithParent.length}/${nodesMap.size} 个节点包含parentComponentId`, 'info');
      if (nodesWithParent.length > 0) {
        const sample = nodesWithParent[0];
        addLog(`示例节点: ${sample.id} -> parentComponentId: ${(sample as any).parentComponentId}`, 'info');
      } else {
        addLog('警告：没有节点包含parentComponentId，检查nodeMapping.json是否正确生成', 'warn');
      }
      
      // 特别检查 BE_APIGateway 节点
       const beGatewayNode = nodesMap.get('BE_APIGateway');
      if (beGatewayNode) {
        console.log(`[panelOrchestrator] BE_APIGateway 节点信息:`, {
          id: beGatewayNode.id,
           text: beGatewayNode.text,
           type: beGatewayNode.type,
          parentComponentId: (beGatewayNode as any).parentComponentId,
           componentId: (beGatewayNode as any).componentId
         });
      } else {
         console.warn(`[panelOrchestrator] 警告: 未找到 BE_APIGateway 节点`);
      }

      // 按父组件分组节点
      const grouped = groupNodesByParentComponent(parsedNodes);
      const parentComponentIds = Object.keys(grouped).filter(id => id !== 'default');
      if (parentComponentIds.length > 0) {
        addLog(`节点已映射到 ${parentComponentIds.length} 个父组件: ${parentComponentIds.join(', ')}`, 'info');
      }

      // —— 简单环形布局（保持你原先的思路） ——
      const ids = Array.from(nodesMap.keys());
      const n = ids.length;
      const nodes: UINode[] = ids.map((id, i) => {
         const angle = (i / Math.max(1, n)) * Math.PI * 2;
        const rTop = 30 + 20 * Math.sin(angle);   // 10%~50% 之间摆放
         const rLeft = 30 + 40 * Math.cos(angle);  // -10%~70% 之间摆放
         const node = nodesMap.get(id)!;
        node.pos = {
           top: `${Math.max(8, Math.min(85, rTop))}%`,
          left: `${Math.max(5, Math.min(90, rLeft))}%`,
        };
        return node;
      });

      // —— 应用到界面 ——
       // [修改] clearTrace() 已在函数开头调用
      state.nodes.splice(0, state.nodes.length, ...nodes);
      state.links.splice(0, state.links.length, ...links);
      state.ready = true;
      
      console.log(`[panelOrchestrator] 更新后 state.nodes.length = ${state.nodes.length}`);
      console.log(`[panelOrchestrator] 更新后 state.ready = ${state.ready}`);
      console.log(`[panelOrchestrator] 更新后 state.nodes[0] =`, state.nodes[0] ? {
        id: state.nodes[0].id,
          text: state.nodes[0].text,
         parentComponentId: (state.nodes[0] as any).parentComponentId,
        style: (state.nodes[0] as any).style
      } : null);

      addLog(`成功解析 Mermaid：节点 ${nodes.length} 个，连线 ${links.length} 条。`, 'success');
      console.log(`[panelOrchestrator] 成功设置 state.nodes = ${nodes.length} 个节点`);
      console.log(`[panelOrchestrator] 节点示例:`, nodes.slice(0, 3).map(n => ({ id: n.id, parentComponentId: (n as any).parentComponentId })));
      nextTick(() => window.dispatchEvent(new Event('resize')));
    } catch (e: any) {
      console.error('[panelOrchestrator] loadModule 错误:', e);
      console.error('[panelOrchestrator] 错误堆栈:', e?.stack);
      addLog(`Mermaid 解析失败：${e?.message || e}`, 'error');
      if (e?.stack) {
        addLog(`错误堆栈: ${e.stack}`, 'error');
      }
      throw e;
    }
  }

  // [修改] startTrace 函数已更新
  async function startTrace(kind: 'success' | 'error') {
    if (!state.ready) { addLog('请先加载模块。', 'warn'); return; }
    clearTrace();
    
    let seq: string[]; // 路径序列

    // ★★★ 核心修改点 ★★★
    if (kind === 'success') {
      // --- 对于“成功”追踪，我们调用后端 API ---
      addLog(`--- 正在从后端请求“成功”追踪路径... ---`, 'info');
      try {
        // [新增] 调用 API
        seq = await fetchSuccessTracePath();
        addLog(`--- 成功获取路径，共 ${seq.length} 步 ---`, 'success');
      } catch (e: any) {
        // [新增] API 失败处理
        addLog(`--- 获取“成功”路径失败: ${e.message || '未知错误'} ---`, 'error');
        // [新增] API 失败时，回退到本地 hardcode 的 successPath
        addLog(`--- [回退] 启用本地模拟“成功”路径 ---`, 'warn');
        seq = successPath;
        if (seq.length === 0) {
           addLog('本地回退路径(successPath)也为空。', 'error');
           clearTrace(); // 清理状态
           return; // 终止执行
        }
      }
    } else {
      // --- 对于“故障”追踪，我们保留本地模拟 ---
      seq = errorPath;
      // (原始日志在下面统一添加)
    }
    // ★★★ 修改结束 ★★★
    
    if (seq.length === 0) {
      addLog('未找到追踪路径', 'warn');
      return;
    }

    // ★★★ [修改] 设置全局追踪状态 ★★★
    state.isGlobalTraceActive = true; 
    state.tracedNodeSet = new Set(seq); 
    state.tracedLinkSet.clear(); 
    for (let i = 1; i < seq.length; i++) { 
      state.tracedLinkSet.add(makeEdgeId(seq[i-1], seq[i])); 
    }
    // 添加 CSS Class
    try {
      document.getElementById('app')?.classList.add('is-tracing');
    } catch (e) {}
    // ★★★ 修改结束 ★★★
    
    
    addLog(`--- 开始 ${kind === 'success' ? '成功' : '故障'} 追踪，路径: ${seq.join(' -> ')} ---`, kind === 'success' ? 'success' : 'error'); 
    
    let step = 0;
    timer.value = window.setInterval(() => {
      if (step >= seq.length) {
          addLog(`--- 追踪${kind === 'success' ? '成功完成' : '失败'} ---`, kind === 'success' ? 'success' : 'error');
        if (kind === 'error') state.modals.debugVisible = true;
        
        // ★★★ [修改] 追踪结束时不再调用 clearTrace() ★★★
        clearInterval(timer.value!);
        timer.value = null;
        return;
      }
      const nodeId = seq[step];
      const prevId = step > 0 ? seq[step-1] : null;

      state.activeNodeId = nodeId;
       
      const currentNode = state.nodes.find(n => n.id === nodeId);
      state.errorNodeId = (kind === 'error' && currentNode && (currentNode.type === 'fail_event' || nodeId.toUpperCase().includes('FAIL') || nodeId.toUpperCase().includes('ERROR'))) ? nodeId : null;
      
      state.activeEdge = prevId ? makeEdgeId(prevId, nodeId) : null;
      state.errorEdge = (kind === 'error' && state.errorNodeId && prevId) ? makeEdgeId(prevId, nodeId) : null;

      step++; 
    }, 1200); 
  }

  function traceById(_id: string) {
    // [修改] 确保 'id' 追踪也设置全局状态
    // (当前 'id' 追踪只是 'error' 的别名, 所以 'startTrace' 会处理)
    startTrace('error');
  }

  return {
    state,
     get nodes() { return state.nodes; },
    get links() { return state.links; },
    get ready() { return state.ready; },
    get sidePanelOpen() { return state.sidePanelOpen; },
    get logs() { return state.logs; },
    get activeNodeId() { return state.activeNodeId; },
    get errorNodeId() { return state.errorNodeId; },
    get activeEdge() { return state.activeEdge; },
    get errorEdge() { return state.errorEdge; },
    
    // ★★★ [修改] 暴露新状态 ★★★
    get isGlobalTraceActive() { return state.isGlobalTraceActive; },
    get tracedNodeSet() { return state.tracedNodeSet; },
    get tracedLinkSet() { return state.tracedLinkSet; },
    // ★★★ 修改结束 ★★★

    get modals() { return state.modals; },
    addLog, loadDemoModule, loadModule, startTrace, traceById, applyEvent, applyNormalizedEvent,
  };
}
