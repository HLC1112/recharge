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

}