import { IProps } from './P_1_C_82_inside_Obj';



export function useControl(props: IProps, emit: (event: 'click') => void) {

  const handleClick = () => {

    if (!props.disabled) {

      emit('click');

    }

  };



  return { handleClick };

}