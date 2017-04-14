
(function () {
    angular
        .module("CourseSystem")
        .controller("BookListController", BookListController)
        .controller("NewBookController", NewBookController)
        .controller("EditBookController", EditBookController);

    function BookListController($routeParams, $location, UserService, BookService, ArticleService, GoodreadsService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.bookId = $routeParams.bid;

        vm.addToBookshelf = addToBookshelf;

        function init() {
            var bookPromise = BookService.findBookById(vm.bookId);
            bookPromise.success(function (book) {
                vm.book = book;
            });

            var promise = ArticleService.findArticlesByBookId(vm.bookId);
            promise.success(function (articles) {
                vm.articles = articles;
            });

            var userPromise = UserService.findUserById(vm.userId);
            userPromise.success(function (user) {
                vm.user = user;
            });
        }

        init();

        function addToBookshelf() {
            var promise = UserService.addToBookshelf(vm.bookId, vm.userId);
            promise.success(function (res) {
                vm.message = "Course added to your list";
            });
            promise.error(function (res, status) {
                vm.error = "Course did not added to your list. " + res;
            });
        }
    }


    function NewBookController($routeParams, $location, BookService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.createBook = createBook;

        function init() {
            var promise = BookService.findBooksByAuthorId(vm.userId);
            promise.success(function (books) {
                vm.published = books;
            })
        }

        init();

        function createBook(book) {
            book.genres = parseGenres(book.genres);

            var promise = BookService.createBook(vm.userId, book);
            promise.success(
                function (book) {
                    init();
                    $location.url("/writer/" + vm.userId + "/published");
                });

            promise.error(function (res, status) {
                vm.error = res;
            });
        }

        function parseGenres(genresStr) {
            var temp = genresStr.split(',');
            return temp;
        }
    }

    function EditBookController($routeParams, $location, BookService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.bookId = $routeParams.bid;

        vm.updateBook = updateBook;
        vm.deleteBook = deleteBook;

        function init() {
            var promise = BookService.findBookById(vm.bookId);
            promise.success(function (book) {
                vm.book = book;
            });

            promise.error(function (res, status) {
                vm.error = res;
            });
        }

        init();

        function updateBook() {
            var promise = BookService.updateBook(vm.bookId, vm.book);
            promise.success(function (book) {
                init();
                vm.message = "Update Success!";
            });
            promise.error(function (res, status) {
                vm.error = res;
            });
        }

        function deleteBook() {
            var promise = BookService.deleteBook(vm.book._id);
            promise.success(function () {
                $location.url("/writer/" + vm.userId + "/published");
            })
        }
    }
})();