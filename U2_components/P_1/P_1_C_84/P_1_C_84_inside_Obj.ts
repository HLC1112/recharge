export interface DsvNodeLayout {

  gridRowStart: number;

  gridColumnStart: number;

  gridRowEnd?: number | string;

  gridColumnEnd?: number | string;

}



export interface DsvNode {

  id: string;

  componentId: string;

  data: any;

  layout: DsvNodeLayout;

}



export interface DsvLink {

  id: string;

  from: string;

  to: string;

  type?: string;

}



export interface DsvNodeData {

  id: string;

  name: string;

  internalNodes: DsvNode[];

  internalLinks: DsvLink[];

}



export interface DsvFlowState {

  status: 'idle' | 'running' | 'done';

  highlightedNodes?: string[];

  highlightedLinks?: string[];

  eventIn?: any;

  eventOut?: any;

  fsmState?: string;

  logs?: string[];

}



export interface IProps {

  visible: boolean;

  dsvNodeData: DsvNodeData;

  flowState?: DsvFlowState;

}