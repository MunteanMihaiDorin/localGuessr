<script setup>
import FlowingText from '@/assets/FlowingText.vue';
import HomeWelcomeLabel from '@/assets/HomeWelcomeLabel.vue';
import HomePageButtons from '@/assets/HomePageButtons.vue';
import { useCursorTracker } from '@/cursorTracker.js';

const {cursorX,cursorY} = useCursorTracker();
</script>

<template>
  <div :style="{'--cursor-x': `${cursorX}px`, '--cursor-y': `${cursorY}px`}" class="backgroundEffect">
    <header>
      <FlowingText text="localGuessr" :animate="true" />
    </header>
    <label>
      <HomeWelcomeLabel />
    </label>
    <main class="main">
      <HomePageButtons />
    </main>
  </div>
</template>

<script>

export default {
  setup() {
    const { cursorX, cursorY } = useCursorTracker();
    return { cursorX, cursorY };
  }
};
</script>

