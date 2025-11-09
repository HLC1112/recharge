<template>

  <component

    :is="tag"

    v-if="props.visible"

    :style="componentStyle"

    :id="elementId"

  >

    <div

      style="

        color: #fcd34d;

        font-weight: bold;

        margin-bottom: 0.5rem;

        padding-left: 0.5rem;

      "

    >

      {{ textContent }}

    </div>

    <slot></slot>

  </component>

</template>



<script lang="ts" setup>

import { defineProps } from 'vue';

import { IProps } from './P_1_C_79_inside_Obj';

import { useControl } from './P_1_C_79_control';

import { useComponentStyles } from './P_1_C_79_inside_UI';

import { useContainer } from './P_1_C_79_inside_utils';



const props = defineProps<IProps>();

useControl(props);



const { componentStyle } = useComponentStyles(props);

const { tag, elementId, textContent } = useContainer(props);

</script>