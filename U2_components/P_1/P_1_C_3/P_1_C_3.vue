<template>

  <component :is="tag" :style="componentStyle" class="scanline">

    </component>

</template>



<script lang="ts" setup>

import { defineProps } from 'vue';

import { IProps } from './P_1_C_3_inside_Obj';

import { useControl } from './P_1_C_3_control';

import { useComponentStyles } from './P_1_C_3_inside_UI';

import { useContainer } from './P_1_C_3_inside_utils';



const props = defineProps<IProps>();

useControl(props);



const { componentStyle } = useComponentStyles(props);

const { tag } = useContainer(props);

</script>