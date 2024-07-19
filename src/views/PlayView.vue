<script setup>
//import { useRouter } from 'vue-router';
import FlowingText from '@/assets/FlowingLogo.vue';
import { useCursorTracker } from '@/cursorTracker.js';
import { ref, onMounted, watch } from 'vue';
import { PlayViewButtonHandler } from '@/buttonHandlers';
import '@/assets/animations.css';
import '@/assets/main.css';
import '@/assets/playView.css';
import { useQuiz } from '@/quizHandler';
import { getUserHighScore, setUserHighScore } from '@/userManagement.js';

//const router = useRouter();
const { cursorX, cursorY } = useCursorTracker();
const playButton = ref(null);
const signOutButton = ref(null);
const highScoreDisplay = ref(null);
const continueButton= ref(null);
const quizCompletedDiv = ref(null);

const { handlePlayButtonClick, signOut } = PlayViewButtonHandler(playButton, signOutButton, highScoreDisplay);
const highScore = ref(0);

const {
  currentQuestion,
  selectedAnswer,
  isSubmitDisabled,
  isQuizCompleted,
  score,
  fetchQuestions,
  handleAnswerSubmit,
  resetQuiz,
} = useQuiz();

const showQuestionAndAnswers = ref(false);
const questionLabelClass = ref('floatInLeft');
const submitButtonClass = ref('floatInUp');

onMounted(async () => {
  highScore.value = await getUserHighScore();
  await fetchQuestions();
});

watch(selectedAnswer, (newValue) => {
  isSubmitDisabled.value = newValue === null;
});

watch(isQuizCompleted, async (newValue) => {
  if (newValue) {
    if (score.value > highScore.value) {
      highScore.value = score.value;
      await setUserHighScore(highScore.value);
    }
  }
});

const startQuiz = () => {
  resetQuiz();
  handlePlayButtonClick();

  setTimeout(() => {
    playButton.value.style.display = "none";
    signOutButton.value.style.display = "none";
    showQuestionAndAnswers.value = true;
  }, 2000);
};

const submitAnswer = () => {
  questionLabelClass.value = 'floatOutRight';
  setTimeout(() => {
    handleAnswerSubmit();
    questionLabelClass.value = 'floatInLeft';
  }, 2000);
};

const continueQuiz = () => {
  continueButton.value.style.animation = "floatOutDown 2s ease forwards";
  quizCompletedDiv.value.style.animation="floatOutDown 2s ease forwards";
  highScoreDisplay.value.style.animation="floatOutLeft 2s ease forwards";
  setTimeout({
  },2500)
  location.reload();
};
</script>

<template>
  <div :style="{ '--cursor-x': `${cursorX}px`, '--cursor-y': `${cursorY}px` }" class="backgroundEffect">
    <header class="header">
      <FlowingText text="localGuessr" :animate="false" />
      <div ref="highScoreDisplay" class="highScore">High Score: {{ highScore }}</div>
    </header>
    <main class="main">
      <button ref="playButton" class="btn play" @click="startQuiz">
        <span class="btn-text">Play</span>
      </button>
      <div ref="signOutButton" class="signOut" @click="signOut">Sign out</div>

      <div v-if="showQuestionAndAnswers && !isQuizCompleted" :class="`questionLabel ${questionLabelClass}`">{{ currentQuestion?.question }}</div>
      <div v-if="showQuestionAndAnswers && !isQuizCompleted" class="answerContainer">
        <div class="options">
          <div class="radio-wrapper">
            <input type="radio" id="trueRadio" ref="trueRadio" v-model="selectedAnswer" value="True">
            <label for="trueRadio">
              <div class="tick_mark"></div>
            </label>
            <label for="trueRadio" class="label">True</label>
          </div>

          <div class="radio-wrapper">
            <input type="radio" id="falseRadio" ref="falseRadio" v-model="selectedAnswer" value="False">
            <label for="falseRadio">
              <div class="tick_mark"></div>
            </label>
            <label for="falseRadio" class="label">False</label>
          </div>
        </div>
        <button ref="submitButton" :class="`btn submit ${submitButtonClass}`" @click="submitAnswer" :disabled="isSubmitDisabled">
          <span class="btn-text">Submit</span>
        </button>
      </div>

      <div ref="quizCompletedDiv" v-if="isQuizCompleted" class="quizCompleted">
        <h2>You've scored {{ score }}/10 points!</h2>
        <p v-if="score > highScore">New high score!</p>
        <button ref="continueButton" @click="continueQuiz" class="btn restart">Continue</button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.quizCompleted {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 2s ease forwards;
  color: white;
  font-family: 'Roboto', sans-serif;
  text-align: center;
}
</style>
