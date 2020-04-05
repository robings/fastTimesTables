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