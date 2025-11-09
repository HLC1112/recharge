import { computed } from 'vue'
import type { IProps } from './P_1_C_14_inside_Obj'

export function useIdsAndAccept(props: IProps) {
  // 固定 ID，避免热更新下 ref 丢失
  const inputId = computed(() => 'p1c14-file-input')
  // 统一、带点扩展名；同时保留 MIME
  const accept = computed(
    () => props.accept ?? '.mmd,.mermaid,.md,.txt,text/plain'
  )
  return { inputId, accept }
}
