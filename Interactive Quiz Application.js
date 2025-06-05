const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false }
    ]
  },
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true }
    ]
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    answers: [
      { text: "<style>", correct: true },
      { text: "<css>", correct: false },
      { text: "<script>", correct: false },
      { text: "<link>", correct: false }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Creative Style Syntax", correct: false },
      { text: "Computer Style Script", correct: false },
      { text: "Colorful Style Sheets", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score-display");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
  scoreDisplay.innerText = "";
}

function selectAnswer(button, correct) {
  const buttons = answerButtons.children;
  Array.from(buttons).forEach(btn => {
    const isCorrect = questions[currentQuestionIndex].answers.find(
      a => a.text === btn.innerText
    ).correct;
    btn.classList.add(isCorrect ? "correct" : "wrong");
    btn.disabled = true;
  });

  if (correct) score++;
  nextButton.style.display = "inline";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerText = "Quiz Completed!";
  scoreDisplay.innerText = `Your Score: ${score} / ${questions.length}`;
  nextButton.innerText = "Restart";
  nextButton.style.display = "inline";
  nextButton.removeEventListener("click", restartListener);
  nextButton.addEventListener("click", restartListener);
}

function restartListener() {
  startQuiz();
}

startQuiz();
