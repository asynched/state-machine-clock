export const makeStateMachine = (counter) => {
  return {
    transitions: {
      idle: ['start'],
      start: ['stop', 'reset'],
      stop: ['reset'],
      reset: ['start'],
    },
    state: {
      current: 'idle',
      interval: null,
    },
    validateState(transition) {
      return this.transitions[this.state.current].includes(transition)
    },
    start() {
      if (!this.validateState('start')) {
        return
      }

      this.state.current = 'start'
      this.state.interval = setInterval(() => {
        counter.set((counter) => counter + 1)
      }, 1000)
    },
    stop() {
      if (!this.validateState('stop')) {
        return
      }

      clearInterval(this.state.interval)
      this.state.current = 'stop'
      this.state.interval = null
    },
    reset() {
      if (!this.validateState('reset')) {
        return
      }

      clearInterval(this.state.interval)
      this.state.current = 'idle'
      this.state.interval = null
      counter.set(0)
    },
  }
}
