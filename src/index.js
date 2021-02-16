const libraryView = document.querySelector(".library");
const addBookButton = document.querySelector("#add-book");
let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.createElement = function () {
  const bookElement = document.createElement("div");
  bookElement.classList.add("book-card");
  bookElement.dataset.bookIndex = myLibrary.indexOf(this);

  const title = document.createElement("h4");
  title.textContent = this.title;
  const author = document.createElement("h6");
  author.textContent = `by ${this.author}`;
  const pages = document.createElement("p");
  pages.textContent = `${this.pages}pg`;
  const read = document.createElement("p");
  read.textContent = this.read;
  const removeBook = document.createElement("button");
  removeBook.textContent = "Remove";
  removeBook.classList.add("remove-book");

  const bookInfo = [title, author, pages, read, removeBook];
  bookInfo.forEach((info) => {
    info.classList.add("book-info");
    bookElement.appendChild(info);
  });

  return bookElement;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

let hobbit = new Book("The Hobbit", "JRR Tolkien", "295", "read");
let b = new Book("The Hobbit", "JRR Tolkien", "295", "read");
let c = new Book("The Hobbit", "JRR Tolkien", "295", "read");
addBookToLibrary(hobbit);
addBookToLibrary(b);
addBookToLibrary(c);

myLibrary.forEach((book) => {
  libraryView.appendChild(book.createElement());
});

const removeBookButtons = document.querySelectorAll(".remove-book");

removeBookButtons.forEach((removeButton) => {
  removeButton.addEventListener("click", () => {
    let bookToRemove = removeButton.parentElement;
    let bookIndex = bookToRemove.dataset.bookIndex;
    myLibrary.splice(bookIndex, 1);
    bookToRemove.remove();
  });
});
