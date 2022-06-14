const books = require("../models/books.model");

async function getBooks(req, res) {
  const result = await books.getBooks();
  
  res.status(200).json(result);
  console.log(result)
  console.log(`${result.length} books found in library`);
}

async function getBook(req, res) {
  const bookID = req.params.id;
  const result = await books.getBook(bookID);
  console.log(result)

  if (!result) {
    return res.status(404).send(`No book found with ID ${bookID}`);
  }

  res.status(200).json(result);
  console.log(`${result.title} found in library`);
}

async function addBook(req, res) {
  const { title, author } = req.body;

  if (!title) {
    return res.status(400).send("Missing parameter, expected title");
  }
  if (!author) {
    return res.status(400).send("Missing parameter, expected author");
  }
  
  const addedBook = {
    title,
    author,
  };

  await books.addBook(addedBook);

  res.status(201).json(addedBook);
  console.log(`${addedBook.title} added to list`);
}

async function replaceBook(req, res) {
  const { title, author } = req.body;
  const bookID = req.params.id;

  if (!title) {
    return res.status(400).send("Missing parameter, expected title");
  }
  if (!author) {
    return res.status(400).send("Missing parameter, expected author");
  }

  const replacedBook = {
    title,
    author,
  };

  await books.replaceBook(bookID, replacedBook);
  res.status(200).json(replacedBook);
  console.log(`Book ${bookID} has been replaced with ${replacedBook.title} by ${replacedBook.author}`);
}

async function updateBook(req, res) {
  const { title, author } = req.body;

  const bookID = req.params.id;
  const updatedBook = await books.updateBook(bookID, { title, author });

  res.status(200).json(updatedBook);

  if (title !== undefined && author !== undefined) {
    console.log(`Book ${bookID} has been updated with the title ${title} and author ${author}`);
  }

  else if (title !== undefined) {
    console.log(`Book ${bookID} title has been updated to ${title}`);
  }

  else if (author !== undefined) {
    console.log(`Book ${bookID} author has been updated to ${author}`);
  }

}

async function deleteBook(req, res) {
  const bookID = req.params.id;
  const result = await books.getBook(bookID);
  
  if (!result) {
    return res.status(404).send(`No book found with ID ${bookID}`);
  }
  
  await books.deleteBook(bookID);
   
  res.status(200).send(`Book ${bookID} has been deleted`);
}

module.exports = {
  getBooks,
  getBook,
  addBook,
  replaceBook,
  updateBook,
  deleteBook,
};