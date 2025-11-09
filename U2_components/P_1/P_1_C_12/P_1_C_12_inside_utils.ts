import { computed, CSSProperties } from 'vue';

import { IProps } from './P_1_C_12_inside_Obj';



// CL_31: Input

// description: 基础的文本输入字段。



export function useInput(props: IProps) {

  const tag = computed(() => 'input');



  const elementId = computed(() => 'trace-id-input');



  const elementClasses = computed(() => ['w-full', 'bg-gray-900', 'text-xs']);



  const placeholder = computed(() => '输入Trace ID...');



  return { tag, elementId, elementClasses, placeholder };

}