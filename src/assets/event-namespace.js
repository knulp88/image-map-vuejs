class EventClass {
  constructor () {
    this.functionMap = {}
  }

  addEventListener (el, event, func) {
    this.functionMap[event] = func
    el.addEventListener(event.split('-')[0], this.functionMap[event])
  }

  removeEventListener (el, event) {
    el.removeEventListener(event.split('-')[0], this.functionMap[event])
    delete this.functionMap[event]
  }
}

export default new EventClass()
