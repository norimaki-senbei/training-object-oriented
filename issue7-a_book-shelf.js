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
    return this.books.find(book => book.title === title);
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

class DebugBookshelf extends Bookshelf {

  addBook(book) {
    const addable = super.addBook(book);
    console.debug(`引数: ${JSON.stringify(book)}, 戻り値: ${addable}`);
    return addable;
  }

  findBookByTitle(title) {
    const book = super.findBookByTitle(title);
    if(book !== undefined) {
      console.debug(`引数: ${title}, 戻り値: ${JSON.stringify(book)}`);
      return book;
    } else {
      console.debug(`引数: ${title}, 戻り値: null`);
      return null;
    }
  }

  canAddBook(book) {
    const addable = super.canAddBook(book);
    console.debug(`引数: ${JSON.stringify(book)}, 戻り値: ${addable}`);
    return addable;
  }

}

//NODE_ENV =development node issue7-a_book-shelf.jsで実行するとdebugの方
function createBookshelf() {
  if(process.env.NODE_ENV === 'development') {
    return new DebugBookshelf;
  } else {
    return new Bookshelf;
  }
}

let bookshelf = createBookshelf();

bookshelf.addBook(new Book("坊ちゃん", 520));
bookshelf.addBook(new Book("我輩は猫である", 454));
bookshelf.addBook(new Book("こころ", 876));

if (!bookshelf.addBook(new Book("門", 345))) {
  console.log(`新しい本を追加できませんでした。今の本の数: ${bookshelf.size()}`);
}

console.log(bookshelf.findBookByTitle("こころ"));
console.log(bookshelf.sumPageSize());