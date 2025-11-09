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
              :accept="accept" @change="handleFileChange" title="选择 .mmd 或 .mermaid 文件"
            />
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
import { defineProps, defineEmits, ref } from 'vue';
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
  handleClose,
  handleLoadModule,
} = useControl(props, emit); // [cite: 819-829]

// 4. [修正] 从 _UI 和 _utils 获取样式和ID
const { overlayStyle, dialogStyle, closeBtnStyle, previewTextareaStyle } = useComponentStyles(props); // 
const { inputId, accept } = useIdsAndAccept(props); // 

// 5. [修正] 删除了原文件中所有本地的状态(ref, computed)和处理函数(onFileChange, handleSubmit)
</script>