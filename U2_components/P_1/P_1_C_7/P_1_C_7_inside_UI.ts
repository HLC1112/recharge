import { reactive, CSSProperties } from 'vue'
import type { IProps } from './P_1_C_7_inside_Obj'

export function useComponentStyles(_props: IProps) {
  const componentStyle = reactive<CSSProperties>({
    position: 'absolute',
    top: '120px',
    left: '120px',
    width: '420px',        // 修正：不占满全屏
    borderRadius: '12px',
    background: 'rgba(7,26,46,0.9)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
    backdropFilter: 'blur(2px)',
    pointerEvents: 'auto', // 自身可交互
    padding: '8px',
    zIndex: 74,
  })
  return { componentStyle }
}
