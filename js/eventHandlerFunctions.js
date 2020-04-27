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

function addEventListenersToGridAxisElements() {
    let interiorGridAxisElements = document.querySelectorAll('.gridHeader')
    interiorGridAxisElements.forEach ((interiorGridAxisElement, index) => {
        if (index !=0) {
        interiorGridAxisElement.addEventListener('click', (e)=>{
            document.querySelector('.errorMessage').textContent = ''
            let noSelected = e.target.dataset.no
            let axisSelected
            if ((e.target.className.indexOf('XAxis')) != -1) {
                axisSelected = 'X'
            } else if ((e.target.className.indexOf('YAxis')) != -1) {
                axisSelected = 'Y'
            }
            selectWholeLine(noSelected, axisSelected)
            })
        }
    })
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

function logKey(e) {
    let re = /^[\d]$/

    let keyChar = String(e.key.replace('key',''))
    console.log (keyChar)
    if (re.test(keyChar)) {
        document.querySelector('.answerDisplay').textContent += keyChar
    }
    if (keyChar === 'Enter') {
        doEnter()
    }
    if (keyChar === 'Backspace') {
        doBackspace()
    }
}