(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);


    function RegisterController($location, $window, UserService) {
        var vm = this;
        vm.register = register;

        function init() {
        }

        init();

        function register(user) {
            if (user.password != user.passwordAgain) {
                $window.alert("two input password is not the same, Please check!");
            } else {
                var newUser = {_id:"", username:"", password:""};
                newUser.username = user.username;
                newUser.password = user.password;
                newUser = UserService.createUser(newUser);
                if (newUser) {
                    $location.url("/user/"+newUser._id);
                }
            }
        }
    }

})();