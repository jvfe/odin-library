function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`;
};

let hobbit = new Book("The Hobbit", "JRR Tolkien", "295", "read");

console.log(hobbit.info());
