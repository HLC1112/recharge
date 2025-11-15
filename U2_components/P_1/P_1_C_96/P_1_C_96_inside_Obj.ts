export interface INode {
  id: string;
  // [修正] 移除 x, y, width, height。
  // 连线逻辑将基于 DOM 查找，而不是此数据结构。
  [key: string]: any;
}

export interface ILink {
  id: string;
  source: string; // Node ID
  target: string; // Node ID
  [key: string]: any;
}

export interface IProps {
  nodes: INode[];
  links: ILink[];
  highlightedLinks?: string[];
}

export interface IProcessedLink {
  id: string;
  d: string;
  isHighlighted: boolean;
  isFailure: boolean;
  class: string; // [FIX] 修复类型不匹配
  marker: string; // [FIX] 修复类型不匹配
}