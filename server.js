const express = require("express");
const app = express();
const booksRouter = require("./routes/books.router");
const bodyParser = require("body-parser");
const port = 4000;

app.use(bodyParser.json({
  type: "*/*"
}));

app.use(booksRouter);

app.listen(port, () => {
  console.log(`Server runs on port ${port}`);
})