export class EventEmitter {
  #listeners = [];

  on(name, handler) {
    this.#listeners.push({ name, handler });
  }

  emit(eventName, payload) {
    this.#listeners.forEach(({ name, handler }) => {
      if (name === eventName) {
        handler(payload);
      }
    });
  }
}
