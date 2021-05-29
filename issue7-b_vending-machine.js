'use strict';

// 本の情報を扱うクラス
class Item {
  // 初期化時に使われるコンストラクタ
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  // nameのゲッター
  getName() {
    return this.name;
  }
  // titleのセッター
  setName(value) {
    this.name = value;
  }
  // priceのゲッター
  getPrice() {
    return this.price;
  }
  // pageSizeのセッター
  setPrice(value) {
    this.price = value;
  }
}

// 本棚として本を格納するクラスの基底クラス
class VendingMachine {
  constructor() {
    this.stock = [];
  }

  static valueOf(arrayOfHash) {
    let vendingMachine = new this;
    for (let i = 0; i < arrayOfHash.length; i++) {
      let hash = arrayOfHash[i];
      let item = new Item(hash.name, hash.price);
      vendingMachine.addItem(item);
    }
    return vendingMachine;
  }

  addItem(item) {
    // 自分自身（this）のcanAddBookメソッドを呼び出す
    if (!this.canAddItem(item)) return false;

    this.stock.push(item);
    return true;
  }

  canAddItem(item) {
    return true;
  }

  buy(productName, cash) {
    const item = this.stock.filter((object) => {
      return object.getName() === productName;
    }).shift();
    const change = cash - item.getPrice();
    if(change >= 0) {
      this.stock.splice(this.stock.indexOf(item), 1);
      return item;
    }
  }

  canBuy(productName) {
    const result = this.stock.find((object) => object.getName() === productName);
    return result !== undefined;//在庫があればtrue
  }
}

let item = [{ name: 'コーラ', price: 120 }, { name: 'お茶', price: 80 }, { name: 'お茶', price: 80 }, { name: 'オレンジジュース', price: 100 }, { name: 'コーラ', price: 120 }]
let vendingMachine = VendingMachine.valueOf(item);

console.log(vendingMachine.buy('お茶', 120));

if(vendingMachine.canBuy('コーラ')) {
  console.log('購入できます');
} else { console.log('購入できません'); }
