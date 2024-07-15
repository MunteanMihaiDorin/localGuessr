<script setup>
import FlowingText from '@/assets/FlowingText.vue';
import { useCursorTracker } from '@/cursorTracker.js';
import { login } from '@/userManagement.js';
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const { cursorX, cursorY } = useCursorTracker();
const router = useRouter();

const username = ref('');
const password = ref('');

function handleLogin() {
  const success = login(username.value, password.value);
  if (success) {
    router.push('/play');
  }
}
</script>

<template>
  <div :style="{ '--cursor-x': `${cursorX}px`, '--cursor-y': `${cursorY}px` }" class="backgroundEffect">
    <header>
      <FlowingText text="localGuessr" :animate="false" />
    </header>
    <main class="main">
      <div class="formContainer">
        <h2 class="label">Login</h2>
        <form @submit.prevent="handleLogin">
          <input type="text" id="username" v-model="username" required class="input" placeholder="Username" />
          <input type="password" id="password" v-model="password" required class="input" placeholder="Password" />
          <button type="submit" class="btn"><span class="btn-text">Login</span></button>
        </form>
      </div>
    </main>
  </div>
</template>

<style scoped>
.formContainer {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.3); /* Adjusted for opacity */
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: transparent;
  border: rgba(255, 255, 255, 0.3) 1px solid;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  color: white; /* Change the input text color */
}

.input::placeholder {
  color: rgba(255, 255, 255, 1);
}

button {
  display: block;
  width: 100%;
  margin-top: 20px;
}
</style>
