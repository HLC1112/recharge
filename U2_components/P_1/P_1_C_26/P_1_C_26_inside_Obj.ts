export interface INode {

  id: string;

  label?: string;

  text?: string;

  type?: string;

  style?: string;

  cssStyle?: string;

  parentComponentId?: string;

  componentId?: string;

  [key: string]: any;

}



export interface IProps {

  nodes: INode[];

  highlightedNodes?: string[];

}



export type IEmits = {

  (e: 'node-click', payload: { nodeId: string; nodeData: INode }): void;

};