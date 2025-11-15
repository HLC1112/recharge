// 基于 P_1_C_27_inside_Obj.ts [cite: 798]
export interface INode {
  id: string;
  label?: string;
  type?: string;
  style?: string;
  cssStyle?: string;
  [key: string]: any;
}

export interface IProps {
  nodes: INode[];
  highlightedNodes?: string[];
}

export type IEmits = {
  (e: 'node-click', payload: { nodeId: string; nodeData: INode }): void;
};