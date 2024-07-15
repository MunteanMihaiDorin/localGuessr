<script setup>
import {RouterLink} from 'vue-router'
</script>

<template>
  <div class="buttonContainer">
    <RouterLink to="/register">
    <button class="btn register"> <span class="btn-text"> Register </span></button>
    </RouterLink>
    <RouterLink to="/login">
    <button class="btn login"><span class="btn-text">Login</span></button>
    </RouterLink>
  </div>
</template>

<script>
export default{
  name:'HomePageButtons',
};
</script>

<style scoped>
.buttonContainer{
  position:fixed;
  bottom:20px;
  left: 0;
  width:100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing:border-box;

}

.register{
  background-color:transparent;
  animation: floatInLeft 2s ease forwards;
  position: absolute;
  left:20px;
}

.login{
  background-color: transparent;
  animation: floatInRight 2s ease forwards;
  position: absolute;
  right: 20px;

}

@keyframes floatInLeft {
  0%{
    transform:translateX(-200%);
  }
  100%{
    transform: translateX(0);
  }
}

@keyframes floatInRight {
  0%{
    transform:translateX(200%);
}
  100% {
    transform: translateX(0);
  }
}

</style>