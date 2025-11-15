export interface INode {
  id: string;
  label?: string;
  type?: string;
  styleClass?: string;
  [key: string]: any;
}

// P_1_C_89 会传入 P_1_C_130 自己的节点数据 (nodeData) 和高亮状态 (isHighlighted)
// P_1_C_84 (Modal) 需要通过 P_1_C_89 传入所有子节点 (nodes) 和高亮列表 (highlightedNodes)
export interface IProps {
  nodes: INode[]; // 子节点
  highlightedNodes?: string[]; // 完整的高亮列表
  nodeData: INode; // P_1_C_130 容器自己的数据
  isHighlighted?: boolean; // P_1_C_130 容器自身是否高亮
}