<script setup>
import FlowingText from '@/assets/FlowingLogo.vue';
import HomeWelcomeLabel from '@/assets/HomeWelcomeLabel.vue';
import HomePageButtons from '@/assets/HomePageButtons.vue';
import { useCursorTracker } from '@/cursorTracker.js';

import '@/assets/animations.css'
import { ref } from 'vue'

const welcomeLabel = ref(null);
const fadeOutLabel = () =>{
  welcomeLabel.value.style.animation='fadeOut 2s forwards';
}

const {cursorX,cursorY} = useCursorTracker();
</script>

<template>
  <div :style="{'--cursor-x': `${cursorX}px`, '--cursor-y': `${cursorY}px`}" class="backgroundEffect">
    <header>
      <FlowingText text="localGuessr" :animate="true" />
    </header>
    <label ref="welcomeLabel">
      <HomeWelcomeLabel />
    </label>
    <main class="main">
      <HomePageButtons @fadeOutLabel="fadeOutLabel"/>
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

