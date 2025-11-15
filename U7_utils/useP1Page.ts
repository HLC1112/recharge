import { ref, watch, onMounted } from 'vue'
import { usePanelOrchestrator } from '../U8_config/panelOrchestrator'
import type { DsvNodeData } from '../U2_components/P_1/P_1_C_84/P_1_C_84_inside_Obj'
import { RechargeFlowClient } from '../U3_api/rechargeFlowClient'

export type TraceKind = 'success' | 'error' | 'id'

export function useP1Page() {
  
  const fileDialogVisible = ref<boolean>(false)
  const showFileDialog = fileDialogVisible

  const showDsvModal = ref(false)
  const dsvModalData = ref<DsvNodeData | null>(null)
   const dsvNodeIds = ref(new Set<string>()) 

  const showDbModal = ref(false)
  const dbModalData = ref<DsvNodeData | null>(null)
  const dbNodeIds = ref(new Set<string>()) 

  const isTracing = ref<boolean>(false)
  const traceId = ref<string>('')

  const orchestrator = usePanelOrchestrator()

  const rechargeClient = new RechargeFlowClient({ wsUrl: 'ws://localhost:8081/recharge-status', apiUrl: 'http://localhost:8081/api', token: 'test-token' })

  onMounted(() => {
    try { orchestrator.loadModuleFromBackend?.(); } catch {}
    try {
      rechargeClient.connect()
      rechargeClient.on('*', (e) => {
        orchestrator.addLog(`WS ${e.type}`, 'info')
        ;(orchestrator as any).applyEvent?.(e)
      })
      rechargeClient.onNormalized((n) => {
        ;(orchestrator as any).applyNormalizedEvent?.(n)
      })
      try {
        const aggWs = new WebSocket('ws://localhost:8099/panel/ws')
        aggWs.onmessage = (ev) => {
          try {
            const obj = JSON.parse(String(ev.data))
            ;(orchestrator as any).applyEvent?.({ type: obj.type, payload: obj.payload })
          } catch (e) {}
        }
      } catch {}
    } catch {}
  })

  const loadDsvModalData = () => {
    if (dsvModalData.value && dsvNodeIds.value.size > 0) return;

    // [ ★ 修改 ★ ] 添加 P_1_C_139
    const internalParentIds = new Set([
      'P_1_C_84',  // 根网格 (P_1_C_89)
      'P_1_C_127', // FSM 容器
      'P_1_C_130', // DBS 容器 (子节点属于这里)
      'P_1_C_139', // EventBus 容器 (子节点属于这里)
    ]);
    // [ ★ 结束修改 ★ ]

    const internalNodes = orchestrator.state.nodes.filter(
       (n: any) => n.parentComponentId && internalParentIds.has(n.parentComponentId.trim())
    );
    
    const internalNodeIds = new Set(internalNodes.map(n => n.id));
    dsvNodeIds.value = internalNodeIds;

    const internalLinks = orchestrator.state.links
      .filter(
        (l: { from: string, to: string }) => internalNodeIds.has(l.from) && internalNodeIds.has(l.to)
       )
      .map((l: { from: string, to: string }) => ({
        ...l, 
        id: `edge-${l.from}-to-${l.to}` 
      }));

    // --- [ 修正 ] ---
    // 1. 为 P_1_C_84 (根网格) 的子节点分配布局 (保持不变)
    const rootGridNodes = internalNodes
      .filter((n: any) => n.parentComponentId?.trim() === 'P_1_C_84')
      .map((node, i) => ({
        ...node,
        componentId: node.componentId || 'P_1_C_121', // 默认外观
         data: { label: node.text },
        layout: { 
          gridRowStart: 1 + Math.floor(i / 6),
          gridColumnStart: 1 + (i % 6) * 2,
           gridRowEnd: undefined, // 显式添加
          gridColumnEnd: 'span 2',
        }
      }));

    // 2. 获取 FSM 容器 (P_1_C_127) 的子节点
    const fsmNodes = internalNodes
       .filter((n: any) => n.parentComponentId?.trim() === 'P_1_C_127')
      .map(node => ({ 
        ...node, 
        componentId: node.componentId || 'P_1_C_120', 
        data: { label: node.text },
        layout: { 
           gridRowStart: 1, 
           gridColumnStart: 1,
          gridRowEnd: undefined,
          gridColumnEnd: undefined 
        } 
      }));
      
    // 3. 获取 DBS 容器 (P_1_C_130) 的子节点
    const dbsNodes = internalNodes
      .filter((n: any) => n.parentComponentId?.trim() === 'P_1_C_130')
      .map(node => ({ 
        ...node, 
        componentId: node.componentId || 'P_1_C_124',
        data: { label: node.text },
        layout: { 
           gridRowStart: 1, 
          gridColumnStart: 1,
          gridRowEnd: undefined,
          gridColumnEnd: undefined
        } 
      }));
      
    // [ ★ 新增 ★ ]
    // 4. 获取 EventBus 容器 (P_1_C_139) 的子节点
    const eventBusNodes = internalNodes
      .filter((n: any) => n.parentComponentId?.trim() === 'P_1_C_139')
      .map(node => ({ 
        ...node, 
        componentId: node.componentId || 'P_1_C_124',
        data: { label: node.text },
        layout: { 
           gridRowStart: 1, 
          gridColumnStart: 1,
          gridRowEnd: undefined,
          gridColumnEnd: undefined
        } 
      }));
    // 补齐：当解析/映射缺失 parentComponentId 时，按前缀强制收集并加入 EventBus 容器
    const dsvEventPrefixes = [/^QRY001_/, /^CMD001_/, /^CMD002_/, /^CMD003_/, /^EVT001_/, /^EVT002_/, /^DOC001_/, /^DOC002_/, /^DOC003_/];
    const existsIds = new Set(eventBusNodes.map((n: any) => n.id));
    orchestrator.state.nodes.forEach((n: any) => {
      const id = String(n.id || '')
      if (!id) return
      if (!dsvEventPrefixes.some((re) => re.test(id))) return
      if (existsIds.has(id)) return
      const styleClass = id.startsWith('DOC') ? 'doc_node' : (id.startsWith('EVT002_') ? 'fail_event' : 'event_node')
      const componentId = id.startsWith('DOC') ? 'P_1_C_133' : (styleClass === 'fail_event' ? 'P_1_C_118' : 'P_1_C_117')
      eventBusNodes.push({
        id,
        componentId,
        data: { label: n.text },
        label: n.text,
        styleClass,
        layout: { gridRowStart: 1, gridColumnStart: 1 },
      } as any)
      existsIds.add(id)
    })
    // [ ★ 结束新增 ★ ]
      
    // --- [ 修正结束 ] ---

    const triggerNode = orchestrator.state.nodes.find((n: any) => n.id === 'DSV_AuthService');
    const triggerNodeId = triggerNode?.id || 'DSV_AuthService';
    const triggerNodeName = triggerNode?.text || 'DSV 详情';

    dsvModalData.value = {
      id: triggerNodeId,
       name: triggerNodeName,
      // [ ★ 修改 ★ ] 合并所有内部节点
      internalNodes: [ ...rootGridNodes, ...fsmNodes, ...dbsNodes, ...eventBusNodes ],
      internalLinks: internalLinks,
    };
  }

  const loadDbModalData = () => {
    if (dbModalData.value && dbNodeIds.value.size > 0) return;

    const internalParentIds = new Set(['P_1_C_42', 'P_1_C_43', 'P_1_C_128']);

    const internalNodes = orchestrator.state.nodes.filter(
      (n: any) => n.parentComponentId && internalParentIds.has(n.parentComponentId.trim())
    );
    const internalNodeIds = new Set(internalNodes.map(n => n.id));
    const internalLinks = orchestrator.state.links
      .filter(
        (l: { from: string, to: string }) => internalNodeIds.has(l.from) && internalNodeIds.has(l.to)
      )
      .map((l: { from: string, to: string }) => ({
         ...l,
        id: `edge-${l.from}-to-${l.to}`
      }));

    const internalNodesWithLayout = internalNodes.map((node, i) => ({
      ...node,
      componentId: node.componentId || 'P_1_C_121',
      data: { label: node.text }, 
      layout: { 
        gridRowStart: 1 + Math.floor(i / 6),
         gridColumnStart: 1 + (i % 6) * 2,
        gridColumnEnd: 'span 2',
      }
    }));
    
    dbNodeIds.value = internalNodeIds;
    
    dbModalData.value = {
      id: 'DA0_RiskEventAccessor', 
      name: '数据库详情 (MySQL / MongoDB)',
      internalNodes: internalNodesWithLayout,
      internalLinks: internalLinks,
    }; 
  }

  watch(() => orchestrator.state.ready, (isReady) => {
     if (isReady) {
      loadDsvModalData(); 
      loadDbModalData();
    } else {
      dbModalData.value = null;
      dbNodeIds.value.clear();
      dsvModalData.value = null; 
       dsvNodeIds.value.clear();
    }
  }, { immediate: true }); 

  watch(() => orchestrator.state.activeNodeId, (newNodeId) => {
    
     
    if (newNodeId && dbNodeIds.value.has(newNodeId)) {
      if (!showDbModal.value) {
        orchestrator.addLog(`追踪进入数据库节点, 自动打开...`, 'info');
         showDbModal.value = true;
      }
    } else if (showDbModal.value) {
       orchestrator.addLog(`追踪离开数据库节点, 自动关闭...`, 'info');
      showDbModal.value = false;
    }

    if (newNodeId && dsvNodeIds.value.has(newNodeId)) {
       if (!showDsvModal.value) {
        orchestrator.addLog(`追踪进入 DSV 节点, 自动打开...`, 'info');
        if (!dsvModalData.value) {
           loadDsvModalData();
        }
         showDsvModal.value = true;
      }
    } else if (showDsvModal.value) {
      orchestrator.addLog(`追踪离开 DSV 节点, 自动关闭...`, 'info');
       showDsvModal.value = false;
    }
  });

  const onNodeClick = (payload: { nodeId: string; nodeData: any }) => {
    orchestrator.addLog(`点击节点：${payload.nodeId}`, 'info')

    if (payload.nodeData?.componentId === 'P_1_C_121' || payload.nodeId === 'DA0_RiskEventAccessor' || dbNodeIds.value.has(payload.nodeId)) {
 
       if (!dbModalData.value) {
         loadDbModalData(); 
      }
      
 showDbModal.value = true;
      orchestrator.addLog(`打开 DB 详情: ${payload.nodeId}`, 'info');
    }
    
    else if (payload.nodeData?.componentId === 'P_1_C_114' || payload.nodeId === 'DSV_AuthService' || dsvNodeIds.value.has(payload.nodeId)) {
       
       if (!dsvModalData.value) {
           loadDsvModalData();
      }
      
      showDsvModal.value = true;
      orchestrator.addLog(`打开 DSV 详情: ${payload.nodeId}`, 'info');
    }
  }

  const onCloseDsvModal = () => {
     showDsvModal.value = false;
  }

  const onCloseDbModal = () => {
    showDbModal.value = false;
  }

  const handleStartTrace = (payload: { type: TraceKind; id: string | null }) => {
    isTracing.value = true
    if (payload.type === 'id') {
      orchestrator.traceById(traceId.value || payload.id || 'demo-error')
    } else {
      const kind = payload.type
      fetch('http://localhost:8099/panel/play', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, delayMs: 800 }),
      }).then(async (r) => {
        if (!r.ok) throw new Error('panel/play failed')
        orchestrator.addLog('panel:play:accepted', 'success')
      }).catch(() => {
        orchestrator.startTrace(kind)
      })
    }
    rechargeClient.startRecharge('diamond_package_6480').then(() => {
      orchestrator.addLog('api:recharge:202', 'success')
    }).catch((e: any) => {
      orchestrator.addLog(String(e?.message || e), 'error')
    })
    setTimeout(() => { isTracing.value = false }, 5000)
  }

  const handleLoadModule = (payload: { content: string }) => {
    try {
       const content = payload.content || ''
       console.log('[useP1Page] handleLoadModule 开始，内容长度:', content.length)
      orchestrator.addLog(`开始加载模块，内容长度: ${content.length} 字符`, 'info')
      
      if (typeof orchestrator.loadModule === 'function') {
         console.log('[useP1Page] 调用 orchestrator.loadModule...')
        orchestrator.loadModule(content)
         console.log('[useP1Page] orchestrator.loadModule 调用完成')
        console.log('[useP1Page] orchestrator.nodes 长度:', orchestrator.nodes?.length || 0)
        orchestrator.addLog('模块已加载（来自所选文件）。', 'success')
      } else {
        console.warn('[useP1Page] loadModule 不是函数，回退到 Demo')
         orchestrator.loadDemoModule?.()
        orchestrator.addLog('未检测到 loadModule，已回退为 Demo 数据加载。', 'warn')
      }
      console.log('Received file content:', content.substring(0, 100) + '...')
     } catch (err: any) {
      const errorMsg = err?.message || String(err)
      console.error('[useP1Page] handleLoadModule 错误:', err)
      console.error('[useP1Page] 错误堆栈:', err?.stack)
      orchestrator.addLog(`解析/加载模块失败：${errorMsg}`, 'error')
       if (err?.stack) {
         orchestrator.addLog(`错误堆栈: ${err.stack}`, 'error')
       }
      console.error('Load module error:', err)
    } finally {
      fileDialogVisible.value = false
    }
  }

   const onLoadMermaid = handleLoadModule
  const openModuleDialog = () => { fileDialogVisible.value = true }
  const onUpdateTraceId = (v: string) => { traceId.value = v }

  watch(fileDialogVisible, (visible) => {
    if (!visible) fileDialogVisible.value = false
  })

  return {
    fileDialogVisible, showFileDialog, isTracing, traceId, orchestrator,
    onNodeClick, handleStartTrace, handleLoadModule, onLoadMermaid,
     openModuleDialog, onUpdateTraceId,
    
    // DSV 弹窗
    showDsvModal, dsvModalData, onCloseDsvModal,
    // DB 弹窗
    showDbModal, dbModalData, onCloseDbModal,

    dsvNodeIds,
     dbNodeIds,
  }
}
