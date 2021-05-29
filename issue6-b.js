'use strict';

class Member {
  #name
  #point
  constructor(name, point) {
    this.#name = name;
    this.#point = point;
  }

  getPoint() {
    return this.#point
  }
  getName() {
    return this.#name
  }
}

class PointCalculator {
  #results
  #sum

  constructor(name, point) {
    this.#results = []
  }
  valueOf(arrayOfHash) {
    for (let i = 0; i < arrayOfHash.length; i++) {
      let hash = arrayOfHash[i];
      let member = new Member(hash.name, hash.point);
      this.#results.push(member);
    }
  }

  sumPoints() {
    //reduce使って書き換える
    const list = this.getPointList();
    const sum = list.reduce((prev, current) => {
      return prev + current;
    }, 0)
    return sum;
  }

  avaragePoitns() {
    return this.sumPoints()/this.#results.length;
  }

  getPointList() {
    const list = this.#results.map((result) => {
      return result.getPoint();
    })
    return list
  }

  getHighestScore() {
    const list = this.getPointList();
    const highestPoint = list.reduce((prev, current) => {
      return prev > current ? prev : current;
    }, 0);
    const index = list.indexOf(highestPoint);
    return this.#results[index].getName();
  }

  addMember(member) {
    let newMember = new Member(member.name, member.point);
    this.#results.push(newMember);
  }
}

let results = [{name: '鈴木', point: 80}, {name: '田中', point: 92}, {name: '佐藤', point: 75}];


let pointCalculator = new PointCalculator;
pointCalculator.valueOf(results);


console.log("合計得点："+pointCalculator.sumPoints());
console.log("平均得点："+pointCalculator.avaragePoitns());
console.log("最高得点者："+pointCalculator.getHighestScore());

pointCalculator.addMember({name: '阿部', point: 95});
console.log("合計得点："+pointCalculator.sumPoints());
console.log("平均得点："+pointCalculator.avaragePoitns());
console.log("最高得点者："+pointCalculator.getHighestScore());

