
module.exports = function (app, model) {
    app.post("/aw/api/book", createBook);
    app.get("/aw/api/book", findBookByBookId);
    app.put("/aw/api/book", updateBook);
    app.delete("/aw/api/book", deleteBook);

    function createBook(req, res) {
        var newBook = req.body;
        model.BookModel
            .createBook(newBook)
            .then(function (book) {
                res.json(book);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findBookByBookId(req, res) {
        var bookId = req.params.bookId;

        model.BookModel
            .findBookById(bookId)
            .then(
                function (response) {
                    res.send(response);
                })
            .catch(function (err) {
                res.status(500).send(err);
            });
    }

    function updateBook(req, res) {
        var bookId = req.params.bookId;
        var newBook = req.body;

        model.BookModel
            .updateBook(bookId, newBook)
            .then(
                function (status) {
                    res.sendStatus(200);
                }
            )
            .catch(function (err) {
                res.status(500).send(err);
            });
    }

    function deleteBook(req, res) {
        var bookId = req.params.bookId;

        model.BookModel
            .deleteBook(bookId)
            .then(
                function (status) {
                    res.sendStatus(200);
                }
            )
            .catch(
                function (err) {
                    res.status(500).send(err);
                }
            );
    }
};