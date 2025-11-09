export interface INode {

  id: string;

  // Position and dimensions are assumed to be provided by the parent layout

  x: number;

  y: number;

  width: number;

  height: number;

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

}