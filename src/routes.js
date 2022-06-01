const {
   getAllBookHandler,
   getBookByIdHandler,
} = require("./CRUD/handlerGET")

const {
   addBookHandler,
} = require("./CRUD/handlerPOST");

const {
   editBookByIdHandler,
} = require("./CRUD/handlerPUT")


const {
   deleteBookByIdHandler,
} = require("./CRUD/handlerDELETE");



const routes = [{
      method: 'POST',
      path: '/books',
      handler: addBookHandler,
   },
   {
      method: 'GET',
      path: '/books',
      handler: getAllBookHandler,
   },
   {
      method: 'GET',
      path: '/books/{bookId}',
      handler: getBookByIdHandler,
   },
   {
      method: 'PUT',
      path: '/books/{bookId}',
      handler: editBookByIdHandler,
   },
   {
      method: 'DELETE',
      path: '/books/{bookId}',
      handler: deleteBookByIdHandler,
   },
];

module.exports = routes;