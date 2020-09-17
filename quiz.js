var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var endButton = document.getElementById("end-btn")
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var timeEl = document.getElementById('timer');
var landPage = document.getElementById('landing')
var scorePage = document.getElementById('scores')

startButton.addEventListener('click', startGame)
startButton.addEventListener('click', setTime)
startButton.addEventListener('click', hideLanding)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
endButton.addEventListener('click', endGame)

function hideLanding() {
  landPage.setAttribute("class", 'hide')
}

// var mainEl = document.getElementById("main");
var secondsLeft = 60;

function setTime() {
  timeEl.removeAttribute("class", "hide")
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " POINTS.";
    if (secondsLeft <= 0 ) {
      clearInterval(timerInterval);
      timeEl.innerHTML = "Game Over";
      //form function   
    }
  }, 10000);

}
// setTime();


function startGame() {

  startButton.setAttribute("class", 'hide')
  askQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.removeAttribute("class", 'hide')
  setNextQuestion();
  setTime();
}

function setNextQuestion() {
  resetState()
  showQuestion(askQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    let button = document.createElement('button')
    button.innerText = answer.text
    button.setAttribute("class", 'btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.setAttribute("class", 'hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(event) {
  var selectedButton = event.target;
  var correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  //stop game
  if (askQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')

  } else {
    endButton.innerText = 'Stop the Clock!'
    endButton.removeAttribute("class", 'hide')
  }
}

function endGame() {
  questionContainerElement.setAttribute("class", "hide")
  scorePage.removeAttribute("class", "hide")
  endButton.setAttribute("class", 'hide')
}

var scoreInput = document.querySelector('#score-text');
var scoreForm = document.querySelector('#score-form');
var scoreList = document.querySelector('#score-list');
var scoreCountSpan = document.querySelector('#score-count');
var scoreDiv = document.querySelector('scores');
var scores = [];

// init();


  renderScores();

var scores = [];

function renderScores() {
  
  // Clear todoList element and update todoCountSpan
  scoreList.innerHTML = "";
  scoreCountSpan.textContent = scores.length;

  // Render a new li for each score
  for (var i = 0; i < scores.length; i++) {
    var score = scores[i];

    var li = document.createElement("li");
    li.textContent = score;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Complete";

    li.appendChild(button);
    scoreList.appendChild(li);
  }
}

// When form is submitted...
scoreForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var scoreText = scoreInput.value.trim();

  // Return from function early if submitted todoText is blank
  if (scoreText === "") {
    return;
  }

  // Add new todoText to todos array, clear the input
  scores.push(scoreText);
  scoreInput.value = "";

  // Store updated todos in localStorage, re-render the list

  renderScores();
});

// When a element inside of the todoList is clicked...
scoreList.addEventListener("click", function (event) {
  var element = event.target;

  // If that element is a button...
  if (element.matches("button") === true) {
    // Get its data-index value and remove the todo element from the list
    var index = element.parentElement.getAttribute("data-index");
    scores.splice(index, 1);

    // Store updated todos in localStorage, re-render the list
        renderScores();
  }
});


function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
  element
}

var questions = [
  {
    question: 'What is the DOM?',
    answers: [
      { text: 'Fast and the Furious character', correct: true },
      { text: 'Tree of Objects, On your Browser', correct: true },
      { text: 'Scary lady in leather', correct: true },
      { text: 'Series of servers, location of a webpage', correct: false }
    ]
  },
  {
    question: 'When traversing; what funtion can help select an element?',
    answers: [
      { text: 'setElement', correct: true },
      { text: 'querySelector', correct: true },
      { text: 'getElementById', correct: true },
      { text: 'pickThatOne', correct: false }
    ]
  },
  {
    question: 'What can execute a block of code, repeatedly?',
    answers: [
      { text: 'a Loop', correct: true },
      { text: 'an Array', correct: false },
      { text: 'an Object', correct: false },
      { text: 'an Element', correct: false }
    ]
  },
  {
    question: 'What 2 variables must be added when using setAttribute?',
    answers: [
      { text: 'action, function', correct: false },
      { text: 'element, value', correct: true },
      { text: 'action, function', correct: false },
      { text: 'element, value', correct: true }
    ]
  }
]