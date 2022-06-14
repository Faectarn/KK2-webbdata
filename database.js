const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }

  console.log("Connected to database");

  const table = `CREATE TABLE IF NOT EXISTS books
  ( id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT, 
    author TEXT )`

  db.run(table, (error) => {
    if (error) {
      console.error(error.message);
      return;
    }
  })
});

module.exports = db;