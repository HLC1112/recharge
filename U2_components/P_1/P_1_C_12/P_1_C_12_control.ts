import { IProps } from './P_1_C_12_inside_Obj';



export function useControl(

  props: IProps,

  emit: (event: 'update:modelValue', value: string) => void,

) {

  const handleInput = (event: Event) => {

    const target = event.target as HTMLInputElement;

    emit('update:modelValue', target.value);

  };



  return {

    handleInput,

  };

}