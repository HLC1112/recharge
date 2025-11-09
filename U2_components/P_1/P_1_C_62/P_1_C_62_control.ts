import { IProps, IEmits } from './P_1_C_62_inside_Obj';



export function useControl(props: IProps, emit: IEmits) {

  const handleClose = () => {

    emit('update:visible', false);

  };



  return {

    handleClose,

  };

}