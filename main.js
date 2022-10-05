class Library {
  constructor(selector) {
    this.HTML = document.querySelector(selector);
    this.books = [];
  };
  addBook(book) {
    this.HTML.appendChild(book.HTML);
    this.books.push(book);
  };
};

class Book {
  constructor(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.HTML = this.createElement();
  };
  createElement() {
    const book = document.createElement("div");
    book.classList.add("book");
    book.innerHTML = 
    `<button class="close-btn"></button>
    <div class="book-title">${this.name}</div>
    <div class="book-author">${this.author}</div>
    <div class="book-pages">${this.pages} páginas</div>
    <div class="book-read">${this.read ? "Ya leído" : "Aún no leído"}</div>`.trim();
    if(!this.read) {
      const readBtn = document.createElement("button");
      readBtn.classList.add("button", "read-btn");
      readBtn.textContent = "Leer";
      book.appendChild(readBtn);
    };
    this.addListeners(book);
    return book;
  };
  removeElement() {
    this.HTML.remove();
  };
  readBook() {
    this.HTML.querySelector(".read-btn").remove();
    this.read = true;
    this.HTML.querySelector(".book-read").textContent = "Ya leído";
  };
  addListeners(HTMLbook) {
    const closeBtn = HTMLbook.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
      this.removeElement();
    });
    if(!this.read) {
      const readBtn = HTMLbook.querySelector(".read-btn");
      readBtn.addEventListener("click", () => {
        this.readBook();
      });
    };
  };
};

const myLibrary = new Library(".library");
const formModal = document.querySelector("#form-modal");
const addBookBtn = document.querySelector("#add-book-btn");
const closeModalBtn = document.querySelector("#close-modal");
const submitModalBtn = document.querySelector("#submit-modal");


addBookBtn.addEventListener("click", () => {
  formModal.showModal();
});
closeModalBtn.addEventListener("click", () => {
  formModal.close();
});
formModal.addEventListener("submit", () => {
  const newBook = new Book(
    document.querySelector("#book-title").value,
    document.querySelector("#book-author").value,
    document.querySelector("#book-pages").value,
    document.querySelector("#is-read").checked
  );
  myLibrary.addBook(newBook);
});
