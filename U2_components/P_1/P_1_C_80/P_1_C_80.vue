<template>

  <component

    :is="tag"

    :style="[contentStyle, componentStyle]"

    :class="componentClasses"

    :id="elementId"

  >

    <template v-if="descriptionsItems && descriptionsItems.length > 0">

      <template v-for="(item, index) in descriptionsItems" :key="index">

        <dt style="font-weight: bold; color: #fcd34d; padding-top: 0.25rem;">

          {{ item.fileName }} (Score: {{ item.score }})

        </dt>

        <dd

          style="margin-left: 1rem; color: #d1d5db; font-family: monospace; font-size: 0.875rem;"

        >

          {{ item.path }} - [{{ item.type }}]

        </dd>

      </template>

    </template>

    <slot v-else></slot>

  </component>

</template>



<script lang="ts" setup>

import { defineProps } from 'vue';

import { IProps } from './P_1_C_80_inside_Obj';

import { useControl } from './P_1_C_80_control';

import { useComponentStyles } from './P_1_C_80_inside_UI';

import { useDescriptions } from './P_1_C_80_inside_utils';



const props = defineProps<IProps>();

useControl(props);



const { componentStyle } = useComponentStyles(props);

const {

  tag,

  elementId,

  contentStyle,

  componentClasses,

  descriptionsItems,

} = useDescriptions(props);

</script>