const books = require('../books');


const getAllBookHandler = (req, h) => {
   const {
      name,
      reading,
      finished
   } = req.query;

   if (!name && !reading && !finished) {
      // If has any query
      const res = h.response({
         status: 'success',
         data: {
            books: books.map((book) => ({
               id: book.id,
               name: book.name,
               publisher: book.publisher,
            })),
         },
      });
      res.code(200);
      return res;
   }

   if (name) {
      const filteredBooksName = books.filter((book) => {
         // if has query name
         const nameRegex = new RegExp(name, 'gi');
         return nameRegex.test(book.name);
      });

      const res = h.response({
         status: 'success',
         data: {
            books: filteredBooksName.map((book) => ({
               id: book.id,
               name: book.name,
               publisher: book.publisher,
            })),
         },
      });
      res.code(200);

      return res;
   }

   if (reading) {
      // if has query reading
      const filteredBooksReading = books.filter(
         (book) => Number(book.reading) === Number(reading)
      );

      const res = h.response({
         status: 'success',
         data: {
            books: filteredBooksReading.map((book) => ({
               id: book.id,
               name: book.name,
               publisher: book.publisher,
            })),
         },
      });
      res.code(200);

      return res;
   }

   // if has query finished
   const filteredBooksFinished = books.filter(
      (book) => Number(book.finished) === Number(finished)
   );

   const res = h.response({
         status: 'success',
         data: {
            books: filteredBooksFinished.map((book) => ({
               id: book.id,
               name: book.name,
               publisher: book.publisher,
            })),
         },
      })
      .code(200);

   return res;
};

// This will get the book by id
const getBookByIdHandler = (req, h) => {
   const {
      bookId
   } = req.params;

   const book = books.filter((n) => n.id === bookId)[0]; // find book by id

   if (book) {
      // When the book with attached id is found
      const res = h.response({
         status: 'success',
         data: {
            book,
         },
      });
      res.code(200);
      return res;
   }

   // If the book with the ID attached by the client is not found
   const res = h.response({
         status: 'fail',
         message: 'Buku tidak ditemukan',
      })
      .code(404);
   return res;
};

module.exports = {
   getAllBookHandler,
   getBookByIdHandler,
};