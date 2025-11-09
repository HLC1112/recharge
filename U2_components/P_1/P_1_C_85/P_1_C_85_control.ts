import { IProps } from './P_1_C_85_inside_Obj';



export function useControl(

  props: IProps,

  emit: (event: 'update:modelValue', ...args: any[]) => void,

) {

  const handleClose = () => {

    emit('update:modelValue', false);

  };



  return {

    handleClose,

  };

}