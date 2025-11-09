import { reactive } from 'vue'


export const state = reactive({
preview: '' as string,
fileName: '' as string,
fileSizeText: '' as string,
error: '' as string,
})