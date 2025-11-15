import { reactive, computed, CSSProperties } from 'vue';
import { IProps } from './P_1_C_130_inside_Obj';

export function useComponentStyles(props: IProps) {
  const componentStyle = reactive<CSSProperties>({
    position: 'relative',
    width: '100%',
    height: '100%',
    zIndex: 3,
    border: '1px dashed #d81b60', // [修正] FSM 容器的边框颜色
    borderRadius: '8px',
    padding: '8px',
    boxSizing: 'border-box',
    overflowY: 'auto',
    backgroundColor: props.isHighlighted ? 'rgba(255, 255, 0, 0.1)' : 'transparent',
  });
  const containerClasses = computed(() => ['dbs-sub-plane']);
  return { componentStyle, containerClasses };
}

export function useChildStyles(props: IProps) {
  const planeTitleStyle = reactive<CSSProperties>({
    position: 'absolute', top: '8px', left: '8px', zIndex: 10,
    // [ ★ 修正 ★ ] 颜色与 P_1_C_127 标题的 #8ef9f3 一致
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