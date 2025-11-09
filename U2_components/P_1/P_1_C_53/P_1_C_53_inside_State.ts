import { reactive } from 'vue';



interface IState {

  title: string;

}



export const state = reactive<IState>({

  title: '智能调试: 故障上下文',

});