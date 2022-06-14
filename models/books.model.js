const db = require("../database");

function getBooks() {
  const SQL = "SELECT * FROM books";

  return new Promise((resolve, reject) => {
    db.all(SQL, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

function getBook(id) {
  const SQL = `SELECT * FROM books WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.get(SQL, id, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

function addBook(book) {
  const SQL = "INSERT INTO books (title, author) VALUES (?, ?)";

  return new Promise((resolve, reject) => {
    db.run(SQL, [book.title, book.author], (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

function updateBook(id, book) {
  const SQL = `UPDATE books SET title = COALESCE(?, title), author = COALESCE(?, author) WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.run(SQL, [book.title, book.author, id], (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

function replaceBook(id, book) {
  const SQL = `UPDATE books SET title = '${book.title}', author = '${book.author}' WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.run(SQL, id, (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

function deleteBook(id) {
  const SQL = `DELETE FROM books WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.get(SQL, id, (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

module.exports = {
  getBooks,
  getBook,
  addBook,
  updateBook,
  replaceBook,
  deleteBook,
};
