<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';
import { HomeViewButtonHandler } from '@/buttonHandlers.js';
import '@/assets/animations.css';

const registerButton = ref(null);
const loginButton = ref(null);
const emit = defineEmits(['fadeOutLabel']);

const { handleButtonClick } = HomeViewButtonHandler(registerButton, loginButton);
</script>

<template>
  <div class="buttonContainer">
    <button ref="registerButton" class="btn register" @click="() => handleButtonClick('/register', emit)">
      <span class="btn-text">Register</span>
    </button>
    <button ref="loginButton" class="btn login" @click="() => handleButtonClick('/login', emit)">
      <span class="btn-text">Login</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'HomePageButtons'
};
</script>

<style scoped>
.buttonContainer {
  position: fixed;
  bottom: 20px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
}

.register {
  background-color: transparent;
  animation: floatInLeft 2s ease forwards;
  position: absolute;
  left: 20px;
}

.login {
  background-color: transparent;
  animation: floatInRight 2s ease forwards;
  position: absolute;
  right: 20px;
}
</style>
