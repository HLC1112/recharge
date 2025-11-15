export interface INode {
  id: string;
  label?: string;
  type?: string;
  styleClass?: string;
  [key: string]: any;
}

export interface IProps {
  nodes: INode[]; // 子节点
  highlightedNodes?: string[]; // 完整的高亮列表
  nodeData: INode; // P_1_C_139 容器自己的数据
  isHighlighted?: boolean; // P_1_C_139 容器自身是否高亮
}