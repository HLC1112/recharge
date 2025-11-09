import { reactive } from 'vue';



interface IState {

  title: string;

}



export const state = reactive<IState>({

  title: 'bash -- 110x30',

});