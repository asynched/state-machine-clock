export const makeStateMachine = (counter) => {
  return {
    // Key -> Current state
    // Array of values -> Possible transitions from that state
    transitions: {
      idle: ['start'],
      start: ['stop', 'reset'],
      stop: ['reset', 'start'],
      reset: ['start'],
    },
    // Initial state of the state machine
    state: {
      current: 'idle',
      interval: null,
    },
    /**
     * Dispatches a transition for the state machine
     * @param { string } transitionTo Desired state to transition to
     */
    dispatchTransition(transitionTo) {
      if (!this.validateTransition(transitionTo)) {
        return
      }

      window.logger.info('Dispatching transition', transitionTo)

      this[transitionTo]()
    },
    /**
     * Validates a state machine transition
     * @param { string } transition Transition to validate
     * @returns { boolean } Whether the transition is valid or not
     */
    validateTransition(transition) {
      return this.transitions[this.state.current].includes(transition)
    },
    /**
     * Start transition for the state machine
     */
    start() {
      this.state.current = 'start'
      this.state.interval = setInterval(() => {
        counter.set((counter) => counter + 1)
      }, 1000)
    },
    /**
     * Stop transition for the state machine
     */
    stop() {
      clearInterval(this.state.interval)
      this.state.current = 'stop'
      this.state.interval = null
    },
    /**
     * Reset transition for the state machine
     */
    reset() {
      clearInterval(this.state.interval)
      this.state.current = 'idle'
      this.state.interval = null
      counter.set(0)
    },
  }
}
