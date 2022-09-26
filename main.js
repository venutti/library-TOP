function Library() {
    this.libraryElement = document.querySelector(".library");
}
Library.prototype.addBookToLibrary = function(bookName, bookAuthor, bookPages, bookRead) {
    const newBook = new Book(bookName, bookAuthor, bookPages, bookRead);
    this.showBook(newBook);
}
Library.prototype.showBook = function(book) {
    this.libraryElement.appendChild(book.HTMLelement);
}

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.createElement();
}
Book.prototype.getPages = function() {
    return `${this.pages} páginas`;
}
Book.prototype.getRead = function() {
    return `${this.read ? 'Ya lo leíste' : 'Aún no leído'}`;
}
Book.prototype.createElement = function() {
    const book = document.createElement("div");
    book.classList.add("book");
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("close-btn");
    removeBtn.addEventListener("click", () => {
        this.remove();
    })
    const bookTitle = document.createElement("div");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = this.name;
    const bookAuthor = document.createElement("div");
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = this.author;
    const bookPages = document.createElement("div");
    bookPages.classList.add("book-pages");
    bookPages.textContent = this.getPages();
    const bookRead = document.createElement("div");
    bookRead.classList.add("book-read");
    bookRead.textContent = this.getRead();
    book.appendChild(removeBtn);
    book.appendChild(bookTitle);
    book.appendChild(bookAuthor);
    book.appendChild(bookPages);
    book.appendChild(bookRead);
    if (!this.read) {
        const readBtn = document.createElement("button");
        readBtn.classList.add("button", "read-btn");
        readBtn.textContent = "Leer";
        readBtn.addEventListener("click", () => {
            this.readBook();
        } )
        book.appendChild(readBtn);
    }
    this.HTMLelement = book;
}
Book.prototype.readBook = function() {
    if (this.read) return;
    this.HTMLelement.querySelector(".read-btn").remove();
    this.read = true;
    this.HTMLelement.querySelector(".book-read").textContent = this.getRead();
}
Book.prototype.remove = function() {
    this.HTMLelement.remove();
}

const myLibrary = new Library();

const formModal = document.querySelector("#form-modal");
const addBookBtn = document.querySelector("#add-book-btn");
const closeModalBtn = document.querySelector("#close-modal");
const submitModalBtn = document.querySelector("#submit-modal");


addBookBtn.addEventListener("click", () => {
    formModal.showModal();
})
closeModalBtn.addEventListener("click", () => {
    formModal.close();
})
formModal.addEventListener("submit", () => {
    const bookTitle = document.querySelector("#book-title").value;
    const bookAuthor = document.querySelector("#book-author").value;
    const bookPages = document.querySelector("#book-pages").value;
    const bookRead = document.querySelector("#is-read").checked;
    myLibrary.addBookToLibrary(bookTitle, bookAuthor, +bookPages, bookRead);
})


myLibrary.addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);

