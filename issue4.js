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

  // 指定したハッシュの配列から初期の本棚を作り出す
  static valueOf(arrayOfHash) {
    // thisの型に関連している new が呼ばれます。
    // 今回のサンプルではnew LimitedBookshelfが呼ばれます。
    let bookshelf = new this;

    for (let i = 0; i < arrayOfHash.length; i++) {
      let hash = arrayOfHash[i];
      let book = new Book(hash.title, hash.pageSize);
      bookshelf.addBook(book);
    }
    return bookshelf;
  }

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

class RentalBookshelf extends Bookshelf {
  constructor() {
    super();
    this.rentedBooks = [];
  }
  rentBook(book) {
    //貸し出し中であれば借りれない
    if (!this.isRented(book)) {
      //タイトルに一致する本を削除
      for(let i = 0; i < this.books.length; i++) {
        if(this.books[i].title === book.title) {
          this.rentedBooks.push(book);
          this.books.splice(i,1);
        }
      }
    }else { return console.log("現在貸し出し中です"); }
  }

  returnBook(book) {
    //bookを追加する
    this.books.push(book);
    for(let i = 0; i < this.rentedBooks.length; i++) {
      if(this.rentedBooks[i].title === book.title) {
        this.rentedBooks.splice(i,1);
      }
    }
  }

  listRentedBooks() {
    return this.rentedBooks
  }

  isRented(book) {

    return this.rentedBooks.find(rentedBook => rentedBook.title === book.title);
  }
}

// booksが通信の結果だったり、ファイルから読んだりするなど外部から与えられる想定
let books = [
  { title: "坊ちゃん", pageSize: 520 },
  { title: "我輩は猫である", pageSize: 454 },
  { title: "こころ", pageSize: 876 }
];

//RentalBookshelfの初期状態の定義
let bookshelf = RentalBookshelf.valueOf(books);

bookshelf.rentBook(new Book("坊ちゃん", 520));
console.log(bookshelf.listRentedBooks());
if(!bookshelf.isRented(new Book("坊ちゃん", 520))) {
  console.log("貸し出し中でではありません");
}else {console.log("貸し出し中です");}

bookshelf.returnBook(new Book("坊ちゃん", 520));
console.log(bookshelf.listRentedBooks());
if(!bookshelf.isRented(new Book("坊ちゃん", 520))) {
  console.log("貸し出し中でではありません");
}else {console.log("貸し出し中です");}



