
function doBackspace() {
    let currentAnswer = document.querySelector('.answerDisplay').textContent
    if (currentAnswer) {
        let updatedAnswer = currentAnswer.slice(0, -1)
        document.querySelector('.answerDisplay').textContent = updatedAnswer
    }
}

function doEnter() {
    document.querySelector('.errorMessage').textContent = ''
    let currentAnswer = document.querySelector('.answerDisplay').textContent
    if (currentAnswer) {
        if (currentAnswer == xQuestion * yQuestion) {
            score+=1
        }

        if (score%12 == 0  && score !=0) {
            sets++
            positionSetBox()
        }

        positionScoreBox()
        getQuestion()
    } else {
        document.querySelector('.errorMessage').textContent = 'please put in an answer'
    }
}