<template>

  <button

    :id="buttonId"

    :style="componentStyle"

    :class="buttonClasses"

    :disabled="props.disabled"

    @click="handleClick"

  >

    {{ buttonText }}

    <input

      ref="inputRef"

      type="file"

      webkitdirectory

      multiple

      :style="{ display: 'none' }"

      @change="handleChange"

      :disabled="props.disabled"

    />

  </button>

</template>



<script lang="ts" setup>

import { defineProps, defineEmits } from 'vue';

import { IProps, IEmits } from './P_1_C_73_inside_Obj';

import { useControl } from './P_1_C_73_control';

import { useComponentStyles } from './P_1_C_73_inside_UI';

import { useUpload } from './P_1_C_73_inside_utils';



const props = defineProps<IProps>();

const emit = defineEmits<IEmits>();



const { componentStyle } = useComponentStyles(props);

const { buttonId, buttonClasses, buttonText } = useUpload(props);

const { inputRef, handleClick, handleChange } = useControl(props, emit);

</script>