const books = require('../books');

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
   });
   res.code(404);
   return res;
};

module.exports = {
   deleteBookByIdHandler,
};