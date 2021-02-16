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

  const title = document.createElement("h2");
  title.textContent = this.title;
  const author = document.createElement("h5");
  author.textContent = `by ${this.author}`;
  const pages = document.createElement("p");
  pages.textContent = `${this.pages} pages`;
  const read = getReadButton(this.read);
  this.read === false ? bookElement.classList.toggle("unread-book") : null;
  const removeBookDiv = document.createElement("div");
  removeBookDiv.classList.add("remove-book-div");
  const removeBook = document.createElement("button");
  removeBook.textContent = "✖";
  removeBook.classList.add("btn");
  removeBook.classList.add("remove-book");
  removeBookDiv.appendChild(removeBook);

  const bookInfo = [removeBookDiv, title, author, pages, read];
  bookInfo.forEach((info) => {
    info.classList.add("book-info");
    bookElement.appendChild(info);
  });

  return bookElement;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function updateLibrary() {
  libraryView.textContent = "";
  myLibrary.forEach((book) => {
    libraryView.appendChild(book.createElement());
  });
  handleCardButtons();
}

function getReadButton(read) {
  const readButton = document.createElement("button");
  readButton.classList.add("status-button");

  if (read === true) {
    readButton.classList.toggle("read-button");
    readButton.textContent = "read ✓";
  } else {
    readButton.classList.toggle("unread-button");
    readButton.textContent = "Not read 𐄂";
  }

  return readButton;
}

function handleCardButtons() {
  const removeBookButtons = document.querySelectorAll(".remove-book");

  removeBookButtons.forEach((removeButton) => {
    removeButton.addEventListener("click", () => {
      let bookToRemove = removeButton.parentElement.parentElement;
      let bookIndex = bookToRemove.dataset.bookIndex;
      myLibrary.splice(bookIndex, 1);
      bookToRemove.remove();
      updateLibrary();
    });
  });

  const readButtons = document.querySelectorAll(".status-button");

  readButtons.forEach((readButton) => {
    readButton.addEventListener("click", () => {
      let bookParent = readButton.parentElement;
      let bookIndex = bookParent.dataset.bookIndex;
      myLibrary[bookIndex] = new Book(
        myLibrary[bookIndex].title,
        myLibrary[bookIndex].author,
        myLibrary[bookIndex].pages,
        myLibrary[bookIndex].read === true ? false : true
      );
      updateLibrary();
    });
  });
}

function formPopupHandler() {
  libraryView.parentElement.classList.toggle("darkened");
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
  updateLibrary();
  formPopupHandler();

  bookForm.reset();
});

const hobbit = new Book("The Hobbit", "JRR Tolkien", "295", true);
const lotr = new Book("The Fellowship of the Ring", "JRR Tolkien", "423", true);

addBookToLibrary(hobbit);
addBookToLibrary(lotr);
updateLibrary();
