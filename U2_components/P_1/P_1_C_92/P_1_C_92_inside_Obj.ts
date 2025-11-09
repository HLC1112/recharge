export interface IEventData {

  id: string;

  [key: string]: any;

}



export interface IProps {

  eventData?: IEventData;

  active?: boolean;

}