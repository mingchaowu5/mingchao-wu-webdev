
(function () {
    angular
        .module("WebProject")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            "createUser": createUser,
            "findUserByUsername": finderUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "login": login,
            "register": register,
            "logout": logout,
            "checkLoggedIn": checkLoggedIn,
            "findAllUsers": findAllUsers
        };
        return api;

        function register(user) {
            return $http.post("/api/register", user);
        }

        function findAllUsers(callback) {
            var users = [
                {first: "Alice", last: "Wonderland", username: "alice", email: "alice@wonderland.com"}
            ];
            // callback(users);
            return $http.get("/aw/api/allusers");
        }

        function login(user) {
            return $http.post("/aw/api/login", user);
            // return $http.get("/aw/api/user?username=" + user.username + "&password=" + user.password);
        }

        function logout(user) {
            return $http.post("/aw/api/logout", user);
        }

        function checkLoggedIn() {
            return $http.get('/aw/api//loggedin')
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(newUser) {
            return $http.post("/aw/api/user", newUser);
        }

        function finderUserByUsername(username) {
            return $http.get("/aw/api/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            // assignment 4: moving to server side
            // /aw/api/user?username=username&password=password
            return $http.get("/aw/api/user?username=" + username + "&password=" + password);
        }

        function findUserById(userId) {
            return $http.get("/aw/api/user/" + userId);
        }

        function updateUser(userId, newUser) {
            return $http.put("/aw/api/user/" + userId, newUser);
        }

        function deleteUser(userId) {
            return $http.delete("/aw/api/user/" + userId);
        }
    }
})();