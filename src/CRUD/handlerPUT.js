const books = require('../books');


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
   };

   // The id attached by the client was not found by the server
   const res = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
   });
   res.code(404);
   return res;
};


module.exports = {
   editBookByIdHandler,
};