import { reactive } from 'vue';



interface IState {

  selectedFiles: FileList | null;

}



export const state = reactive<IState>({

  selectedFiles: null,

});