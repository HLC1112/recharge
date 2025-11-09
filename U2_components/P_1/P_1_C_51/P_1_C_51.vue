<template>

  <div

    ref="scrollbarEl"

    :style="componentStyle"

    :class="scrollbarClasses"

  >

    <div v-for="(entry, index) in props.entries" :key="index">

      {{ entry }}

    </div>

  </div>

</template>



<script lang="ts" setup>

import { defineProps, withDefaults, ref, Ref } from 'vue';

import { IProps } from './P_1_C_51_inside_Obj';

import { useControl } from './P_1_C_51_control';

import { useComponentStyles } from './P_1_C_51_inside_UI';

import { useScrollbar } from './P_1_C_51_inside_utils';



const props = withDefaults(defineProps<IProps>(), {

  entries: () => [],

});



const scrollbarEl = ref<HTMLElement | null>(null);



const { componentStyle } = useComponentStyles(props);

const { scrollbarClasses } = useScrollbar(props);

useControl(props, scrollbarEl as Ref<HTMLElement | null>);

</script>