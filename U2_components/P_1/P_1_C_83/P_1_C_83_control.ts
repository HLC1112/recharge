import { IProps } from './P_1_C_83_inside_Obj';



export function useControl(

  props: IProps,

  emit: (event: 'click', ...args: any[]) => void,

) {

  const handleClick = () => {

    emit('click');

  };



  return {

    handleClick,

  };

}