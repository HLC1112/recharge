import { ref, computed } from 'vue'
import type { IProps } from './P_1_C_14_inside_Obj'

/** 读取文本：优先 File.text()，失败回退 FileReader */
async function readTextWithFallback(file: File): Promise<string> {
  if (typeof (file as any).text === 'function') {
    return await (file as any).text()
  }
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result ?? ''))
    reader.onerror = () => reject(reader.error || new Error('FileReader 读取失败'))
    reader.readAsText(file)
  })
}

export function useControl(props: IProps, emit: any) {
  const fileName = ref('')
  const fileContent = ref('')
  const hasFile = ref(false)

  const log = (msg: string, lv: 'log'|'warn'|'error' = 'log') => {
    const prefix = '[P1C14]'
    // 用 console 直出，确保在浏览器控制台里能看到
    // （配合你截图中的大量 Vue warn，可以快速定位）
    console[lv](`${prefix} ${msg}`)
  }

  // 处理文件的内部函数
  const processFile = async (file: File) => {
    if (!file) {
      log('未选择文件，清空状态。', 'warn')
      hasFile.value = false
      fileName.value = ''
      fileContent.value = ''
      return
    }

    try {
      fileName.value = file.name
      log(`选择文件：${file.name} (${file.size} bytes)`)

      const text = await readTextWithFallback(file)
      fileContent.value = typeof text === 'string' ? text : ''
      hasFile.value = fileContent.value.length > 0

      if (hasFile.value) {
        log('读取完成，内容非空，展示预览并解禁按钮。')
        // 打个样本，最多 100 个字符，便于确认是否被裁剪
        console.log('[P1C14] SAMPLE:', fileContent.value.slice(0, 100).replace(/\n/g, '\\n'))
      } else {
        log('读取完成，但文本长度为 0。若期望显示，请检查文件内容或环境是否裁剪。', 'warn')
        console.log('[P1C14] BRANCH: SUCCESS==0')
      }
    } catch (err: any) {
      console.error('[P1C14] BRANCH: CATCH FAIL', err)
      hasFile.value = false
      fileContent.value = ''
    } finally {
      console.log('[P1C14] FINALLY done, hasFile=', hasFile.value)
    }
  }

  const handleFileChange = async (e: Event | { target: { files: File[] | FileList | null } }) => {
    const input = (e.target as HTMLInputElement | { files: File[] | FileList | null }) || null
    const files = input?.files
    const file = files?.[0] || (Array.isArray(files) ? files[0] : null)

    if (!file) {
      log('未选择文件，清空状态。', 'warn')
      hasFile.value = false
      fileName.value = ''
      fileContent.value = ''
      return
    }

    await processFile(file as File)
    
    // 如果是真实的 input 元素，清空其值以允许重复选择
    if (input && 'value' in input && typeof (input as HTMLInputElement).value !== 'undefined') {
      (input as HTMLInputElement).value = ''
    }
  }

  // 业务规则：只有非空文本才显示预览并解禁按钮
  const previewVisible = computed(() => hasFile.value)
  const loadButtonDisabled = computed(() => !hasFile.value)

  const clearState = () => { hasFile.value = false; fileName.value = ''; fileContent.value = '' }
  const handleClose = () => { emit('update:visible', false); clearState(); log('CLOSE modal') }

  const handleLoadModule = () => {
    log('handleLoadModule 被调用')
    log(`当前状态: hasFile=${hasFile.value}, fileContent.length=${fileContent.value.length}`)
    if (!hasFile.value) { 
      log('SKIP load: empty content', 'warn')
      return 
    }
    if (!fileContent.value || fileContent.value.length === 0) {
      log('SKIP load: fileContent is empty', 'warn')
      return
    }
    log(`EMIT load-module, content length: ${fileContent.value.length}`)
    emit('load-module', { content: fileContent.value })
    handleClose()
  }

  // 直接处理文件对象的函数（用于 File System Access API）
  const handleFileDirect = async (file: File) => {
    await processFile(file)
  }

  return {
    fileName, fileContent, previewVisible, loadButtonDisabled,
    handleFileChange, handleFileDirect, handleClose, handleLoadModule,
  }
}
