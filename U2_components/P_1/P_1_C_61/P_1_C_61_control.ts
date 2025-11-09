import { IProps, IEmits } from './P_1_C_61_inside_Obj';

import { handleNavigation } from './P_1_C_61_U5_router';



export function useControl(props: IProps, emit: IEmits) {

  const handleClick = () => {

    emit('click');

    handleNavigation();

  };



  return {

    handleClick,

  };

}