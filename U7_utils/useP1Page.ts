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
      const maybe = orchestrator as any
      if (typeof maybe.loadModule === 'function') {
        maybe.loadModule(payload.content)
        orchestrator.addLog('模块已加载（来自所选文件）。', 'success')
      } else {
        maybe.loadDemoModule?.()
        orchestrator.addLog('未检测到 loadModule，已回退为 Demo 数据加载。', 'warn')
      }
      console.log('Received file content:', (payload.content || '').substring(0, 100) + '.')
    } catch (err: any) {
      orchestrator.addLog(`解析/加载模块失败：${err?.message || err}`, 'error')
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
