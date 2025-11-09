export interface IProps {

  visible: boolean;

  logStream?: string[];

}



export type IEmits = {

  (e: 'update:visible', value: boolean): void;

  (e: 'simulation-start'): void;

};