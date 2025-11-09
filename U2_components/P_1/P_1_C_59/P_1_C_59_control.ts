import { IProps, IEmits } from './P_1_C_59_inside_Obj';



export function useControl(props: IProps, emit: IEmits) {

  const handleClick = () => {

    emit('click');

  };



  return {

    handleClick,

  };

}