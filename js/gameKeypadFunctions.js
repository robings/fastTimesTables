
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

        if (score%12 == 0  && !noOfQuestions <12) {
            sets++
            positionSetBox()
        }

        positionScoreBox()

        console.log('Answer: ' + currentAnswer)
        console.log('Score: ' + score + '\\' + noOfQuestions)
        console.log('Sets: ' + sets)
        getQuestion()
    } else {
        document.querySelector('.errorMessage').textContent = 'please put in an answer'
    }
}