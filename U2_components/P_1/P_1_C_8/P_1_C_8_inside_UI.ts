import { reactive, CSSProperties } from 'vue'

export function useComponentStyles() {
  const componentStyle = reactive<CSSProperties>({
    height: '36px',
    borderRadius: '8px',
    marginBottom: '8px',
    background: 'linear-gradient(180deg, rgba(22,45,72,.95), rgba(14,32,52,.95))',
    border: '1px solid rgba(96,140,255,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    cursor: 'move',
  })
  return { componentStyle }
}
