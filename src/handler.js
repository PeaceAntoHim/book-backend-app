const {
   nanoid
} = require('nanoid');
const books = require('./books');

const addBookHandler = (req, h) => {
   const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
   } = req.payload;

   if (!name) {
      // Client does not attach name property to req body
      const res = h.response({
         status: 'fail',
         message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });
      res.code(400);
      return res;
   }

   if (readPage > pageCount) {
      // The client attaches the value of the readPage property which is greater than the value of the pageCount property
      const res = h.response({
         status: 'fail',
         message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
      res.code(400);
      return res;
   }

   // Declare the param will we get
   const id = nanoid(16);
   const finished = pageCount === readPage;
   const insertedAt = new Date().toISOString();
   const updatedAt = insertedAt;

   const newBook = {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      id,
      finished,
      insertedAt,
      updatedAt,
   };
   books.push(newBook);

   const isSuccess = books.filter((note) => note.id === id).length > 0; // This will check if data enter or not

   if (isSuccess) {
      // if book successfully be created
      const res = h.response({
         status: 'success',
         message: 'Buku berhasil ditambahkan',
         data: {
            bookId: id,
         },
      });
      res.code(201);
      return res;
   }

   // The server failed to load the book for a common reason (generic error).
   const res = h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
   });
   res.code(500);
   return res;
};

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

// This function to update or edit the value or data
const editBookByIdHandler = (req, h) => {
   const {
      bookId
   } = req.params;

   const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
   } = req.payload;

   if (!name) {
      // Client does not attach name property to req body
      const res = h.response({
         status: 'fail',
         message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      res.code(400);
      return res;
   }

   if (readPage > pageCount) {
      // The client attaches the value of the readPage property which is greater than the value of the pageCount property
      const res = h
         .response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
         });
      res.code(400);
      return res;
   }

   const finished = pageCount === readPage;
   const updatedAt = new Date().toISOString();

   const index = books.findIndex((note) => note.id === bookId); // find book by id

   if (index !== -1) {
      books[index] = {
         ...books[index],
         name,
         year,
         author,
         summary,
         publisher,
         pageCount,
         readPage,
         reading,
         finished,
         updatedAt,
      };

      // If the book success diperbarui
      const res = h.response({
         status: 'success',
         message: 'Buku berhasil diperbarui',
      });
      res.code(200);
      return res;
   }

   // The id attached by the client was not found by the server
   const res = h.response({
         status: 'fail',
         message: 'Gagal memperbarui buku. Id tidak ditemukan',
      })
      .code(404);
   return res;
};

// This function to deleted value of data
const deleteBookByIdHandler = (req, h) => {
   const {
      bookId
   } = req.params;

   const index = books.findIndex((note) => note.id === bookId); // find book by id

   if (index !== -1) {
      books.splice(index, 1);

      // If the id belongs to one of the books
      const res = h.response({
         status: 'success',
         message: 'Buku berhasil dihapus',
      });
      res.code(200);
      return res;
   }

   // If the attached id is not owned by any book
   const res = h.response({
         status: 'fail',
         message: 'Buku gagal dihapus. Id tidak ditemukan',
      })
      .code(404);
   return res;
};

module.exports = {
   addBookHandler,
   getAllBookHandler,
   getBookByIdHandler,
   editBookByIdHandler,
   deleteBookByIdHandler,
};