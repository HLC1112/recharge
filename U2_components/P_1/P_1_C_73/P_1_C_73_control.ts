import { ref } from 'vue';

import { IProps, IEmits } from './P_1_C_73_inside_Obj';



export function useControl(props: IProps, emit: IEmits) {

  const inputRef = ref<HTMLInputElement | null>(null);



  const handleClick = () => {

    // B-273: ON CLICK, OPEN system folder picker.

    if (inputRef.value) {

      inputRef.value.click();

    }

  };



  const handleChange = (event: Event) => {

    const target = event.target as HTMLInputElement;

    const files = target.files;



    if (files && files.length > 0) {

      // B-273: ON FOLDER SELECT, UPDATE (P_1_C_74) with path/count and ENABLE (P_1_C_81).

      // We emit the event for the parent to handle.

      

      const firstFile = files[0];

      let path = 'Unknown Folder';

      if (firstFile.webkitRelativePath) {

        path = firstFile.webkitRelativePath.split('/')[0];

      }

      

      const pathInfo = `Folder: '${path}' (${files.length} files)`;



      emit('folder-selected', { files, pathInfo });

    }

    

    // Reset the input value to allow selecting the same folder again

    if (target) {

      target.value = '';

    }

  };



  return {

    inputRef,

    handleClick,

    handleChange,

  };

}