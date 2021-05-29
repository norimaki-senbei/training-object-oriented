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

// 本棚として本を格納するクラスの基底クラス
class Bookshelf {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    // 自分自身（this）のcanAddBookメソッドを呼び出す
    if (!this.canAddBook(book)) return false;

    this.books.push(book);
    return true;
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

  // 今この本を追加できますか？」というチェックを行えるメソッド
  canAddBook(book) {
    return true; // デフォルトでは何も制限を行わないのでどんな時も本を追加できる
  }
}

// 格納できる本の数が指定できる本棚クラス
class LimitedBookshelf extends Bookshelf {
  constructor(maxSize = 3) {
    super(); // 親のconstructorを呼びます
    this.maxSize = maxSize;
    this.rejectCount = 0;
  }

  // 親クラスが作っているメソッドを上書き（オーバーライド）できます。
  canAddBook(book) {
    return this.books.length < this.maxSize;
  }

  addBook(book) {
    // 自分自身（this）のcanAddBookメソッドを呼び出す
    if (!this.canAddBook(book)) {
      this.rejectCount = this.rejectCount + 1;
      return false;
    }

    this.books.push(book);
    return true;
  }

  getRejectCount() {
    return this.rejectCount;
  }

  // 明示的にメソッドを書かれていませんがBookshelfのメソッドを呼び出すことができます。
  // 10行程度でほぼ同じ機能を持ちながら、少し動きの違う仕組みを導入できました。
}

class RejectedBocchanBooksshelf extends Bookshelf {
  constructor() {
   super();
  }
  addBook(book) {
    // 自分自身（this）のcanAddBookメソッドを呼び出す
    if (!this.canAddBook(book)) return false;
    this.books.push(book);
    return true;
  }
  canAddBook(book) {
    return book.title === '坊ちゃん';
  }


}

class ThinBooksshelf extends Bookshelf {
  constructor(maxPageSize = 20) {
    super(); // 親のconstructorを呼びます
    this.maxPageSize = maxPageSize;
  }
  canAddBook(book) {
    return book.pageSize < this.maxPageSize;
  }

}

let bookshelf = new LimitedBookshelf;

bookshelf.addBook(new Book("坊ちゃん", 520));
bookshelf.addBook(new Book("我輩は猫である", 454));
bookshelf.addBook(new Book("こころ", 876));

if (!bookshelf.addBook(new Book("門", 345))) {
  console.log(`新しい本を追加できませんでした。今の本の数: ${bookshelf.size()}`);
}

console.log(`拒否回数：${bookshelf.getRejectCount()}`);

if (!bookshelf.addBook(new Book("門", 345))) {
  console.log(`新しい本を追加できませんでした。今の本の数: ${bookshelf.size()}`);
}
console.log(`拒否回数：${bookshelf.getRejectCount()}`);

console.log(bookshelf.findBookByTitle("こころ"));
console.log(bookshelf.sumPageSize());

//坊ちゃん追加できない本棚クラス
let bookshelf2 = new RejectedBocchanBooksshelf;
if (!bookshelf2.addBook(new Book("坊ちゃん", 520))) {
  console.log(`新しい本を追加できませんでした。`);
}

//20ページ未満しか保存できないクラス
console.log("---Thin bookshelf---");
let bookshelf3 = new ThinBooksshelf;

if (!bookshelf3.addBook(new Book("坊ちゃん", 520))) {
  console.log(`新しい本を追加できませんでした。`);
}else {console.log("保存できました");}

if (!bookshelf3.addBook(new Book("坊ちゃん", 10))) {
  console.log(`新しい本を追加できませんでした。`);
}else {console.log("保存できました");}
