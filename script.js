/* Computer Basics Quiz — one question at a time, final score at the end. */

const questions = [
  {
    question: "What does CPU stand for?",
    options: [
      "Central Program Utility",
      "Central Processing Unit",
      "Computer Personal Unit",
      "Control Processing Unit",
    ],
    answer: 1,
  },
  {
    question: "Which of these is a type of volatile memory?",
    options: ["Hard disk", "ROM", "RAM", "USB flash drive"],
    answer: 2,
  },
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "High-Level Text Machine Language",
      "Hyperlink Text Management Language",
      "Home Tool Markup Language",
    ],
    answer: 0,
  },
  {
    question: 'Which part of a computer is often called its "brain"?',
    options: ["Monitor", "Keyboard", "Power supply", "CPU"],
    answer: 3,
  },
  {
    question: "Which of these is an operating system?",
    options: ["Microsoft Word", "Windows", "Google Chrome", "Adobe Photoshop"],
    answer: 1,
  },
  {
    question: "Which device is mainly used to type text into a computer?",
    options: ["Monitor", "Speaker", "Keyboard", "Printer"],
    answer: 2,
  },
  {
    question: 'What does "WWW" stand for?',
    options: [
      "World Wide Web",
      "Wide World Web",
      "World Web Work",
      "Web World Wide",
    ],
    answer: 0,
  },
  {
    question: "Which unit is used to measure computer storage capacity?",
    options: ["Hertz", "Pixel", "Watt", "Gigabyte"],
    answer: 3,
  },
];

const total = questions.length;

const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionCount = document.getElementById("question-count");
const questionBlock = document.getElementById("question-block");
const questionText = document.getElementById("question-text");
const optionsBox = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreRing = document.getElementById("score-ring");
const scoreValue = document.getElementById("score-value");
const retakeBtn = document.getElementById("retake-btn");

let current = 0;
let selected = null;
const answers = [];

/* Show one question with its options. */
function renderQuestion() {
  const item = questions[current];
  selected = answers[current] ?? null;

  questionCount.textContent = `Question ${current + 1} of ${total}`;
  questionText.textContent = item.question;

  optionsBox.innerHTML = item.options
    .map(
      (text, index) => `
        <label class="option">
          <input type="radio" name="answer" value="${index}"
            ${index === selected ? "checked" : ""} />
          <span class="radio" aria-hidden="true"></span>
          <span class="option-text">${text}</span>
        </label>`
    )
    .join("");

  nextBtn.disabled = selected === null;
  nextBtn.textContent = current === total - 1 ? "See Results" : "Next Question";

  // Replay the entrance animation.
  questionBlock.classList.remove("is-entering");
  void questionBlock.offsetWidth;
  questionBlock.classList.add("is-entering");
}

/* Move to the next question, or show the score at the end. */
function handleNext() {
  if (selected === null) return;

  answers[current] = selected;

  if (current === total - 1) {
    showResults();
    return;
  }

  current += 1;
  renderQuestion();
}

function showResults() {
  const score = questions.filter((q, i) => answers[i] === q.answer).length;
  const percent = Math.round((score / total) * 100);

  scoreValue.textContent = `${score} / ${total}`;

  quizScreen.hidden = true;
  resultScreen.hidden = false;

  // Animate the ring from 0 to the final percentage.
  scoreRing.style.setProperty("--p", "0");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scoreRing.style.setProperty("--p", percent);
    });
  });
}

function restartQuiz() {
  current = 0;
  selected = null;
  answers.length = 0;

  resultScreen.hidden = true;
  quizScreen.hidden = false;

  renderQuestion();
}

/* Event listeners */
optionsBox.addEventListener("change", (event) => {
  if (event.target.name !== "answer") return;
  selected = Number(event.target.value);
  nextBtn.disabled = false;
});

nextBtn.addEventListener("click", handleNext);
retakeBtn.addEventListener("click", restartQuiz);

renderQuestion();
