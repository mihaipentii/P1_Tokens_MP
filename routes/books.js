import express from 'express';

const router = express.Router();

const books = [
  { id: 1, title: 'El Quixot', author: 'Miguel de Cervantes', price: 18.5 },
  { id: 2, title: '1984', author: 'George Orwell', price: 14.99 },
  { id: 3, title: 'El Petit Princep', author: 'Antoine de Saint-Exupéry', price: 12.75 }
];

const findBook = (id) => books.find((item) => item.id === Number(id));

router.get('/', (req, res) => {
  res.render('books', { books });
});

router.get('/:id', (req, res) => {
  const book = findBook(req.params.id);

  if (!book) {
    return res.status(404).send('Llibre no trobat');
  }

  res.render('book_detail', { book });
});

router.get('/:id/edit', (req, res) => {
  const book = findBook(req.params.id);

  if (!book) {
    return res.status(404).send('Llibre no trobat');
  }

  res.render('edit_books', { book });
});

router.put('/:id', (req, res) => {
  const { title, author, price } = req.body;
  const book = findBook(req.params.id);

  if (!book) {
    return res.status(404).send('Llibre no trobat');
  }

  book.title = title;
  book.author = author;
  book.price = Number(price);

  res.redirect('/books');
});

export default router;