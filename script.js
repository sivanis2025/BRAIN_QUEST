const questions = [
  {
    text: "What does HTML stand for?",
    answers: [                                                                                                                                                                                                                                                                                                                                                          
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Human Text Machine Language"
    ],
    correctIndex: 0
  },
  {
    text: "Which tag is used to include JavaScript in HTML?",
    answers: ["<js>", "<javascript>", "<script>", "<code>"],
    correctIndex: 2
  },
  {
    text: "Which property is used to change text color in CSS?",
    answers: ["font-style", "color", "background-color", "text-transform"],
    correctIndex: 1
  },
  {
    text: "Where does JavaScript usually run in a browser?",
    answers: [
      "In the database",
      "On the server only",
      "Inside the browser's JavaScript engine",
      "In the operating system"
    ],
    correctIndex: 2
  }
];

// 2. Get all the elements BrainQuest needs
const startBox = document.getElementById("start-box");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const nextBtn = document.getElementById("next-btn");

const questionNumberSpan = document.getElementById("question-number");
const scoreBadge = document.getElementById("score-badge");
const questionText = document.getElementById("question-text");
const answerButtonsContainer = document.getElementById("answer-buttons");
const resultText = document.getElementById("result-text");

// 3. State variables to remember the current situation
let currentQuestionIndex = 0;
let score = 0;
let answered = false; // true after user picks an answer

// 4. Start the quiz
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", handleNext);

function startQuiz() {
  // Reset state
  currentQuestionIndex = 0;
  score = 0;
  answered = false;

  // Update UI pieces
  scoreBadge.textContent = "Score: " + score;
  nextBtn.disabled = true;

  // Show quiz, hide others
  startBox.classList.add("hidden");
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");

  // Load the first question
  showQuestion();
}

// 5. Show a question on the screen
function showQuestion() {
  answered = false;
  nextBtn.disabled = true;

  // Get the current question
  const currentQuestion = questions[currentQuestionIndex];

  // Show question number (e.g. "Question 1 of 4")
  questionNumberSpan.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  // Show question text
  questionText.textContent = currentQuestion.text;

  // Clear old answer buttons
  answerButtonsContainer.innerHTML = "";

  // Create new answer buttons
  currentQuestion.answers.forEach((answerText, index) => {
    const button = document.createElement("button");
    button.textContent = answerText;
    button.classList.add("btn", "answer");

    // When user clicks an answer
    button.addEventListener("click", () => handleAnswerClick(button, index));

    answerButtonsContainer.appendChild(button);
  });
}

// 6. Handle clicking an answer
function handleAnswerClick(clickedButton, clickedIndex) {
  // If user already answered this question, ignore extra clicks
  if (answered) return;
  answered = true;

  const currentQuestion = questions[currentQuestionIndex];
  const correctIndex = currentQuestion.correctIndex;

  // Mark all buttons as disabled and show correct / wrong colors
  const allButtons = answerButtonsContainer.querySelectorAll("button");
  allButtons.forEach((btn, index) => {
    btn.classList.add("disabled");

    if (index === correctIndex) {
      btn.classList.add("correct");
    }
    if (index === clickedIndex && clickedIndex !== correctIndex) {
      btn.classList.add("wrong");
    }
  });

  // Update score if user was correct
  if (clickedIndex === correctIndex) {
    score++;
    scoreBadge.textContent = "Score: " + score;
  }

  // Now the user can go to the next question
  nextBtn.disabled = false;
}

// 7. Move to the next question or show results
function handleNext() {
  currentQuestionIndex++;

  // If there are more questions, show the next one
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    // Quiz finished – show result box
    showResults();
  }
}

// 8. Show final results
function showResults() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");

  const total = questions.length;
  const percent = Math.round((score / total) * 100);

  let message;
  if (percent === 100) {
    message = "Perfect score! Your brain is on fire! 🔥";
  } else if (percent >= 75) {
    message = "Great job! You really know your stuff. 💡";
  } else if (percent >= 50) {
    message = "Nice try! Keep practicing and you will get there. 💪";
  } else {
    message = "Every expert was once a beginner. Try again and keep learning. 📚";
  }

  resultText.textContent = `You scored ${score} out of ${total} (${percent}%). ${message}`;
}
