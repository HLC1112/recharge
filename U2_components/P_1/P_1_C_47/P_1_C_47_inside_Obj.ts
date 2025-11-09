export type TraceStatus = 'idle' | 'running' | 'success' | 'failure';



export interface IProps {

  visible: boolean;

  title?: string;

  logEntries?: any[];

  traceStatus?: TraceStatus;

  failureContext?: Record<string, any> | null;

}



export type IEmits = {

  (e: 'update:visible', value: boolean): void;

  (e: 'start-debug', context: Record<string, any>): void;

  (e: 'extract-code', context: Record<string, any>): void;

};