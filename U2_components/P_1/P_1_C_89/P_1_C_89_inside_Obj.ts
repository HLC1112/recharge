export interface DsvNode {

  id: string;

  componentId:

    | 'P_1_C_119'

    | 'P_1_C_120'

    | 'P_1_C_121'

    | 'P_1_C_122'

    | 'P_1_C_123'

    | string;

  data: any;

  layout: {

    gridRowStart: number;

    gridColumnStart: number;

    gridRowEnd?: number | string;

    gridColumnEnd?: number | string;

  };

}



export interface IProps {

  nodes: DsvNode[];

  highlightedNodes?: string[];

}