<template>
  <teleport to="body">
    <div
      v-if="props.visible"
      :style="overlayStyle"
      class="mmd-backdrop"
      role="presentation"
      @click.self="handleClose" >
      <div
        :style="dialogStyle"
        class="mmd-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dlgTitle"
      >
        <button
          :style="closeBtnStyle"
          class="mmd-close"
          type="button"
          aria-label="关闭"
          title="关闭"
          @click="handleClose" >×</button>

        <h2 id="dlgTitle" class="mmd-title">选择Mermaid模块文件</h2>

        <form class="mmd-form" @submit.prevent="handleLoadModule" aria-describedby="hint">
          <div class="mmd-field">
            <label class="mmd-label" :for="inputId">浏览文件</label>
            <input
              :id="inputId"
              ref="fileInput"
              class="mmd-input"
              type="file"
              :accept="accept"
              @change="handleFileChange"
              style="position: absolute; width: 0; height: 0; opacity: 0; pointer-events: none;"
              title="选择 .mmd 或 .mermaid 文件"
            />
            <button
              type="button"
              class="mmd-btn mmd-btn-browse"
              @click="triggerFileInput"
              title="选择 .mmd 或 .mermaid 文件"
            >
              选择文件
            </button>
            <span id="hint" class="mmd-hint">
              {{ fileName || '未选择文件' }}
            </span>
          </div>

          <div v-if="previewVisible" class="mmd-preview">
            <textarea :style="previewTextareaStyle" :value="fileContent" readonly title="文件内容预览"></textarea>
          </div>

          <div class="mmd-actions">
            <button
              class="mmd-btn mmd-btn-primary"
              type="submit"
              :disabled="loadButtonDisabled" aria-label="加载模块"
              title="加载模块"
            >
              加载模块
            </button>
            <button
              class="mmd-btn"
              type="button"
              @click="handleClose" aria-label="取消"
              title="取消"
            >
               取消
            </button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
// 1. [修正] 导入所有必要的模块化文件
import { defineProps, defineEmits, ref, nextTick } from 'vue';
import type { IProps } from './P_1_C_14_inside_Obj'; // [cite: 830]
import { useControl } from './P_1_C_14_control'; // [cite: 817]
import { useComponentStyles } from './P_1_C_14_inside_UI'; // [cite: 832]
import { useIdsAndAccept } from './P_1_C_14_inside_utils'; // 

// 2. 定义 props 和 emits
const props = defineProps<IProps>();
const emit = defineEmits<{
  (e: 'update:visible', v: boolean): void;
  (e: 'load-module', payload: { content: string }): void;
}>();

// 3. [修正] 从 useControl 获取所有状态和处理函数（这里包含了日志记录）
const {
  fileName,
  fileContent,
  previewVisible,
  loadButtonDisabled,
  handleFileChange,
  handleFileDirect,
  handleClose,
  handleLoadModule,
} = useControl(props, emit); // [cite: 819-829]

// 4. [修正] 从 _UI 和 _utils 获取样式和ID
const { overlayStyle, dialogStyle, closeBtnStyle, previewTextareaStyle } = useComponentStyles(props); // 
const { inputId, accept } = useIdsAndAccept(props); // 

// 5. 添加文件输入引用和触发函数
const fileInput = ref<HTMLInputElement | null>(null)

// 触发文件选择的方法
const triggerFileInput = () => {
  // 方法1: 尝试使用 File System Access API (现代浏览器)
  if (typeof window !== 'undefined' && 'showOpenFilePicker' in window) {
    (window as any).showOpenFilePicker({
      types: [{
        description: 'Mermaid files',
        accept: {
          'text/plain': ['.mmd', '.mermaid', '.md', '.txt']
        }
      }],
      multiple: false
    }).then(async ([fileHandle]: any[]) => {
      const file = await fileHandle.getFile()
      // 直接使用 handleFileDirect 处理文件
      await handleFileDirect(file)
    }).catch((err: any) => {
      // 用户取消或出错，静默处理
      if (err.name !== 'AbortError') {
        console.error('[P1C14] 文件选择失败:', err)
      }
    })
    return
  }
  
  // 方法2: 使用传统的 input file (兼容性更好)
  nextTick(() => {
    let input: HTMLInputElement | null = null
    
    // 优先使用 ref
    if (fileInput.value) {
      input = fileInput.value
    } else {
      // 备用：通过 ID 获取
      input = document.getElementById(inputId.value) as HTMLInputElement
    }
    
    if (input) {
      // 确保是用户交互触发的（浏览器安全要求）
      try {
        input.click()
      } catch (err) {
        console.error('[P1C14] 触发文件选择失败:', err)
        // 如果 click 失败，尝试直接设置焦点并触发
        input.focus()
        input.click()
      }
    } else {
      console.error('[P1C14] 无法找到文件输入元素，ID:', inputId.value)
    }
  })
}

// 6. [修正] 删除了原文件中所有本地的状态(ref, computed)和处理函数(onFileChange, handleSubmit)
</script>