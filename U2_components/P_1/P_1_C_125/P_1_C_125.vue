<template>
  <div :class="['node', type, colClass]">
    <div class="node-title">{{ label }}</div>
    <div class="node-body"><slot /></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  label: { type: String, required: true },
  type:  { type: String, default: 'festate' }, // festate / endstate / blockstate
  col:   { type: Number, default: 3 }          // 1~12：宽度按 12 列等分
})
const size = computed(() => Math.min(Math.max(props.col, 1), 12))
const colClass = computed(() => `col-${size.value}`)
</script>
