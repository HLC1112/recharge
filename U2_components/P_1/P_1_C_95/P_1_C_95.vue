<template>

  <component :is="tag" :style="componentStyle" :class="componentClasses">

    <div v-for="(entry, index) in props.logEntries" :key="index">

      {{ entry.timestamp }} [{{ entry.level }}]: {{ entry.message }}

    </div>

  </component>

</template>



<script lang="ts" setup>

import { defineProps } from 'vue';

import { IProps } from './P_1_C_95_inside_Obj';

import { useControl } from './P_1_C_95_control';

import { useComponentStyles } from './P_1_C_95_inside_UI';

import { useScrollbar } from './P_1_C_95_inside_utils';



const props = defineProps<IProps>();

useControl(props);

const { componentStyle, componentClasses } = useComponentStyles(props);

const { tag } = useScrollbar(props);

</script>