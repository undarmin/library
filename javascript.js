const libraryNode = document.querySelector("#library");
const library = [];
const addBookButton = document.querySelector("#add-book");
const form = document.querySelector("#book-form");
const formSubmit = document.querySelector("#form-submit");
const dialog = document.querySelector("dialog");

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBook(book) {
  library.push(book);
}

function displayBook(book) {
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("book");

  const name = document.createElement("h1");
  const author = document.createElement("h3");
  const pages = document.createElement("p");
  const read = document.createElement("p");
  const deleteButton = document.createElement("button");
  const toggleStatus = document.createElement("button");

  name.classList.add("book-title");
  author.classList.add("book-author");
  pages.classList.add("book-pages");
  read.classList.add("book-read");
  deleteButton.textContent = "delete";
  name.textContent = book.name;
  author.textContent = book.author;
  pages.textContent = book.pages;
  read.textContent = book.read ? "Read" : "Not read yet.";
  toggleStatus.textContent = book.read ? "Mark as unread" : "Mark as read";


  toggleStatus.addEventListener('click', () => {
    book.read = !book.read;
    read.textContent = book.read ? "Read" : "Not read yet.";
    toggleStatus.textContent = book.read ? "Mark as unread" : "Mark as read";
  })
  bookContainer.append(name, author, pages, read, deleteButton, toggleStatus);
  libraryNode.append(bookContainer);
  deleteButton.addEventListener('click', () => {
    libraryNode.removeChild(bookContainer);
    library.splice(
        library.indexOf(book),
        1
    )
  })
}

const hobbit = new Book("The Hobbit", "J.K. lol", 692, false);
addBook(hobbit);
displayBook(hobbit);

addBookButton.addEventListener("click", () => {
  dialog.setAttribute("open", "");
});

formSubmit.addEventListener("click", (e) => {
  let inputs = [...form.children]
  inputs = inputs.map((el) => el.children[1])
  inputs.pop()
  console.log(inputs);
  let go = true;
  inputs.forEach((input) => {
    if (!input.value) {
      go = false;
    }
  });
  if (go) {
    console.log(
      inputs[0].value,
      inputs[1].value,
      inputs[2].value,
      inputs[3].value !== "on" ? true : false
    );
    let book = new Book(
      inputs[0].value,
      inputs[1].value,
      inputs[2].value,
      inputs[3].value !== "on" ? true : false
    );
    inputs.forEach((input) => {
        input.value = "";
    })
    addBook(book);
    displayBook(library[library.length - 1]);
    dialog.removeAttribute("open");
    e.preventDefault();
  }
});
