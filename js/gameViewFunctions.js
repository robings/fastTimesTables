function createTimesTableGrid(startingTable) {
    let endingTable = startingTable+11
    let htmlBuild='<div class="gridHeader"></div>'

    for (let i=startingTable; i<endingTable+1; i++) {

        htmlBuild+=`<div class="gridHeader">${i}</div>`
    }

    for (let i=startingTable-startingTable+1; i<endingTable-startingTable+2; i++) {
        htmlBuild+=`<div class="gridHeader">${i}</div>`

        for (let j=startingTable; j<endingTable+1; j++) {
            htmlBuild+=`<div class="gridInterior" data-x="${j}" data-y="${i}">${i*j}</div>`
        }
    }
    document.querySelector('.timesTableGrid').innerHTML=htmlBuild
}

function clearGrid() {
    if (questionsArray.length > 0) {
        wipeArray(questionsArray)
        let interiorGridElements = document.querySelectorAll('.gridInterior')
        interiorGridElements.forEach (interiorGridElement => {
            if (interiorGridElement.style.backgroundColor == 'purple') {
                interiorGridElement.style.backgroundColor = 'yellow';
            }
        })
    }
}

function startGame() {

    if (questionsArray.length < 12) {
        document.querySelector('.errorMessage').textContent = 'choose 12 questions'
    } else {
        document.querySelector('.questionSelector').style.display = 'none';
        document.querySelector('.playGame').style.display = 'block';
        document.querySelector('.errorMessage').textContent = ''
        document.querySelector('.instructions').textContent = 'answer as many questions as you can in one minute'
        positionScoreBox()
        document.querySelector('.back').addEventListener('click', backToQuestionSelector)
        addEventListenersToNumberControls()
        document.querySelector('.backspace').addEventListener('click', doBackspace)
        document.querySelector('.enter').addEventListener('click', doEnter)
        score = 0
        noOfQuestions=0
        sets = 0
        positionScoreBox()
        positionSetBox()
        getQuestion()
        document.querySelector('.timer').style.backgroundColor = 'lawngreen'
        document.querySelector('.timerSecs').textContent='60'
        setTimer(60)
    }
}

function backToQuestionSelector() {
    document.querySelector('.errorMessage').textContent = ''
    document.querySelector('.instructions').textContent = 'click twelve numbers'
    document.querySelector('.playGame').style.display = 'none';
    document.querySelector('.questionSelector').style.display = 'block';
    clearInterval(timerVar)
}

function positionScoreBox() {
    let scoreBoxes = document.querySelectorAll('.score')
    scoreBoxes.forEach(scoreBox => {
        if (scoreBox.textContent == score%12) {
            scoreBox.style.borderColor = 'black'
        } else if (scoreBox.style.borderColor == 'black') {
            scoreBox.style.borderColor = 'transparent'
        }
    })
}

function positionSetBox() {
    let setBoxes = document.querySelectorAll('.set')
    let i
    if (sets==0) {
        i=1
    } else if (sets%5==1 && sets != 1) {
        i=sets
    }
    if (i) {
    setBoxes.forEach(setBox => {
            setBox.textContent=i
            i++
    })
    }
    setBoxes.forEach(setBox => {
        if (setBox.textContent == sets) {
            setBox.style.borderColor = 'black'
        } else if (setBox.style.borderColor == 'black') {
            setBox.style.borderColor = 'transparent'
        }
    })
}

function setTimer(countdown) {
    timerVar = setInterval(() => {
        countdown--
        let countdownDisplay = countdown < 10? '0'+countdown: countdown
        document.querySelector('.timerSecs').textContent=countdownDisplay
        if (countdown <= 10  && countdown > 5) {
            document.querySelector('.timer').style.backgroundColor = 'gold'
        } else if (countdown <= 5) {
            document.querySelector('.timer').style.backgroundColor = 'red'
        }
        if (countdown==0) {
            clearInterval(timerVar)
            gameOver()
        }
    }, 1000)
}

function gameOver() {
    document.querySelector('.setScore').textContent = `${sets} set${sets==1 ? '' : 's'}`
    document.querySelector('.pointsScore').textContent = `${score%12} point${score%12==1 ? '' : 's'}`
    document.querySelector('.totalScore').textContent = `${score} / ${(noOfQuestions-1)}`
    document.querySelector('.percentScore').textContent = `${Math.round((score/(noOfQuestions-1))*100)} %`
    document.querySelector('.gameOver').style.display='block'
}