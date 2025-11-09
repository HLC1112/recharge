import { computed, CSSProperties } from 'vue';

import { IProps } from './P_1_C_13_inside_Obj';



// CL_9: Button

// description: 用于触发操作的标准可点击按钮。



export function useButton(props: IProps) {

  const tag = computed(() => 'button');



  const buttonText = computed(() => '根据ID追踪');



  const buttonId = computed(() => 'trace-by-id-btn');



  const buttonClasses = computed(() => ['w-full', 'tech-button', 'text-xs']);



  return { tag, buttonText, buttonId, buttonClasses };

}