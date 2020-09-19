//numurous variables , accessing HTML
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
// 
// var mainEl = document.getElementById("main");
var secondsLeft = 60;
var timeRemaining = [];
function setTime() {
  timeEl.removeAttribute("class", "hide")

var timerInterval = setInterval(function () {
  
  if (secondsLeft > 0) {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " POINTS.";
  }
  else if (secondsLeft === 0) {
    clearInterval(timerInterval);
    timeEl.innerHTML = "Game Over :";
  } else {
    clearInterval(timerInterval);
    timeEl.innerHTML = secondsLeft;
  }
  //form function   

}
  , 1000);
}

// setTime();

//Game begins by clicking start, which activates the timer
function startGame() {

  startButton.setAttribute("class", 'hide')
  askQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.removeAttribute("class", 'hide')
  // grabs next question
  setNextQuestion();
  //starts timer
  setTime();
}

function setNextQuestion() {
  resetState()
  showQuestion(askQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  //this grabs from array of questions
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    //each answer button receives this fun function
    let button = document.createElement('button')
    button.innerText = answer.text
    button.setAttribute("class", 'btn')
    //the following if sets the new attribute of selevted button
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    // select answer on click event
    button.addEventListener('click', selectAnswer)
    //append answer buttons to html
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  //this resets the css on the html
  clearStatusClass(document.body)
  //this hides the next button until next answer is selected
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
    //this sets corresponding buttons of true to css style.
    //this can also dictate right or wrong 
    setStatusClass(button, button.dataset.correct)
  })
  //stop game
  if (askQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  //this exposes end game button
  } else {
    endButton.innerText = 'Stop the Clock!'
    endButton.removeAttribute("class", 'hide')
  }
}
//following functions clears questions and buttons for final name input
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
//was unable to figure out how to manipulate time clock with wrong answers...
function renderScores() {
  scoreList.innerHTML = "";
  scoreCountSpan.textContent = scores.length;
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


scoreForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var scoreText = scoreInput.value.trim();
  if (scoreText === "") {
    return;
  }
  scores.push(scoreText);
  scoreInput.value = "";

  renderScores();
});

scoreList.addEventListener("click", function (event) {
  var element = event.target;

  if (element.matches("button") === true) {

    var index = element.parentElement.getAttribute("data-index");
    scores.splice(index, 1);


    renderScores();
  }
});


//this functions reads answers parameters in the questions array
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  //subsequently changing their class
  } else {
    element.classList.add('wrong')
  }
}
//then clearing them for next question
function clearStatusClass(element) {
  element.classList.remove('correct')

  element.classList.remove('wrong')

}

var questions = [
  {
    question: 'What is the DOM?',
    answers: [
      { text: 'Fast and the Furious character', correct: false },
      { text: 'Tree of Objects, On your Browser', correct: true },
      { text: 'Scary lady in leather', correct: false },
      { text: 'Series of servers, location of a webpage', correct: false }
    ]
  },
  {
    question: 'When traversing; what funtion can help select an element?',
    answers: [
      { text: 'setElement', correct: false },
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
      { text: 'size, weight', correct: false },
      { text: 'element, value', correct: true },
      { text: 'action, function', correct: false },
      { text: 'integer, string', correct: false }
    ]
  }
]