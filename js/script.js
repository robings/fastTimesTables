let questionsArray=[]
let startTable=1
let xQuestion = 0
let yQuestion = 0
let noOfQuestions = 0
let score=0
let sets=0
let timerVar

createTimesTableGrid(startTable)
addEventListenersToGridElements()
addEventListenersToGridAxisElements()
document.querySelector('.done').addEventListener('click', startGame)
document.querySelector('.random').addEventListener('click', pickRandomQuestions)
document.querySelector('.clear').addEventListener('click', clearGrid)