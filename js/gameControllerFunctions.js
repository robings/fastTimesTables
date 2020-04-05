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

function wipeArray(arr) {
    arr.splice(0, arr.length)
}

function generateRandomNo (minNum, maxNum) {
    return Math.floor(Math.random()*(maxNum-minNum+1)+minNum)
}

function getQuestion() {
    document.querySelector('.answerDisplay').textContent = ''
    noOfQuestions ++
    let randomQuestion = generateRandomNo(0, 11)
    xQuestion = questionsArray[randomQuestion]['x']
    yQuestion = questionsArray[randomQuestion]['y']
    document.querySelector('.question').textContent= `${xQuestion} * ${yQuestion} = `

}