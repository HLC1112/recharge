// 文件：U8_config/panelOrchestrator.ts
import { reactive, ref, nextTick } from 'vue';
import { parseMmdNodes, groupNodesByParentComponent, type ParsedNode } from './mmdParser';

type NodeType =
  | 'trigger' | 'festate' | 'endstate' | 'blockstate'
  | 'fsmbrain' | 'feinfra' | 'ufstore' | 'uistore'
  | 'cache' | 'appevent' | 'httpevent' | 'fsm_state'
  | 'da_orchestrator' | 'dsv' | 'db_component' | 'bus' | 'fail_event';

interface UINode {
  id: string;
  text: string;
  type: NodeType;
  pos: { top: string; left: string; };
  style?: string; // CSS内联样式
  parentComponentId?: string; // 父容器组件ID
  componentId?: string; // 组件ID
}

interface LinkDef { from: string; to: string; }

// === 你现有的 demo 数据（保持不变） ===
const demoNodes: UINode[] = [
  { id: 'P_1_E_89', text: 'EVT:REG_CLICK', type: 'trigger', pos: { top: '20%', left: '12%' } },
  { id: 'FE_EventCenter', text: '前端事件中心', type: 'bus', pos: { top: '35%', left: '20%' } },
  { id: 'P_1_E_90', text: 's_0: 空闲', type: 'festate', pos: { top: '35%', left: '38%' } },
  { id: 'P_1_E_91', text: 's_1: 注册中', type: 'festate', pos: { top: '35%', left: '56%' } },
  { id: 'P_1_E_94', text: 'APIClient\ncallRegister(.)', type: 'feinfra', pos: { top: '35%', left: '74%' } },
  { id: 'P_1_E_100', text: 'HTTPS POST /register', type: 'httpevent', pos: { top: '60%', left: '30%' } },
  { id: 'P_1_E_101', text: 'API网关\n(Kong/Nginx)', type: 'feinfra', pos: { top: '60%', left: '55%' } },
  { id: 'P_1_E_107', text: 'QRY3301_REQ', type: 'appevent', pos: { top: '60%', left: '80%' } },
  { id: 'P_1_E_108', text: 'FAIL3401_ERR\n(超时)', type: 'fail_event', pos: { top: '78%', left: '68%' } },
];

const successPath = ['P_1_E_89','FE_EventCenter','P_1_E_90','P_1_E_91','P_1_E_94','P_1_E_100','P_1_E_101','P_1_E_107'];
const errorPath   = ['P_1_E_89','FE_EventCenter','P_1_E_90','P_1_E_91','P_1_E_94','P_1_E_100','P_1_E_101','P_1_E_108'];

const demoLinks: LinkDef[] = [
  { from: 'P_1_E_89', to: 'FE_EventCenter' },
  { from: 'FE_EventCenter', to: 'P_1_E_90' },
  { from: 'P_1_E_90', to: 'P_1_E_91' },
  { from: 'P_1_E_91', to: 'P_1_E_94' },
  { from: 'P_1_E_94', to: 'P_1_E_100' },
  { from: 'P_1_E_100', to: 'P_1_E_101' },
  { from: 'P_1_E_101', to: 'P_1_E_107' },
  { from: 'P_1_E_101', to: 'P_1_E_108' },
];

