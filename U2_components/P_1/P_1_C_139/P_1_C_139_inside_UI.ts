import { reactive, computed, CSSProperties } from 'vue';
import { IProps } from './P_1_C_139_inside_Obj';

export function useComponentStyles(props: IProps) {
   const componentStyle = reactive<CSSProperties>({
    position: 'relative',
    width: '100%',
    height: '100%',
    zIndex: 3,
    // 使用 'bus' 样式
    border: '1px dashed #455a64', 
    borderRadius: '8px',
    padding: '8px',
    boxSizing: 'border-box',
     overflowY: 'auto',
    backgroundColor: props.isHighlighted ? 'rgba(255, 255, 0, 0.1)' : 'transparent',
  });
  const containerClasses = computed(() => ['bus-sub-plane']);
  return { componentStyle, containerClasses };
}

export function useChildStyles(props: IProps) {
  const planeTitleStyle = reactive<CSSProperties>({
    position: 'absolute', top: '8px', left: '8px', zIndex: 10,
    color: '#8ef9f3', 
    fontWeight: 600, fontSize: '14px',
  });
  const nodeContainerStyle = reactive<CSSProperties>({
    display: 'flex', flexWrap: 'wrap', gap: '8px',
    paddingTop: '32px', width: '100%', height: '100%',
    alignContent: 'flex-start',
  });
  const nodeStyle = reactive<CSSProperties>({
    flex: '0 1 auto',
    minWidth: '150px',
    position: 'relative',
  });
  return { planeTitleStyle, nodeContainerStyle, nodeStyle };
}