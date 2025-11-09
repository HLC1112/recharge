export interface FailureContext {

  graphData?: {

    nodes: any[];

    links: any[];

  };

  analysis?: string;

  [key: string]: any;

}



export interface IProps {

  visible: boolean;

  failureContext: FailureContext;

}



export type IEmits = {

  (e: 'update:visible', value: boolean): void;

  (e: 'debug'): void;

  (e: 'extract-code'): void;

  (e: 'ask-gemini'): void;

};