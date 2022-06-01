const {
   nanoid
} = require('nanoid');
const books = require('../books');

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


module.exports = {
   addBookHandler,
}