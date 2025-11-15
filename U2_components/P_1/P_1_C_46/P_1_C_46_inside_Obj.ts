// 文件：U2_components/P_1/P_1_C_46/P_1_C_46_inside_Obj.ts
export interface INode {
  id: string;
  [key: string]: any;
}

export interface ILink {
  id: string;
  source: string;
  target: string;
  [key: string]: any;
}

export interface IProps {
  nodes: INode[];
  links: ILink[];
  highlightedLinks?: string[];

  // ★★★ 新增 props (用于过滤连线) ★★★
  dsvNodeIds: Set<string>;
  dbNodeIds: Set<string>;
  isDsvModalOpen: boolean;
  isDbModalOpen: boolean;
  // ★★★ 修改结束 ★★★
}