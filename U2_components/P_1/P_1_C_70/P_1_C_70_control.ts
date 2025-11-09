import { IProps } from './P_1_C_70_inside_Obj';



export function useControl(props: IProps, emit: (event: 'click') => void) {

  const handleClick = () => {

    emit('click');

  };



  return {

    handleClick,

  };

}