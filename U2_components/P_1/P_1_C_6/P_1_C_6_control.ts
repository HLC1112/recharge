// 文件：U2_components/P_1/P_1_C_6/P_1_C_6_control.ts
import type { IProps } from './P_1_C_6_inside_Obj';

type Emits = {
  (e: 'update:traceId', value: string): void;
  (e: 'start-trace', payload: { type: 'success' | 'error' | 'id'; id: string | null }): void;
  (e: 'open-module-loader'): void;
};

export function useControl(props: IProps, emit: Emits) {
  const onPickModule = () => { emit('open-module-loader'); };

  const onRunSuccessFlow = () => emit('start-trace', { type: 'success', id: null });
  const onRunFailureFlow = () => emit('start-trace', { type: 'error', id: null });
  const onTraceById      = () => emit('start-trace', { type: 'id', id: props.traceId || null });
  const onTraceIdInput   = (v: string) => emit('update:traceId', v);

  return { onPickModule, onRunSuccessFlow, onRunFailureFlow, onTraceById, onTraceIdInput };
}
