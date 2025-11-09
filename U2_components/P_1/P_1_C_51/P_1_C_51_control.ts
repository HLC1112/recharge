import { watch, nextTick, Ref } from 'vue';

import { IProps } from './P_1_C_51_inside_Obj';



export function useControl(props: IProps, scrollbarEl: Ref<HTMLElement | null>) {

  const scrollToBottom = () => {

    if (scrollbarEl.value) {

      scrollbarEl.value.scrollTop = scrollbarEl.value.scrollHeight;

    }

  };



  watch(

    () => props.entries,

    () => {

      nextTick(scrollToBottom);

    },

    { deep: true },

  );

}