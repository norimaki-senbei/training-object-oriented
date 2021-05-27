'use strict';

class Counter {
 constructor() {
   this.count = 0;
 }

 up() {
   this.count = this.count + 1;
 }

 down() {
   this.count = this.count - 1;
 }

 getValue() {
   return this.count;
 }

 resetValue() {
   this.count = 0;
 }

}

let counter1 = new Counter;
let counter2 = new Counter;

console.log("---counter1---");
counter1.up();
console.log(counter1.getValue());
counter1.up();
console.log(counter1.getValue());
counter1.down();
console.log(counter1.getValue());
counter1.resetValue();
console.log(counter1.getValue());

console.log("---counter2---");
counter2.down();
console.log(counter2.getValue());
counter2.down();
console.log(counter2.getValue());
counter2.resetValue();
console.log(counter2.getValue());
counter2.up();
console.log(counter2.getValue());