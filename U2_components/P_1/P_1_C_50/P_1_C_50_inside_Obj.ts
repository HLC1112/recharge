export interface IProps {

  title?: string;

  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info';

  disabled?: boolean;

}



export type IEmits = {

  (e: 'click'): void;

};