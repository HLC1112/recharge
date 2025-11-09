export interface INode {

  id: string;

  label?: string;

  type?: string;

  db_type?: 'mysql' | 'mongodb';

  [key: string]: any;

}



export interface IProps {

  nodes: INode[];

  highlightedNodes?: string[];

}



export type IEmits = {

  (e: 'node-click', payload: { nodeId: string; nodeData: INode }): void;

};