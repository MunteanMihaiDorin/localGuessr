import { ref, computed } from 'vue';

export function useQuiz() {
  const questions = ref([]);
  const currentQuestionIndex = ref(0);
  const selectedAnswer = ref(null);
  const isSubmitDisabled = ref(true);
  const isQuizCompleted = ref(false);
  const score = ref(0);

  const currentQuestion = computed(() => {
    return questions.value[currentQuestionIndex.value] || null;
  });

  const fetchQuestions = async () => {
    const decodeEntities = (encodedString) => {
      const textArea = document.createElement('textarea');
      textArea.innerHTML = encodedString;
      return textArea.value;
    };

    const response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=boolean&encode=url3986');
    const data = await response.json();
    questions.value = data.results.map(q => ({
      question: decodeEntities(decodeURIComponent(q.question)),
      correct_answer: decodeEntities(decodeURIComponent(q.correct_answer))
    }));
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer.value === questions.value[currentQuestionIndex.value].correct_answer) {
      score.value++;
    }
    currentQuestionIndex.value++;
    if (currentQuestionIndex.value >= questions.value.length) {
      isQuizCompleted.value = true;
    } else {
      selectedAnswer.value = null;
    }
  };

  const resetQuiz = () => {
    currentQuestionIndex.value = 0;
    score.value = 0;
    isQuizCompleted.value = false;
    selectedAnswer.value = null;
  };

  return {
    questions,
    currentQuestion,
    selectedAnswer,
    isSubmitDisabled,
    isQuizCompleted,
    score,
    fetchQuestions,
    handleAnswerSubmit,
    resetQuiz,
  };
}
