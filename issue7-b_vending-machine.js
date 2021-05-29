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

  addItem(item) {
    // 自分自身（this）のcanAddBookメソッドを呼び出す
    if (!this.canAddItem(item)) return false;

    this.stock.push(item);
    return true;
  }

  canAddItem(item) {
    return true; // デフォルトでは何も制限を行わないのでどんな時も本を追加できる
  }

  findBookByTitle(title) {
    for(let i = 0; i < this.books.length; i++) {
      if (this.books[i].getTitle() === title) return this.books[i];
    }
    return null;
  }

  sumPageSize() {
    let size = 0;
    for(let i = 0; i < this.books.length; i++) {
      size += this.books[i].getPageSize();
    }
    return size;
  }

  size() {
    return this.books.length;
  }

}

class DebugVendingMachine extends VendingMachine {

  addBook(book) {
    // 自分自身（this）のcanAddBookメソッドを呼び出す
    if (!this.canAddBook(book)) {
      console.debug(`引数: ${JSON.stringify(book)}, 戻り値: false`);
      return false;
    } else {
      this.books.push(book);
      console.debug(`引数: ${JSON.stringify(book)}, 戻り値: true`);
      return true;
    }
  }

  findBookByTitle(title) {
    for(let i = 0; i < this.books.length; i++) {
      if (this.books[i].getTitle() === title) {
        console.debug(`引数: ${title}, 戻り値: ${JSON.stringify(this.books[i])}`);
        return this.books[i];
      }
    }
    console.debug(`引数: ${title}, 戻り値: null`);
    return null;
  }

  canAddBook(book) {
    console.debug(`引数: ${JSON.stringify(book)}, 戻り値: true`);
    return true; // デフォルトでは何も制限を行わないのでどんな時も本を追加できる
  }

}


//process.env.NODE_ENV ='development';
function createVendingMachine() {
  if(process.env.NODE_ENV === 'development') {
    return new DebugVendingMachine;
  } else {
    return new VendingMachine;
  }
  }

let vendingMachine = createVendingMachine();

vendingMachine.addItem(new Item("コーラ", 120));
vendingMachine.addItem(new Item("オレンジジュース", 100));
vendingMachine.addItem(new Item("お茶", 80));

//if (!bookshelf.addBook(new Book("門", 345))) {
//  console.log(`新しい本を追加できませんでした。今の本の数: ${bookshelf.size()}`);
//}

//console.log(bookshelf.findBookByTitle("こころ"));
//console.log(bookshelf.sumPageSize());