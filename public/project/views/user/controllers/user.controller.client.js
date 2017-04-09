
(function () {
    angular
        .module("WebProject")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($rootScope, $location, UserService) {
        var vm = this;

        // event handlers
        vm.login = login;
        vm.logout = logout;

        function init() {
        }

        init();

        function login(user) {
            // var promise = UserService.findUserByCredentials(user.username, user.password);
            var promise = UserService.login(user);

            // execute when the server side actually returns the user object
            promise.success(function (user) {
                if (user) {
                    $rootScope.currentUser = user;

                    if(user.role == "reader") {
                        $location.url("/reader/" + user._id);
                    } else if(user.role == "admin") {
                        $location.url("/admin");
                    }
                } else {
                    vm.error = "User not found";
                }
            });

            promise.error(function (response, status) {
                vm.error = response;
            });
        }

        function logout(user) {
            var promise = UserService.logout(user);

            promise.success(function (response) {
                $rootScope.currentUser = null;
                $location.url("/home");
            });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;

        // event handlers
        vm.register = register;

        function init() {
        }

        init();

        function register(user) {
            if(user.password === user.passwordCheck) {
                // the two entered password are the same

                // var createUserPromise = UserService.createUser(user);
                var registerPromise = UserService.register(user);

                // create user successful, redirect to the new user page
                registerPromise.success(function (user) {
                    var user = response.data;
                    $rootScope.currentUser = user;
                    $location.url("/user/" + user._id);
                });

                // Some other error happened while creating the user at server side
                registerPromise.error(function (createUserRes, createUserStatus) {
                    vm.error = createUserRes;
                });
            } else {
                vm.error = "You entered invalid username or password.";
            }
        }
    }

    function ProfileController($routeParams, $location, UserService, BookService) {
        var vm = this;

        // /user/:uid
        vm.userId = $routeParams["uid"];

        // Event handler
        vm.update = updateUser;
        vm.delete = deleteUser;
        vm.logout = logout;

        function init() {
            var promise = UserService.findUserById(vm.userId);
            promise.success(function (user) {
                vm.user = user;

                if(user.role === "reader") {
                    vm.bookshelfUrl = "/reader/" + user._id + "/bookshelf";
                } else if (user.role === "writer") {
                    vm.bookshelfUrl = "/writer/" + user._id + "/published";
                }
            });
        }
        init();

        function updateUser(newUser) {
            var promise = UserService.updateUser(vm.userId, newUser);
            promise.success(function (user) {
                if (user == null) {
                    vm.error = "unable to update user.";
                } else {
                    vm.message = "user successfully updated.";
                }
            });
        }

        function deleteUser() {
            var promise = UserService.deleteUser(vm.userId);
            promise.success(function (user) {
                $location.url("/login");
            });

            promise.error(function (res, statusCode) {
                vm.error = res;
            });
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url('/');
                    }
                )
        }
        /*
        function getBookshelf() {
            vm.bookshelf = [];
            for (var bookId in vm.bookshelf) {
                // get book info from book database
                bookPromise = BookService.findBookById(bookId);
                bookPromise.success(function (matchedBook) {
                    vm.bookshelf.push(matchedBook);
                });
            }
        }
        */
    }

    // function BoobshelfController($routeParams, $location, UserService, BookService) {
    // }
})();