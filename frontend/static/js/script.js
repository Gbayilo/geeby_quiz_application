document.addEventListener("DOMContentLoaded", () => {
    // Password toggle functionality
    const passwordInput = document.getElementById("password");
    const togglePasswordBtn = document.getElementById("toggle-password");
  
    togglePasswordBtn.addEventListener("click", () => {
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
  
      // Change the icon/text for the button
      togglePasswordBtn.textContent = type === "password" ? "👁️" : "🙈";
    });
  
    // Basic form validation
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (e) => {
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
  
      if (!email || !password) {
        e.preventDefault();
        alert("Please fill in all fields.");
      } else if (password.length < 6) {
        e.preventDefault();
        alert("Password must be at least 6 characters long.");
      }
    });
  });
  
  // List of quiz questions for General Knowledge
const quizQuestions = [
  {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris"
  },
  {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Jupiter", "Mars", "Saturn"],
      answer: "Jupiter"
  },
  {
      question: "Who wrote the play 'Romeo and Juliet'?",
      options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
      answer: "William Shakespeare"
  }
  // More questions can be added here
];

let currentQuestionIndex = 0;
let totalTime = 30; // Total time for the entire quiz in seconds
let timeLeft = totalTime; // Time left for the quiz
let quizTimer;
let quizStarted = false;

// Start the quiz by hiding the time limit message, starting the countdown and loading questions
function startQuiz() {
  document.getElementById("time-limit-warning").style.display = "none";
  document.querySelector(".quiz-start-button").style.display = "none";
  document.getElementById("quiz-questions").classList.remove("hidden");

  startTimer();
  loadQuestion();
}

// Start the global timer
function startTimer() {
  quizTimer = setInterval(function() {
      if (timeLeft > 0) {
          timeLeft--;
          document.getElementById("time-remaining").innerText = timeLeft;
      } else {
          clearInterval(quizTimer);
          alert("Time's up! The quiz has ended.");
          endQuiz();
      }
  }, 1000);
}

// Load the next question
function loadQuestion() {
  if (currentQuestionIndex < quizQuestions.length) {
      const currentQuestion = quizQuestions[currentQuestionIndex];
      const questionHTML = `
          <div class="question">
              <h3>${currentQuestion.question}</h3>
              <div class="options">
                  ${currentQuestion.options.map((option, index) => `
                      <button class="option-btn" onclick="checkAnswer('${option}')">${option}</button>
                  `).join('')}
              </div>
          </div>
      `;
      document.getElementById("quiz-questions").innerHTML = questionHTML;
  } else {
      alert("Congratulations, you've completed the quiz!");
      endQuiz();
  }
}

// Check if the selected answer is correct
function checkAnswer(selectedAnswer) {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  if (selectedAnswer === currentQuestion.answer) {
      alert("Correct!");
  } else {
      alert("Incorrect! The correct answer was: " + currentQuestion.answer);
  }
  nextQuestion();
}

// Move to the next question
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
      loadQuestion();
  } else {
      alert("You've completed the quiz! Well done.");
      endQuiz();
  }
}

// End the quiz and show the result
function endQuiz() {
  document.getElementById("quiz-questions").innerHTML = "<p>The quiz has ended. Thank you for participating!</p>";
  document.getElementById("timer").style.display = "none"; // Hide the timer
}
