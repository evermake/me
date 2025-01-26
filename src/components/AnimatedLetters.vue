<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'

const props = defineProps<{
  text: string
}>()

const letters = computed(() => props.text.split(''))
</script>

<template>
  <div :class="$style.container">
    <span
      v-for="(letter, idx) in letters"
      :key="idx"
      :style="({ '--i': idx } as CSSProperties)"
    >
      {{ letter }}
    </span>
  </div>
</template>

<style lang="scss" module>
.container {
  display: inline-block;
}

.container > span {
  display: inline-block;
  animation: appear 300ms ease calc(50ms * var(--i)) forwards;
  transform: translateY(-10px) rotateX(-50deg);
  transform-origin: bottom;
  opacity: 0;
}

@keyframes appear {
  0% {
    transform: translateY(-10px) rotateX(-50deg);
    filter: blur(3px);
    opacity: 0;
  }

  100% {
    transform: translateY(0) rotateX(0deg);
    filter: blur(0);
    opacity: 1;
  }
}
</style>
