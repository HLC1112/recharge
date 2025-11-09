import { computed, CSSProperties } from 'vue'
import type { IProps } from './P_1_C_3_inside_Obj'

export function useComponentStyles(props: IProps) {
  const componentStyle = computed(
    (): CSSProperties => ({
      position: 'fixed',
      top: '0px',
      left: '0px',
      width: '100vw',
      height: '100vh',
      zIndex: 100,
      /** ✅ 不拦截任何鼠标事件，避免遮挡追踪器 */
      pointerEvents: 'none',
      animationPlayState: props.isPlaying === false ? 'paused' : 'running',
    }),
  )
  return { componentStyle }
}
