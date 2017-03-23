(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateProfile = updateProfile;
        vm.userId = $routeParams["uid"];

        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }

        init();

        function updateProfile(user) {
            var newUser = UserService.updateUser(vm.userId, user);
            console.log(newUser);
            if (newUser) {
                vm.message = {type: "SUCCESS", content:"Profile updated!"};
                init();
            } else {
                vm.message = {type: "ERROR", content:"Update profile failed!"};
            }
        }
    }
})();