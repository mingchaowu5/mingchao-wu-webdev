(function () {
    angular
        .module("CourseSystem")
        .controller("WriterController", WriterController);

    function WriterController($rootScope, $location, $routeParams, UserService, BookService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        function init() {
            var promise = BookService.findBooksByAuthorId(vm.userId);
            promise.success(function (books) {
                vm.bookshelf = books;
            });
            promise.error(function (res, status) {
                vm.error = res;
            });
        }
        init();

    }
})();