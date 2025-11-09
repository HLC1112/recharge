import { computed } from 'vue'
import type { IProps } from './P_1_C_8_inside_Obj'

export function useContainer(_props: IProps) {
  const tag = computed(() => 'div')
  // inline-flex 避免块级元素“占满整行”的默认行为
  const elementClasses = computed(() => ['drag-handle', 'inline-flex', 'select-none', 'text-xs'])
  const textContent = computed(() => '≡') // 简单的把手符号
  return { tag, elementClasses, textContent }
}
