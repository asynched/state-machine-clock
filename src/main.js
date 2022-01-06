import Observable from './utils/observables.js'
import { convertToTime } from './utils/time.js'
import { makeStateMachine } from './utils/stateMachines.js'

const counter = Observable(0)
const startButton = document.querySelector('button#start')
const stopButton = document.querySelector('button#stop')
const resetButton = document.querySelector('button#reset')
const counterElement = document.querySelector('p#counter')
const stateMachine = makeStateMachine(counter)

counter.subscribe((state) => {
  counterElement.innerHTML = convertToTime(state)
})

startButton.addEventListener('click', () => stateMachine.start())
stopButton.addEventListener('click', () => stateMachine.stop())
resetButton.addEventListener('click', () => stateMachine.reset())
