export interface ILogEntry {

  timestamp: string;

  level: string;

  message: string;

  [key: string]: any;

}



export interface IProps {

  logEntries: ILogEntry[];

}