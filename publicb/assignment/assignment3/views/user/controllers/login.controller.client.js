(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);
    function LoginController($location, $window, UserService) {
        var vm = this;
        vm.login = login;

        function init() {
        }

        init();

        function login(user) {
            user = UserService.findUserByCredentials(user.username, user.password);
            if (user) {
                $location.url("/user/" + user._id);
            } else {
                $window.alert("Unable to login");
            }
        }
    }

})();