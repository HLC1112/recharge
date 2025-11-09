<template>
  <section class="plane">
    <span class="plane-title-text">{{ title }}</span>
    <div class="plane-grid-container">
      <slot />
    </div>
  </section>
</template>

<script setup>
defineProps({ title: { type: String, required: true } })
</script>