export function usePanelOrchestrator() {
  const state = reactive({
    nodes: [] as UINode[],
    links: [] as LinkDef[],
    ready: false,

    sidePanelOpen: false,
    logs: [] as string[],

    activeNodeId: '' as string | null,
    errorNodeId: '' as string | null,
    activeEdge: '' as string | null,
    errorEdge: '' as string | null,

    modals: { debugVisible: false },
  });

  const timer = ref<number | null>(null);

  function addLog(msg: string, type: 'info' | 'success' | 'error' | 'warn' = 'info') {
    const prefix = { info:'[INFO]',success:'[SUCCESS]',error:'[ERROR]',warn:'[WARN]' }[type];
    state.logs.push(`${prefix} ${msg}`);
    state.sidePanelOpen = true;
  }

  function clearTrace() {
    state.activeNodeId = null;
    state.errorNodeId = null;
    state.activeEdge = null;
    state.errorEdge = null;
    if (timer.value) { clearInterval(timer.value); timer.value = null; }
  }

  function loadDemoModule() {
    state.nodes = demoNodes;
    state.links = demoLinks;
    state.ready = true;
    addLog('模块加载完毕，节点与连线已就绪。', 'success');
    nextTick(() => window.dispatchEvent(new Event('resize')));
  }

  function makeEdgeId(from: string, to: string) {
    return `edge-${from}-to-${to}`;
  }

  // —— 工具：规范化 id（内部使用），抽 label（展示用） ——
  const toId = (raw: string) =>
    raw
      .replace(/["'\[\]\(\)]/g, '')   // 去括号/引号
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

  // ⭐ 解析 Mermaid（graph TD/LR；A-->B / A---B / A-.->B 等），生成 nodes/links 并重绘
  function loadModule(mermaidText: string) {
    try {
      // 加载开始时，先重置 ready 状态，确保按钮在加载过程中保持禁用
      state.ready = false;
      console.log('[panelOrchestrator] loadModule 开始，重置 ready = false');
      
      const text = (mermaidText || '').replace(/\r\n/g, '\n');

      // 允许没有显式 graph 行，但有的话给个提示
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
      };

      // 解析连线：A --> B / A---B / A-.->B / A -- "label" --> B
      // 参考源代码，支持多种连线格式
      const edgePatterns = [
        /^\s*([A-Za-z0-9_]+)\s*-->\s*([A-Za-z0-9_]+)\s*$/,  // A --> B
        /^\s*([A-Za-z0-9_]+)\s*--\s*"[^"]*"\s*-->\s*([A-Za-z0-9_]+)\s*$/,  // A -- "label" --> B
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
          if (parsedNode.cssStyle) {
            (nodeData as any).style = parsedNode.cssStyle;
            (nodeData as any).cssStyle = parsedNode.cssStyle;
          }
          
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
        // 使用正则表达式提取所有节点ID（忽略引号中的标签）
        const nodeIdPattern = /([A-Za-z0-9_]+)(?:\s*--\s*"[^"]*"\s*)?\s*(?:-->|--|---|-\.->)/g;
        const nodeIds: string[] = [];
        let match;
        
        // 提取所有起始节点ID
        while ((match = nodeIdPattern.exec(line)) !== null) {
          nodeIds.push(match[1]);
        }
        
        // 提取最后一个节点ID（在最后一个箭头之后）
        const lastMatch = line.match(/(?:-->|--|---|-\.->)\s*(?:--\s*"[^"]*"\s*)?\s*([A-Za-z0-9_]+)(?:\s*$|\s*--)/);
        if (lastMatch) {
          nodeIds.push(lastMatch[1]);
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
            nodesMap.set(leftNode.id, {
              id: leftNode.id,
              text: leftNode.label,
              type: (leftNode.type as NodeType) || 'festate',
              pos: { top: '50%', left: '50%' },
              ...(leftNode.cssStyle && { style: leftNode.cssStyle }),
              ...(leftNode.parentComponentId && { parentComponentId: leftNode.parentComponentId }),
              ...(leftNode.componentId && { componentId: leftNode.componentId }),
            });
          } else if (!leftNode && L.id && !nodesMap.has(L.id) && !nodesMap.has(L.normalizedId)) {
            // 后备方案：根据label推断类型
            let type: NodeType = 'festate';
            if (/(fail|错误|异常|超时)/i.test(L.label)) type = 'fail_event';
            else if (/^https?\b|\bpost\b|\bget\b/i.test(L.label)) type = 'httpevent';
            else if (/event|事件中心/i.test(L.label)) type = 'bus';
            else if (/api|网关|gateway|client|nginx|kong/i.test(L.label)) type = 'feinfra';
            else if (/^evt[:：]/i.test(L.label)) type = 'trigger';
            
            nodesMap.set(L.id, {
              id: L.id,
              text: L.label,
              type,
              pos: { top: '50%', left: '50%' },
            });
          }

          if (rightNode && !nodesMap.has(rightNode.id)) {
            nodesMap.set(rightNode.id, {
              id: rightNode.id,
              text: rightNode.label,
              type: (rightNode.type as NodeType) || 'festate',
              pos: { top: '50%', left: '50%' },
              ...(rightNode.cssStyle && { style: rightNode.cssStyle }),
              ...(rightNode.parentComponentId && { parentComponentId: rightNode.parentComponentId }),
              ...(rightNode.componentId && { componentId: rightNode.componentId }),
            });
          } else if (!rightNode && R.id && !nodesMap.has(R.id) && !nodesMap.has(R.normalizedId)) {
            // 后备方案
            let type: NodeType = 'festate';
            if (/(fail|错误|异常|超时)/i.test(R.label)) type = 'fail_event';
            else if (/^https?\b|\bpost\b|\bget\b/i.test(R.label)) type = 'httpevent';
            else if (/event|事件中心/i.test(R.label)) type = 'bus';
            else if (/api|网关|gateway|client|nginx|kong/i.test(R.label)) type = 'feinfra';
            else if (/^evt[:：]/i.test(R.label)) type = 'trigger';
            
            nodesMap.set(R.id, {
              id: R.id,
              text: R.label,
              type,
              pos: { top: '50%', left: '50%' },
            });
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
      clearTrace();
      // 使用 splice 确保 Vue 响应式更新
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

  function startTrace(kind: 'success' | 'error') {
    if (!state.ready) { addLog('请先加载模块。', 'warn'); return; }
    clearTrace();
    
    // 根据实际解析出的节点和连线动态生成追踪路径
    // 从第一个节点开始，沿着连线找到一条路径
    const nodeIds = state.nodes.map(n => n.id);
    const linkMap = new Map<string, string[]>(); // from -> [to1, to2, ...]
    
    state.links.forEach(link => {
      if (!linkMap.has(link.from)) {
        linkMap.set(link.from, []);
      }
      linkMap.get(link.from)!.push(link.to);
    });
    
    // 找到起始节点（通常是 trigger 类型或第一个节点）
    let startNode = nodeIds.find(id => {
      const node = state.nodes.find(n => n.id === id);
      return node?.type === 'trigger' || id.toUpperCase().includes('TRIGGER');
    }) || nodeIds[0];
    
    if (!startNode) {
      addLog('未找到起始节点，无法开始追踪', 'warn');
      return;
    }
    
    // 构建追踪路径（沿着连线找到一条路径，最多10个节点）
    const seq: string[] = [startNode];
    let current = startNode;
    let maxSteps = 10;
    
    while (maxSteps > 0 && linkMap.has(current)) {
      const targets = linkMap.get(current)!;
      if (targets.length === 0) break;
      
      // 优先选择成功路径（非 fail_event 类型），如果是错误追踪则选择 fail_event
      let next: string | null = null;
      if (kind === 'error') {
        next = targets.find(t => {
          const node = state.nodes.find(n => n.id === t);
          return node?.type === 'fail_event' || t.toUpperCase().includes('FAIL') || t.toUpperCase().includes('ERROR');
        }) || targets[0];
      } else {
        next = targets.find(t => {
          const node = state.nodes.find(n => n.id === t);
          return node?.type !== 'fail_event' && !t.toUpperCase().includes('FAIL') && !t.toUpperCase().includes('ERROR');
        }) || targets[0];
      }
      
      if (next && !seq.includes(next)) {
        seq.push(next);
        current = next;
      } else {
        break;
      }
      maxSteps--;
    }
    
    if (seq.length === 0) {
      addLog('无法生成追踪路径', 'warn');
      return;
    }
    
    addLog(`--- 开始 ${kind === 'success' ? '成功' : '故障'} 追踪，路径: ${seq.join(' -> ')} ---`, kind === 'success' ? 'success' : 'error');
    
    let step = 0;
    timer.value = window.setInterval(() => {
      if (step >= seq.length) {
        addLog(`--- 追踪${kind === 'success' ? '成功完成' : '失败'} ---`, kind === 'success' ? 'success' : 'error');
        if (kind === 'error') state.modals.debugVisible = true;
        clearInterval(timer.value!); timer.value = null;
        return;
      }
      const nodeId = seq[step];
      const prevId = step > 0 ? seq[step-1] : null;

      state.activeNodeId = nodeId;
      
      // 检查是否是错误节点
      const currentNode = state.nodes.find(n => n.id === nodeId);
      state.errorNodeId = (kind === 'error' && currentNode && (currentNode.type === 'fail_event' || nodeId.toUpperCase().includes('FAIL') || nodeId.toUpperCase().includes('ERROR'))) ? nodeId : null;
      
      state.activeEdge = prevId ? makeEdgeId(prevId, nodeId) : null;
      state.errorEdge = (kind === 'error' && state.errorNodeId && prevId) ? makeEdgeId(prevId, nodeId) : null;

      step++;
    }, 600);
  }

  function traceById(_id: string) {
    startTrace('error'); // 示例：可按你的需要实现
  }

  return {
    // 状态 - 直接返回 state 对象以保持响应式
    state,
    // 为了兼容性，也提供直接访问
    get nodes() { return state.nodes; },
    get links() { return state.links; },
    get ready() { return state.ready; },
    get sidePanelOpen() { return state.sidePanelOpen; },
    get logs() { return state.logs; },
    get activeNodeId() { return state.activeNodeId; },
    get errorNodeId() { return state.errorNodeId; },
    get activeEdge() { return state.activeEdge; },
    get errorEdge() { return state.errorEdge; },
    get modals() { return state.modals; },
    // 日志/控制
    addLog, loadDemoModule, loadModule, startTrace, traceById,
  };
}
