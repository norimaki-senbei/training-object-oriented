'use strict';


// 本の情報を扱うクラス
class Book {
  // 初期化時に使われるコンストラクタ
  constructor(title, pageSize) {
    this.title = title;
    this.pageSize = pageSize;
  }

  // 以下はクラス内の情報（プロパティや属性と呼ばれる）の操作

  // titleのゲッター
  getTitle() {
    return this.title;
  }

  // titleのセッター
  setTitle(value) {
    this.title = value;
  }

  // pageSizeのゲッター
  getPageSize() {
    return this.pageSize;
  }

  // pageSizeのセッター
  setPageSize(value) {
    this.pageSize = value;
  }
}

function findBookByTitle(books, title) {
  for(let i = 0; i < books.length; i++) {
    if (books[i].getTitle() === title) return books[i];
  }
}

function sumPageSize(books) {
  let size = 0;
  for(let i = 0; i < books.length; i++) {
    size += books[i].getPageSize();
  }
  return size;
}

//メソッドを呼ぶと細かいログを出す
class DebugBook extends Book{
  getTitle() {
    console.debug(`getTitle(): ${super.getTitle()}`);
    return super.getTitle();
  }
  setTitle(value) {
    console.debug(`setTitle(${value})`);
    super.setTitle(value);
  }
  getPageSize() {
    console.debug(`getPageSize(): ${super.getPageSize()}`);
    return super.getPageSize();
  }
  setPageSize(value) {
    console.debug(`setPageSize(${value})`);
    super.setPageSize(value);
  }
}

//環境変数に応じてインスタンス化するクラスを変えるメソッド
function createBook(title, pageSize) {
  if(ProcessingInstruction.env.NODE_ENV == 'development') {
    return new DebugBook(title, pageSize);
  } else {
    return new Book(title, pageSize);
  }
}

//NODE_ENV=development node issue7.js
//と実行するとでバック時の動作
console.log(process.env.NODE_ENV);

let books = [];
let bocchan = createBook("坊ちゃん", 520);
books.push(bocchan);

let nekoden = createBook("吾輩は猫である", 0);
nekoden.setPageSize(454);
console.log(nekoden.getPageSize());
books.push(nekoden);

books.push(createBook("こころ", 876));
console.log(sumPageSize(books));