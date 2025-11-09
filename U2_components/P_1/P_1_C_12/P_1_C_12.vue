<template>

  <component

    :is="tag"

    :id="elementId"

    :style="componentStyle"

    :class="elementClasses"

    :value="props.modelValue"

    :disabled="props.disabled"

    :placeholder="placeholder"

    @input="handleInput"

  />

</template>



<script lang="ts" setup>

import { defineProps, defineEmits } from 'vue';

import { IProps } from './P_1\_C\_12\_inside_Obj';

import { useControl } from './P_1\_C\_12\_control';

import { useComponentStyles } from './P_1\_C\_12\_inside_UI';

import { useInput } from './P_1\_C\_12\_inside_utils';



const props = defineProps<IProps>();

const emit = defineEmits(['update:modelValue']);



const { handleInput } = useControl(props, emit);

const { componentStyle } = useComponentStyles(props);

const { tag, elementId, elementClasses, placeholder } = useInput(props);

</script>