// U2_components/P_1/P_1_C_89_inside_Obj.ts
export interface DsvNode {
  id: string;
  componentId:
    | 'P_1_C_119'
    | 'P_1_C_120'
    | 'P_1_C_121'
    | 'P_1_C_122'
    | 'P_1_C_123'
    // --- [ 修正 ] ---
    | 'P_1_C_130' 
    | 'P_1_C_139' // <-- [新增]
    // --- [ 结束 ] ---
    | string;
  data: any;
  layout: {
    gridRowStart: number;
    gridColumnStart: number;
    gridRowEnd?: number | string;
    gridColumnEnd?: number | string;
  };
  nodes?: DsvNode[]; 
}

export interface IProps {
  nodes: DsvNode[]; // 这是 P_1_C_89 应该渲染的直接子节点 (parentComponentId: 'P_1_C_84')
  highlightedNodes?: string[];
}