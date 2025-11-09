// 文件：U8_config/panelOrchestrator.ts
import { reactive, ref, nextTick } from 'vue';

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
      const text = (mermaidText || '').replace(/\r\n/g, '\n');

      // 允许没有显式 graph 行，但有的话给个提示
      if (!/^\s*graph\s+/im.test(text)) {
        addLog('未检测到合法的 Mermaid 图(缺少 "graph" 开头)；尝试宽松解析。', 'warn');
      }

      // 匹配一行里的 A --> B / A---B / A-.->B
      const edgeLineRe = /^\s*(.+?)\s*(?:---|-->|-\.\->)\s*(.+?)\s*$/;

      // 只在包含 '->' 的行上尝试，能大幅降低误匹配
      const nodesMap = new Map<string, UINode>();
      const links: LinkDef[] = [];

      const parseToken = (raw: string) => {
        // 例如 A["前端 API"]   A[前端]   "开始节点"   开始 节点
        const baseMatch = raw.match(/^[A-Za-z0-9_\-]+/);
        const base = baseMatch?.[0];

        const label = toLabel(raw);
        const id = toId(base || label);

        return {
          id: id || toId(label), // 兜底
          label,
        };
      };

      const pushNodeIfAbsent = (id: string, label: string) => {
        if (!id) return;
        if (!nodesMap.has(id)) {
          // 根据 label 关键词做一个非常轻量的类型推断（可按需加）
          let type: NodeType = 'festate';
          const low = label.toLowerCase();
          if (/(fail|错误|异常|超时)/i.test(label)) type = 'fail_event';
          else if (/^https?\b|\bpost\b|\bget\b/i.test(label)) type = 'httpevent';
          else if (/event|事件中心/i.test(label)) type = 'bus';
          else if (/api|网关|gateway|client|nginx|kong/i.test(label)) type = 'feinfra';
          else if (/^evt[:：]/i.test(label)) type = 'trigger';
          nodesMap.set(id, {
            id,
            text: label,
            type,
            pos: { top: '50%', left: '50%' }, // 初始先占位，后面统一布局
          });
        }
      };

      text.split('\n').forEach(rawLine => {
        const line = rawLine.trim();
        if (!line || !line.includes('->')) return;

        const m = line.match(edgeLineRe);
        if (!m) return;

        const leftRaw = m[1];
        const rightRaw = m[2];

        const L = parseToken(leftRaw);
        const R = parseToken(rightRaw);

        if (L.id && R.id) {
          pushNodeIfAbsent(L.id, L.label);
          pushNodeIfAbsent(R.id, R.label);
          links.push({ from: L.id, to: R.id });
        }
      });

      if (links.length === 0 && nodesMap.size === 0) {
        throw new Error('未从 Mermaid 文本中解析到任何节点或连线。');
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
      state.nodes = nodes;
      state.links = links;
      state.ready = true;

      addLog(`成功解析 Mermaid：节点 ${nodes.length} 个，连线 ${links.length} 条。`, 'success');
      nextTick(() => window.dispatchEvent(new Event('resize')));
    } catch (e: any) {
      addLog(`Mermaid 解析失败：${e?.message || e}`, 'error');
      throw e;
    }
  }

  function startTrace(kind: 'success' | 'error') {
    if (!state.ready) { addLog('请先加载模块。', 'warn'); return; }
    clearTrace();
    const seq = kind === 'success' ? successPath : errorPath;
    let step = 0;
    addLog(`--- 开始 ${kind === 'success' ? '成功' : '故障'} 追踪 ---`, kind === 'success' ? 'success' : 'error');

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
      state.errorNodeId = (kind === 'error' && nodeId === 'P_1_E_108') ? nodeId : null;
      state.activeEdge = prevId ? makeEdgeId(prevId, nodeId) : null;
      state.errorEdge = (kind === 'error' && nodeId === 'P_1_E_108' && prevId) ? makeEdgeId(prevId, nodeId) : null;

      step++;
    }, 600);
  }

  function traceById(_id: string) {
    startTrace('error'); // 示例：可按你的需要实现
  }

  return {
    // 状态
    ...state,
    // 日志/控制
    addLog, loadDemoModule, loadModule, startTrace, traceById,
  };
}
