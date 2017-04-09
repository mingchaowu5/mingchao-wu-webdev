
(function () {
    angular
        .module("WebProject")
        .controller("HomeController", HomeController);

    function HomeController($rootScope, $location, UserService) {
        var vm = this;

        vm.logout = logout;
        // event handlers
        function init() {

        }

        init();

        function logout(user) {
            var promise = UserService.logout(user);

            promise.success(function (response) {
                $rootScope.currentUser = null;
                $location.url("/home");
            });
        }
    }
});