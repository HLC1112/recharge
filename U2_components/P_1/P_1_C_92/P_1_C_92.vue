<template>

  <component

    :is="tag"

    :style="componentStyle"

    :class="componentClasses"

    id="dsv-event-in"

  >

    {{ props.eventData?.id || 'IN' }}

  </component>

</template>



<script lang="ts" setup>

import { defineProps } from 'vue';

import { IProps } from './P_1_C_92_inside_Obj';

import { useControl } from './P_1_C_92_control';

import { useComponentStyles } from './P_1_C_92_inside_UI';

import { useTag } from './P_1_C_92_inside_utils';



const props = defineProps<IProps>();

useControl(props);

const { componentStyle, componentClasses } = useComponentStyles(props);

const { tag } = useTag(props);

</script>