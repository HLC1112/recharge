import { reactive, CSSProperties } from 'vue'
import { IProps } from './P_1_C_24_inside_Obj'

export function useComponentStyles(props: IProps) {
  const componentStyle = reactive<CSSProperties>({
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',  // 保证每个平面拉伸到同宽
    gap: '1px',            // 三平面之间的垂直间距
    zIndex: 1,
    boxSizing: 'border-box',
    padding: '0',           // 有需要可在这里再加内边距
  })
  return { componentStyle }
}
