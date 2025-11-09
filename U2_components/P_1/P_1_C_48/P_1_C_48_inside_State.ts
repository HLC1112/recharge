import { reactive } from 'vue';



interface IState {

  isVisible: boolean;

}



export const state = reactive<IState>({

  isVisible: false,

});