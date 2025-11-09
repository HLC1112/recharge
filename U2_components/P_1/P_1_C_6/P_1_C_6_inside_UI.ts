import { reactive, CSSProperties } from 'vue'
import type { IProps } from './P_1_C_6_inside_Obj'

export function useComponentStyles(_props: IProps) {
  const componentStyle = reactive<CSSProperties>({
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none', // 自身不拦截事件
    zIndex: 2000,         // 漂浮在页面之上
  })
  return { componentStyle }
}
