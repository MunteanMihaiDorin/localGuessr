import { useRouter } from 'vue-router';

export function HomeViewButtonHandler(registerButton, loginButton) {
  const router = useRouter();

  const handleButtonClick = (route, emit) => {
    registerButton.value.style.animation = "floatOutLeft 2s ease forwards";
    loginButton.value.style.animation = "floatOutRight 2s ease forwards";
    emit('fadeOutLabel');
    setTimeout(() => {
      router.push(route);
    }, 2000);
  };

  return {
    handleButtonClick
  };
}

export function PlayViewButtonHandler(playButton, signOutButton, highScoreDisplay) {
  const router = useRouter();

  const handlePlayButtonClick = () => {
    playButton.value.style.animation = "floatOutDown 2s ease forwards";
    signOutButton.value.style.animation = "floatOutDown 2s ease forwards";
    setTimeout(() => {

    }, 2000);
  };

  const signOut = () => {
    localStorage.removeItem('currentUser');
    playButton.value.style.animation = "floatOutDown 2s ease forwards";
    signOutButton.value.style.animation = "floatOutDown 2s ease forwards";
    highScoreDisplay.value.style.animation = "floatOutLeft 2s ease forwards";
    setTimeout(() => {
      router.replace('/');
    }, 2000);
  };

  return {
    handlePlayButtonClick,
    signOut
  };
}
