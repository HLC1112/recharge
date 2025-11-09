// 文件：U2_components/P_1/P_1_C_14/P_1_C_14_inside_UI.ts
import { reactive, type CSSProperties } from 'vue'
import type { IProps } from './P_1_C_14_inside_Obj'

export function useComponentStyles(props: IProps) {
  const overlayStyle = reactive<CSSProperties>({
    position: 'fixed', inset: 0, zIndex: (props.overlayZ ?? 9999) as number,
    background: 'rgba(0,0,0,0.60)', backdropFilter: 'blur(10px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  })

  const dialogStyle = reactive<CSSProperties>({
    width: '90%', maxWidth: '880px', position: 'relative',
    backgroundColor: '#0f172a', border: '1px solid rgba(0, 183, 255, 0.5)',
    borderRadius: '12px', boxShadow: '0 0 30px rgba(0, 183, 255, 0.3)',
    padding: '24px', color: '#e2e8f0', display: 'flex', flexDirection: 'column', gap: '16px',
  })

  const closeBtnStyle = reactive<CSSProperties>({
    position: 'absolute', top: '10px', right: '16px', fontSize: '24px',
    background: 'transparent', border: 'none', cursor: 'pointer', color: '#cbd5e1',
  })

  const previewTextareaStyle = reactive<CSSProperties>({
    width: '100%', minHeight: '240px', resize: 'vertical',
    padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    lineHeight: 1.5,
  })

  return { overlayStyle, dialogStyle, closeBtnStyle, previewTextareaStyle }
}
