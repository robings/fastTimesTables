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

function addEventListenersToGridElements() {
    let interiorGridElements = document.querySelectorAll('.gridInterior')
    interiorGridElements.forEach (interiorGridElement => {
        interiorGridElement.addEventListener('click', (e)=>{
                document.querySelector('.errorMessage').textContent = ''
            if (e.target.style.backgroundColor=='purple') {
                e.target.style.backgroundColor='yellow';
                removeItemFromQuestionsArray(e.target.dataset.x, e.target.dataset.y)
            } else {
                if (questionsArray.length <12) {
                    e.target.style.backgroundColor='purple';
                    let xValue = e.target.dataset.x
                    let yValue = e.target.dataset.y
                    questionsArray.push({x: xValue, y: yValue})

                } else if (questionsArray.length==12) {
                    document.querySelector('.errorMessage').textContent = 'you have already picked 12 questions'
                }
            }
        })
    })
}

function removeItemFromQuestionsArray(x, y) {
    questionsArray.forEach(question => {
        if (question.x==x && question.y==y) {
            questionsArray.splice(questionsArray.indexOf(question), 1)
        }
    })
}

function pickRandomQuestions() {
    let ok=0;

    while (ok===0) {
        clearGrid()
        selectRandomGridSquares()
        for (let i=0; i<questionsArray.length; i++) {
            for (let j=0; j<questionsArray.length; j++) {
                if (j!==i) {
                    if (questionsArray[i]['x']===questionsArray[j]['x'] && questionsArray[i]['y'] === questionsArray[j]['y']) {
                        ok=2
                        break
                    }
                }
            }
            if (ok===2) {
                break
            }
        }
        if (ok===2) {
            ok=0
        } else {
            ok=1
        }
    }
}

function selectRandomGridSquares() {
    for (let i=1; i<13; i++) {
        xRandom=generateRandomNo(startTable, (startTable+11))
        yRandom=generateRandomNo(1,12)

        let interiorGridElements = document.querySelectorAll('.gridInterior')
        interiorGridElements.forEach (interiorGridElement => {

            if (interiorGridElement.dataset.x == xRandom && interiorGridElement.dataset.y == yRandom) {
                interiorGridElement.style.backgroundColor='purple'
                let xValue = interiorGridElement.dataset.x
                let yValue = interiorGridElement.dataset.y
                questionsArray.push({x: xValue, y: yValue})
            }
        })
    }
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

function wipeArray(arr) {
    arr.splice(0, arr.length)
}

function generateRandomNo (minNum, maxNum) {
    return Math.floor(Math.random()*(maxNum-minNum+1)+minNum)
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

function addEventListenersToNumberControls() {
    let numberControls = document.querySelectorAll('.numbers')
    numberControls.forEach(numberControl => {
        numberControl.addEventListener('click', (e) => {
            e.stopImmediatePropagation()
            let numberToEnter = (e.target.dataset.id)
            if (parseInt(numberToEnter) || numberToEnter==0) {
                document.querySelector('.answerDisplay').textContent += numberToEnter
            }
        })
    })
}

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

function getQuestion() {
    document.querySelector('.answerDisplay').textContent = ''
    noOfQuestions ++
    let randomQuestion = generateRandomNo(0, 11)
    xQuestion = questionsArray[randomQuestion]['x']
    yQuestion = questionsArray[randomQuestion]['y']
    document.querySelector('.question').textContent= `${xQuestion} * ${yQuestion} = `

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