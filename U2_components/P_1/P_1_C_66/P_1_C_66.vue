<template>

  <div

    ref="scrollbarEl"

    :style="componentStyle"

    :class="scrollbarClasses"

  >

    <pre v-for="(line, index) in props.logLines" :key="index">{{ line }}</pre>

  </div>

</template>



<script lang="ts" setup>

import { defineProps, withDefaults, ref, Ref } from 'vue';

import { IProps } from './P_1_C_66_inside_Obj';

import { useControl } from './P_1_C_66_control';

import { useComponentStyles } from './P_1_C_66_inside_UI';

import { useScrollbar } from './P_1_C_66_inside_utils';



const props = withDefaults(defineProps<IProps>(), {

  logLines: () => [],

});



const scrollbarEl = ref<HTMLElement | null>(null);



const { componentStyle } = useComponentStyles(props);

const { scrollbarClasses } = useScrollbar(props);

useControl(props, scrollbarEl as Ref<HTMLElement | null>);

</script>