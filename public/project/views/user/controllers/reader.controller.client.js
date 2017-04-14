
(function () {
    angular
        .module("CourseSystem")
        .controller("ReaderController", ReaderController);

    function ReaderController($rootScope, $routeParams, $location, UserService, BookService) {
        var vm = this;
        vm.logout = logout;

        vm.userId = $routeParams.uid;

        function init() {
            var promise = UserService.findUserById(vm.userId);
            promise.success(function (user) {
                vm.user = user;
                vm.bookshelf = fillBookshelf(vm.user.bookshelf);
                console.log("after filled!");
                console.log(vm.bookshelf);
            });
            promise.error(function (res, status) {
                vm.error = res;
            });
        }
        init();

        function fillBookshelf(booklist) {
            ret = [];
            console.log(JSON.stringify(booklist));
            for (var i =  0; i < booklist.length; ++i) {
                var bookPromise = BookService.findBookById(booklist[i]);
                bookPromise.success(function (resBook) {
                    ret.push(resBook);
                });
            }
            return ret;
        }

        function logout(user) {
            var promise = UserService.logout(user);

            promise.success(function (response) {
                $rootScope.currentUser = null;
                $location.url("/home");
            });

            promise.error(function (res, status) {
                vm.error = res;
            });
        }
    }
})();