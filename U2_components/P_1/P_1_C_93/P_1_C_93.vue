<template>

  <component

    :is="tag"

    :style="[componentStyle, tagStyle]"

    :class="tagClasses"

    id="dsv-event-out"

  >

    {{ displayText }}

  </component>

</template>



<script lang="ts" setup>

import { defineProps } from 'vue';

import { IProps } from './P_1_C_93_inside_Obj';

import { useControl } from './P_1_C_93_control';

import { useComponentStyles } from './P_1_C_93_inside_UI';

import { useTagLogic } from './P_1_C_93_inside_utils';



const props = defineProps<IProps>();

useControl(props);



const { componentStyle } = useComponentStyles(props);

const { tag, tagStyle, tagClasses, displayText } = useTagLogic(props);

</script>