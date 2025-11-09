export interface IProps {

  visible: boolean;

  failureNodeName: string;

  scanProgress?: number;

  scanResults?: any[];

  isScanning?: boolean;

}



export type IEmits = {

  (e: 'update:visible', value: boolean): void;

  (e: 'start-extraction', files: FileList): void;

  (e: 'download-report', reportData: any[]): void;

};