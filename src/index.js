const libraryView = document.querySelector(".library");
const addBookButton = document.querySelector("#add-book");
const formDiv = document.querySelector(".form-popup");
const bookForm = document.querySelector(".book-form");
const closeForm = document.querySelector(".close-form");
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
  libraryView.appendChild(book.createElement());
  handleRemoveButtons();
}

const hobbit = new Book("The Hobbit", "JRR Tolkien", "295", true);
const lotr = new Book("The Fellowship of the Ring", "JRR Tolkien", "423", true);

addBookToLibrary(hobbit);
addBookToLibrary(lotr);

function handleRemoveButtons() {
  const removeBookButtons = document.querySelectorAll(".remove-book");

  removeBookButtons.forEach((removeButton) => {
    removeButton.addEventListener("click", () => {
      let bookToRemove = removeButton.parentElement;
      let bookIndex = bookToRemove.dataset.bookIndex;
      myLibrary.splice(bookIndex, 1);
      bookToRemove.remove();
    });
  });
}

function formPopupHandler() {
  formDiv.classList.toggle("popup-active");
}

addBookButton.addEventListener("click", formPopupHandler);

closeForm.addEventListener("click", formPopupHandler);

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(bookForm);

  const addedBook = new Book(
    formData.get("title"),
    formData.get("author"),
    formData.get("pages"),
    formData.get("read") == "true"
  );

  addBookToLibrary(addedBook);
  formPopupHandler();

  bookForm.reset();
});
