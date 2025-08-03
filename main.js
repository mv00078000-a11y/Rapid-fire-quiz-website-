let questions = [];
let currentQuestion = 0;
let score = 0;

const questionBox = document.getElementById("questions");
const nextBtn = document.getElementById("next_btn");

// Fetch quiz questions from OpenTDB
fetch("https://opentdb.com/api.php?amount=10&type=multiple")
  .then((res) => res.json())
  .then((data) => {
    questions = data.results;
    showQuestion();
    console.log(questions)
  });

// Show current question
function showQuestion() {
  const q = questions[currentQuestion];
  const answers = [...q.incorrect_answers, q.correct_answer];
  shuffleArray(answers);

  questionBox.innerHTML = `
    <h2>${q.question}</h2>
    ${answers
      .map((ans) => `<p onclick="checkAnswer(this, '${q.correct_answer}')">${ans}</p>`)
      .join("")}
  `;
  
}

// Shuffle options
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Check selected answer
function checkAnswer(el, correct) {
  const allOptions = document.querySelectorAll("#questions p");
  allOptions.forEach((p) => p.style.pointerEvents = "none");

  if (el.innerText === correct) {
    el.style.backgroundColor = "green";
    el.style.color = "white";
    score++;
  } else {
    el.style.backgroundColor = "red";
    el.style.color = "white";
  }
}

// Next button logic
nextBtn.addEventListener("click", () =>{
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    questionBox.innerHTML = `<h2>🎉 Quiz Completed!</h2> <h3>Your score: ${score}/${questions.length}</h3><style>h3{color:black;}</style>`;
    nextBtn.style.display = "none";
    tryBtn.style.display = `inline`
   T.style.display = `none`
    nextQuestion();
  }
});
function tryAgain() {
  location.reload()
}

let timeLeft = 120;
    let timer = setInterval(updateTimer, 1000);

    function updateTimer() {
      timeLeft--;
      T.innerText = "Time left: " + timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        questionBox.innerHTML = `<h2>⌛Time up</h2>`
        // Optionally move to next question
        tryBtn.style.display = `inline`;
        nextBtn.style.display = `none`;
      }
 
    }
let tryBtn = document.getElementById(`try_btn`)
function nextQuestion() {
      clearInterval(timer); 
    }
let T = document.getElementById("timer");
let errorAudio = document.getElementById(`errorSound`);
if (timeLeft <= 0) {
  errorAudio.play();
}

