const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let books = [];

app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:isbn', (req, res) => {
  const { isbn } = req.params;
  const book = books.find(b => b.isbn === isbn);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.post('/books', (req, res) => {
  const { title, author, publisher, publishedDate, isbn } = req.body;

  if (!title || !author || !publisher || !publishedDate || !isbn) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const book = { title, author, publisher, publishedDate, isbn };
  books.push(book);
  res.status(201).json({ message: 'Book added', book });
});

app.put('/books/:isbn', (req, res) => {
  const { isbn } = req.params;
  const { title, author, publisher, publishedDate } = req.body;

  const book = books.find(b => b.isbn === isbn);
  if (book) {
    book.title = title || book.title;
    book.author = author || book.author;
    book.publisher = publisher || book.publisher;
    book.publishedDate = publishedDate || book.publishedDate;
    res.json({ message: 'Book updated', book });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.delete('/books/:isbn', (req, res) => {
  const { isbn } = req.params;
  const bookIndex = books.findIndex(b => b.isbn === isbn);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.json({ message: 'Book deleted' });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
