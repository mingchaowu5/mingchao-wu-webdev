
(function () {
    angular
        .module("CourseSystem")
        .controller("HomeController", HomeController);

    function HomeController($rootScope, $location, UserService, BookService) {
        var vm = this;

        vm.logout = logout;
        vm.gotoProfile = gotoProfile;
        // event handlers
        function init() {
            var promise = BookService.findAllBooks();
            promise.success(
                function (books) {
                    vm.allBooks = books;
                }
            );
        }

        init();

        function logout() {
            var promise = UserService.logout($rootScope.currentUser);

            promise.success(function (response) {
                $rootScope.currentUser = null;
                $location.url("/home");
            });

            promise.error(function (res, status) {
                $rootScope.currentUser = null;
                $location.url("/home");
            });
        }

        function gotoProfile() {
            $location.url("#/user/"+$rootScope.currentUser._id);
        }
    }
});
