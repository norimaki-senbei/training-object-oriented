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

  static valueOf(initialItems) {
    let vendingMachine = new this;
    for (let i = 0; i < initialItems.length; i++) {
      let initialItem = initialItems[i];
      let item = new Item(initialItem.name, initialItem.price);
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
    try{
      if(!this.canBuy(productName)) { throw new Error('在庫がないよ'); }
      const item = this.stock.filter((object) => {
        return object.getName() === productName;
      }).shift();
      const change = cash - item.getPrice();

      if(change < 0) { throw new Error('お金が足りないよ'); }

      this.stock.splice(this.stock.indexOf(item), 1);
      return item;

    } catch(err) {
      console.log(err);
    }

  }

  canBuy(productName) {
    const result = this.stock.find((object) => object.getName() === productName);
    return result !== undefined;//在庫があればtrue
  }
}

const itemData = [{ name: 'コーラ', price: 120 }, { name: 'お茶', price: 80 }, { name: 'お茶', price: 80 }, { name: 'オレンジジュース', price: 100 }, { name: 'コーラ', price: 120 }]
const vendingMachine = VendingMachine.valueOf(itemData);

console.log(vendingMachine.buy('お茶', 80));
console.log(vendingMachine.buy('お茶', 10));
console.log(vendingMachine.buy('お茶', 120));
console.log(vendingMachine.buy('お茶', 120));

if(vendingMachine.canBuy('コーラ')) {
  console.log('購入できます');
} else { console.log('購入できません'); }

if(vendingMachine.canBuy('お茶')) {
  console.log('購入できます');
} else { console.log('購入できません'); }