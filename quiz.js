const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const timer = document.querySelector('#timer');
const scoreText = document.querySelector('#score');

let currentQuestion = {}
let acceptingAnswers = true 
let score = 0 
let questionCounter = 0 
let availibleQuestions = []

let questions = [
    {
        question: "Which statement represents a binary choice?",
        choice1: 'Array', 
        choice2: 'Boolean', 
        choice3: 'Loop', 
        choice4: 'String',
        answer: 2
    }, 
    {
        question: "A sequence of characters, either as a literal constant or as some kind of variable.",
        choice1: 'Thing', 
        choice2: 'Array', 
        choice3: 'Loop', 
        choice4: 'String',
        answer: 4
    },   
    {
        question: "How do you write an IF statement declaring i doesn't equal 10?",
        choice1: 'if (i = !10)', 
        choice2: 'if !(i = 10)', 
        choice3: 'if (i x= 10)', 
        choice4: 'if (i != 10)',
        answer: 4
    },  
    {
        question: "How to call a function called 'example'?",
        choice1: 'function = example', 
        choice2: 'function.example', 
        choice3: 'example()', 
        choice4: '{example}',
        answer: 3
    }, 
    {
        question: "How to add a comment in Javascript?",
        choice1: "<!-- Here's a comment -->", 
        choice2: "\"Here's a comment\"", 
        choice3: "--Here's a comment--", 
        choice4: "//Here's a comment",
        answer: 4
    },    
] 

const SCORE_POINTS = 100 
const MAX_QUESTIONS = 5 

startGame = () => {
    questionCounter = 0
    score = 0
    availibleQuestions = [...questions] 
    getNewQuestion()
}  

getNewQuestion = () => {
    if(availibleQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    } 

    questionCounter++ 

    const questionsIndex = Math.floor(Math.random() * availibleQuestions.length)
    currentQuestion = availibleQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    availibleQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
} 

startGame()

