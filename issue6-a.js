'use strict';

class Counter {
  #value
  constructor() {
    this.#value = 0;
  }
  countup() {
    this.#value = this.#value + 1;
  }
  getValue() {
    return this.#value
  }
}

let counter = new Counter;
counter.countup();
console.log(counter.getValue());
counter.countup();
console.log(counter.getValue());