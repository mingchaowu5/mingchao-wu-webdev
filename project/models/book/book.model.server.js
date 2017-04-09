
module.exports = function () {
    var api = {};

    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;

    var BookSchema = require('./book.model.server')();
    var BookModel = mongoose.model('UserModel', BookSchema);

    return api;

    function createBook(newBook) {
        return BookModel.create(newBook);
    }

    function updateBook(bookId, newBook) {
        return BookModel.update({_id: bookId, $set: newBook});
    }

    function findBookById(bookId) {
        return BookModel.findById(bookId);
    }

    function deleteBook(bookId) {
        return BookModel.remove({_id: bookId});
    }

    // TODO: add/remove article, etc.
};

/*
1. CRUD for book
2. add/remove article, etc.
3.
 */