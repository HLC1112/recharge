import { computed } from 'vue';

import { IProps, IEmits } from './P_1_C_67_inside_Obj';

import { state } from './P_1_C_67_inside_State';



export function useControl(props: IProps, emit: IEmits) {

  const handleClose = () => {

    emit('update:visible', false);

  };



  const handleFolderSelect = (files: FileList) => {

    state.selectedFiles = files;

  };



  const handleStartExtraction = () => {

    if (state.selectedFiles) {

      emit('start-extraction', state.selectedFiles);

    }

  };



  const handleDownload = () => {

    emit('download-report', props.scanResults || []);

  };



  const selectedFolderPath = computed(() => {

    if (!state.selectedFiles || state.selectedFiles.length === 0) {

      return '未选择文件夹';

    }

    try {

      const firstFile = state.selectedFiles[0] as any;

      if (firstFile.webkitRelativePath) {

        const parts = firstFile.webkitRelativePath.split('/');

        if (parts.length > 1) {

          return `${parts[0]} (${state.selectedFiles.length} files)`;

        }

      }

    } catch (e) {

      // Fallback

    }

    return `${state.selectedFiles.length} files selected`;

  });



  const canStartExtraction = computed(() => {

    return !props.isScanning && state.selectedFiles && state.selectedFiles.length > 0;

  });



  const canDownload = computed(() => {

    return !props.isScanning && props.scanResults && props.scanResults.length > 0;

  });



  const canShowResults = computed(() => {

    return !props.isScanning && props.scanResults && props.scanResults.length > 0;

  });



  return {

    handleClose,

    handleFolderSelect,

    handleStartExtraction,

    handleDownload,

    selectedFolderPath,

    canStartExtraction,

    canDownload,

    canShowResults,

  };

}