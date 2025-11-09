export interface GraphNode {

  id: string;

  label: string;

  [key: string]: any;

}



export interface GraphLink {

  source: string;

  target: string;

  [key: string]: any;

}



export interface GraphData {

  nodes: GraphNode[];

  links: GraphLink[];

}



export interface IProps {

  graphData: GraphData | null;

}