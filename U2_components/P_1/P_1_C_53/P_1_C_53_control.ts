import { IProps, IEmits } from './P_1_C_53_inside_Obj';



export function useControl(props: IProps, emit: IEmits) {

  const handleClose = () => {

    emit('update:visible', false);

  };



  const handleDebug = () => {

    emit('debug');

  };



  const handleExtractCode = () => {

    emit('extract-code');

  };



  const handleAskGemini = () => {

    emit('ask-gemini');

  };



  return {

    handleClose,

    handleDebug,

    handleExtractCode,

    handleAskGemini,

  };

}