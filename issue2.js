'use strict';

class Counter {
 constructor() {
   this.count = 0;
 }

 up() {
   this.count = this.count + 1;
 }

 getValue() {
   return this.count;
 }
}

let counter = new Counter;
counter.up();
console.log(counter.getValue());
counter.up();
console.log(counter.getValue());