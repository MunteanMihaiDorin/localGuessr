<template>
<div class="welcomeLabel label">
  Welcome to localGuessr! <br>
  Please log in or create an account to continue.
</div>
</template>

<script>
export default {
  name: "HomeWelcomeLabel",
}
</script>

<style scoped>
.welcomeLabel {
  font-size: 36px;
  animation: fadeIn 2s ease-in-out;
}

@keyframes fadeIn {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}

</style>