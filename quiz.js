var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var timeEl = document.getElementById('timer');
var landPage = document.getElementById('landing')

startButton.addEventListener('click', startGame)
startButton.addEventListener('click', setTime)
startButton.addEventListener('click', hideLanding)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function hideLanding(){
  landPage.setAttribute("class", 'hide')
}

// var mainEl = document.getElementById("main");
var secondsLeft = 10;
function setTime() {
  timeEl.removeAttribute("class", "hide")
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " POINTS.";
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      timeEl.innerHTML = "Game Over";   
      //form function   
    }
  }, 1000);

}
// setTime();


function startGame() {
  startButton.setAttribute("class", 'hide')
  askQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.removeAttribute("class", 'hide')
  setNextQuestion()
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
    startButton.innerText = 'Stop the Clock!'
    startButton.removeAttribute("class", 'hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.setAttribute("class", 'correct')
  } else {
    element.setAttribute("class", 'wrong')
  }
}

function clearStatusClass(element) {
  element.removeAttribute("class", 'correct')
  element.removeAttribute("class", 'wrong')
}

var questions = [
  {
    question: 'What is the DOM?',
    answers: [
      { text: 'Fast and the Furious character', correct: true },
      { text: 'Tree of Objects, On your Browser', correct: true },
      { text: 'Scary lady in leather', correct: true },
      { text: 'Series of servers, location of a webpage', correct: true }
    ]
  },
  {
    question: 'When traversing; what funtion can help select an element?',
    answers: [
      { text: 'setElement', correct: true },
      { text: 'querySelector', correct: true },
      { text: 'getElementById', correct: true },
      { text: 'pickThatOne', correct: true }
    ]
  },
  {
    question: 'What can execute a block of code, repeatedly?',
    answers: [
      { text: 'a Loop', correct: false },
      { text: 'an Array', correct: true },
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