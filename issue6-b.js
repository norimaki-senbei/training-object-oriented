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
  #members
  constructor(name, point) {
    this.#members = []
  }
  valueOf(initialMembers) {
    for (let i = 0; i < initialMembers.length; i++) {
      let initialMember = initialMembers[i];
      let member = new Member(initialMember.name, initialMember.point);
      this.#members.push(member);
    }
  }

  sumPoints() {
    //reduce使って書き換える
    return this.#members.reduce((total, current) => total + current.getPoint(), 0);
  }

  avaragePoitns() {
    return this.sumPoints()/this.#members.length;
  }

  getHighestScore() {
    function compareFunc(a, b) {
     return b.getPoint() - a.getPoint();
    }
    const sort = this.#members.sort(compareFunc)
    return sort[0].getName();
  }

  addMember(member) {
    const newMember = new Member(member.name, member.point);
    this.#members.push(newMember);
  }
}

const memberData = [{name: '鈴木', point: 80}, {name: '田中', point: 92}, {name: '佐藤', point: 75}];


const pointCalculator = new PointCalculator;
pointCalculator.valueOf(memberData);


console.log("合計得点："+pointCalculator.sumPoints());
console.log("平均得点："+pointCalculator.avaragePoitns());
console.log("最高得点者："+pointCalculator.getHighestScore());

pointCalculator.addMember({name: '阿部', point: 95});
console.log("合計得点："+pointCalculator.sumPoints());
console.log("平均得点："+pointCalculator.avaragePoitns());
console.log("最高得点者："+pointCalculator.getHighestScore());

