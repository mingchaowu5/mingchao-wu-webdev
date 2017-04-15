
(function () {
    angular
        .module("CourseSystem")
        .factory("BookService", BookService);

    function BookService($http) {
        var api = {
            "createBook": createBook,
            "findBookById": findBookById,
            "updateBook": updateBook,
            "deleteBook": deleteBook,
            "findBookByTitle": findBookByTitle,
            "findBooksByAuthorId": findBooksByAuthorId,
            "findBookByISBN": findBookByISBN,
            "findAllBooks": findAllBooks
        };
        return api;

        function createBook(userId, newBook) {
            return $http.post("/aw/api/writer/" + userId +"/book", newBook);
        }

        function findBookById(bookId) {
            return $http.get("/aw/api/book/" + bookId);
        }

        function updateBook(bookId, newBook) {
            console.log("update book in service client");
            console.log(newBook);
            return $http.put("/aw/api/book/" + bookId, newBook);
        }

        function deleteBook(bookId) {
            return $http.delete("/aw/api/book/" + bookId);
        }

        function findBookByTitle(title) {
            return $http.get("/aw/api/book?title=" + title);
        }

        function findBooksByAuthorId(author) {
            return $http.get("/aw/api/book?authorId=" + author);
        }
        
        function findBookByISBN(isbn) {
            return $http.get("/aw/api/book?ISBN=" + isbn);
        }

        function findAllBooks() {
            return $http.get("/aw/api/book/all");
        }

        function findPopularBooks(amount) {
            return $http.get("/aw/api/book/popular/"+amount);
        }
    }
})();

/*
 1. title
 2. professor: [ref to users]
 3. course number
 4. articles: [references to articles]
 5. register: []
 6. categories:
 7. liked: number of total liked
 */