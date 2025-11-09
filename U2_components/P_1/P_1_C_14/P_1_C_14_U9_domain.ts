mport type { Ref } from 'vue'


export type LoadModulePayload = { content: string }


export type ControlCtx = {
emit: (evt: 'load-module', payload: LoadModulePayload) => void
& (evt: 'update:visible', v: boolean) => void,
getVisible: () => boolean,
setVisible: (v: boolean) => void,
fileInputRef: Ref<HTMLInputElement | null>,
}