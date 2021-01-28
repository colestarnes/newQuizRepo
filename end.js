const username = document.querySelector('#username') 
const saveScoreBtn = document.querySelector('#saveScoreBtn') 
const finalScore = document.querySelector('finalScore') 
const mostRecentScore = document.querySelector('#mostRecentScore') 

const highScores = JSON.parse(localStorage.getItem('mostRecentScore')) || []
console.log(highScores)
console.log(finalScore)
const MAX_HIGH_QUESTIONS = 5 

finalScore.innerText = highScores;

username.addEventListener('keyup', () => {
saveScoreBtn.disabled = !username.value
}) 

saveHighScore = e => {
    e.preventDefault() 
    console.log(e)
    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
}