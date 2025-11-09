export interface INodeData {

  id: string;

  label: string;

  type: string;

  [key: string]: any;

}



export interface IProps {

  nodeData: INodeData;

  isHighlighted?: boolean;

  isFailure?: boolean;

}