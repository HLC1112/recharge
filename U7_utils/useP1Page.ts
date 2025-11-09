// 文件：U7_utils/useP1Page.ts
import { ref, watch } from 'vue'
import { usePanelOrchestrator } from '../U8_config/panelOrchestrator'

export type TraceKind = 'success' | 'error' | 'id'

export function useP1Page() {
  // 弹窗显隐
  const fileDialogVisible = ref<boolean>(false)
  const showFileDialog = fileDialogVisible

  const isTracing = ref<boolean>(false)
  const traceId = ref<string>('')

  const orchestrator = usePanelOrchestrator()

  const onNodeClick = (payload: { nodeId: string; nodeData: any }) => {
    orchestrator.addLog(`点击节点：${payload.nodeId}`, 'info')
  }

  const handleStartTrace = (payload: { type: TraceKind; id: string | null }) => {
    isTracing.value = true
    if (payload.type === 'id') {
      orchestrator.traceById(traceId.value || payload.id || 'demo-error')
    } else {
      orchestrator.startTrace(payload.type)
    }
    setTimeout(() => { isTracing.value = false }, 5000)
  }

  // 核心：接收 P1C14 的 mermaid 文本，交给 orchestrator.loadModule
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
  }
}
