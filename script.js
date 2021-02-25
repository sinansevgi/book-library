const books = [];
const Book = (title, author, pages, readStatus) =>
{
  const getTitle = () => title;
  const getAuthor = () => author;
  const getPages = () =>  pages;
  const getReadStatus = () => {return (readStatus ? 'Book Read' : 'Unread');};
  const changeStatus = () => {
    readStatus = !(readStatus);
  };
  return {getTitle, getAuthor, getPages, getReadStatus, changeStatus}
};

function elementAttributes(element, id, name, type, placeholder = '') {
  element.setAttribute('id', id);
  element.setAttribute('name', name);
  element.setAttribute('type', type);
  element.setAttribute('placeholder', placeholder);
}

function createForm() {
  const form = document.createElement('tr');
  form.setAttribute('id', 'newRecord');
  const inputTitle = document.createElement('input');
  elementAttributes(inputTitle, 'title', 'title', 'text', "Book's title");
  const inputAuthor = document.createElement('input');
  elementAttributes(inputAuthor, 'author', 'author', 'text', "Author's name");
  const inputPages = document.createElement('input');
  elementAttributes(inputPages, 'pages', 'pages', 'text', "Book's pages");
  const inputReadStatus = document.createElement('input');
  elementAttributes(inputReadStatus, 'read', 'read', 'checkbox');
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Add Book';
  elementAttributes(submitButton, 'addRecord', 'addRecord', 'submit');
  const inputs = [inputTitle, inputAuthor, inputPages, inputReadStatus, submitButton];
  for (let i = 0; i < inputs.length; i += 1) {
    const tableData = document.createElement('td');
    tableData.appendChild(inputs[i]);
    form.append(tableData);
  }
  const table = document.getElementById('table');
  table.appendChild(form);
}
function displayBook(book) {
  const tableRow = document.createElement('tr');
  tableRow.setAttribute('id', `book-${books.indexOf(book)}`);
  const bookTitle = document.createElement('td');
  bookTitle.textContent = book.getTitle();
  const bookAuthor = document.createElement('td');
  bookAuthor.textContent = book.getAuthor();
  const bookPages = document.createElement('td');
  bookPages.textContent = book.getPages();
  const readStatus = document.createElement('td');
  readStatus.setAttribute('id', `status${books.indexOf(book)}`);
  readStatus.textContent = book.getReadStatus();
  const buttonTd = document.createElement('td');
  const buttonContainer = document.createElement('div');
  const readButton = document.createElement('button');
  readButton.textContent = 'Read';
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Delete';
  removeButton.setAttribute('data-attribute', books.indexOf(book).toString());
  removeButton.setAttribute('id', 'deleteBooks');

  removeButton.addEventListener('click', () => {
    books.splice(Number(removeButton.getAttribute('data-attribute')), 1);
    removeButton.parentNode.parentNode.parentNode.remove();
  });

  readButton.addEventListener('click', () => {
    const statusField = document.getElementById(`status${removeButton.getAttribute('data-attribute')}`);
    book.changeStatus();
    statusField.textContent = book.getReadStatus();
  });

  buttonContainer.appendChild(readButton);
  buttonContainer.appendChild(removeButton);
  buttonTd.appendChild(buttonContainer);

  const bookRecords = [bookTitle, bookAuthor, bookPages, readStatus, buttonTd];
  for (let i = 0; i < bookRecords.length; i += 1) {
    tableRow.appendChild(bookRecords[i]);
  }

  const table = document.getElementById('table');
  table.appendChild(tableRow);
}

function hideButton() {
  const addBookButton = document.getElementById('addBook');
  addBookButton.classList.toggle('hidden');
}

function listBooks(books) {
  books.forEach(book => displayBook(book));
}
function createBook() {
  const inputTitle = document.getElementById('title');
  const inputAuthor = document.getElementById('author');
  const inputPages = document.getElementById('pages');
  const inputReadStatus = document.getElementById('read');
  const newBook = Book(inputTitle.value,
    inputAuthor.value,
    inputPages.value,
    inputReadStatus.checked);
  books.push(newBook);
}

function destroyForm() {
  const form = document.getElementById('newRecord');
  form.remove();
}

function submitForm() {
  const submitButton = document.getElementById('addRecord');
  submitButton.addEventListener('click', () => {
    createBook();
    displayBook(books[(books.length - 1)]);
    hideButton();
    destroyForm();
  });
}

const addBookButton = document.getElementById('addBook');
addBookButton.addEventListener('click', () => {
  createForm();
  hideButton();
  submitForm();
});

if (books.length > 0) {
  listBooks(books);
}
