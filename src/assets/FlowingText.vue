<template>
  <div :class="{'flowing-text': true, 'animate': animate, 'static': !animate}">
    <span v-for="(letter, index) in splitText" :key="index" class="letter" :style="{ animationDelay: `${index * 0.1}s` }">
      {{ letter }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'FlowingText',
  props: {
    text: {
      type: String,
      required: true,
    },
    animate: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    splitText() {
      return this.text.split('');
    },
  },
};
</script>

<style scoped>
@keyframes flowingColor {
  0% {
    color: #30cfd0;
  }
  10% {
    color: #46b8d8;
  }
  30% {
    color: #5da2df;
  }
  40% {
    color: #738be6;
  }
  50% {
    color: #8a74ed;
  }
  60% {
    color: #5d0ebe;
  }
  70% {
    color: #8a74ed;
  }
  80% {
    color: #738be6;
  }
  90% {
    color: #46b8d8;
  }
  100% {
    color: #30cfd0;
  }
}

@keyframes moveAndShrink {
  0% {
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    top: 0;
    left: -5%;
    transform: translate(0, 0) scale(0.5);
  }
}

.flowing-text {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.flowing-text.animate {
  animation: moveAndShrink 2s forwards;
}

.flowing-text.static {
  top: 0;
  left: -5% ;
  transform: translate(0, 0) scale(0.5);
}

.flowing-text .letter {
  display: inline-block;
  animation: flowingColor 5s infinite;
}
</style>
