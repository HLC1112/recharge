// U2_components/P_1/P_1_C_84_inside_Obj.ts
export interface DsvNodeLayout {
  gridRowStart: number;
  gridColumnStart: number;
  gridRowEnd?: number | string;
  gridColumnEnd?: number | string;
}

export interface DsvNode {
  id: string;
  componentId: string;
  data: any;
  layout: DsvNodeLayout;
  nodes?: DsvNode[]; // 子节点
  label?: string; // 确保 label 存在
   styleClass?: string; // 确保 styleClass 存在
  [key: string]: any;
}

export interface DsvLink {
  id: string;
  from: string;
  to: string;
  type?: string;
}

export interface DsvNodeData {
  id: string;
  name: string;
  internalNodes: DsvNode[];
  internalLinks: DsvLink[];
}

export interface DsvFlowState {
  status: 'idle' | 'running' | 'done';
  highlightedNodes?: string[];
  highlightedLinks?: string[];
  eventIn?: any;
  eventOut?: any;
  fsmState?: string;
  logs?: string[];
}

export interface IProps {
  visible: boolean;
  dsvNodeData: DsvNodeData;
  flowState?: DsvFlowState;

  // --- [ 修正 ] ---
  nodesForDbsContainer?: DsvNode[];
  nodesForEventBusContainer?: DsvNode[]; // <-- [新增]
  // --- [ 结束 ] ---
}