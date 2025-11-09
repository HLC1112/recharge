import { computed } from 'vue';

import { IProps, IEmits } from './P_1_C_47_inside_Obj';



export function useControl(props: IProps, emit: IEmits) {

  const handleClose = () => {

    emit('update:visible', false);

  };



  const handleStartDebug = () => {

    emit('start-debug', props.failureContext || {});

  };



  const handleExtractCode = () => {

    emit('extract-code', props.failureContext || {});

  };



  const isFailure = computed(() => {

    return props.traceStatus === 'failure';

  });



  return {

    handleClose,

    handleStartDebug,

    handleExtractCode,

    isFailure,

  };

}