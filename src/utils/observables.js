const Observable = (state) => {
  let internalState = state
  const middlewares = []
  const subscribers = []
  const subscribe = (subscriber) => subscribers.push(subscriber)
  const use = (middleware) => middlewares.push(middleware)
  const map = (handler) => Observable(handler(internalState))
  const update = () => set(internalState)
  const handleSetByValue = (newState) => {
    for (const middleware of middlewares) {
      let exit = true
      middleware(internalState, newState, () => {
        exit = false
      })
      if (exit) {
        return
      }
    }
    internalState = newState
    subscribers.forEach((subscriber) => subscriber(internalState))
  }
  const handleSetByHandler = (newStateHandler) => {
    const newState = newStateHandler(internalState)
    handleSetByValue(newState)
  }
  const get = () => internalState
  const set = (newStateOrHandler) => {
    if (typeof newStateOrHandler === 'function') {
      return handleSetByHandler(newStateOrHandler)
    }
    return handleSetByValue(newStateOrHandler)
  }
  return {
    get,
    set,
    use,
    map,
    update,
    subscribe,
  }
}

export default Observable
