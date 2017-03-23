(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    function UserService() {
        var users = [
            {
                "_id": 123,
                "username": "alice",
                "password": "alice",
                "firstName": "Alice",
                "lastName": "Wonder",
                "email": "alice@neu.edu"
            },
            {
                "_id": 234,
                "username": "bob",
                "password": "bob",
                "firstName": "Bob",
                "lastName": "Marley",
                "email": "bob@neu.edu"
            },
            {
                "_id": 345,
                "username": "charly",
                "password": "charly",
                "firstName": "Charly",
                "lastName": "Garcia",
                "email": "charly@neu.edu"
            },
            {
                "_id": 456,
                "username": "jannunzi",
                "password": "jannunzi",
                "firstName": "Jose",
                "lastName": "Annunzi",
                "email": "jannunzi@neu.edu"
            }
        ];
        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;
        function createUser(user) {
            if (findUserByUsername(user.username)) {
                return null;
            } else {
                user._id = users[users.length - 1]._id + 1;
                users.push(user);
                return angular.copy(user);
            }
        }


        function findUserById(_id) {
            for (var u in users)
            {
                if(users[u]._id == _id)
                    return angular.copy(users[u]);
            }
            return null;
        }
        function findUserByUsername(username) {
            for (var i in users) {
                if (users[i].username == username) {
                    return angular.copy(users[i]);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var i in users) {
                if (users[i].username == username && users[i].password == password) {
                    return angular.copy(users[i]);
                }
            }
            return null;
        }


        function deleteUser(id) {
            for (var i in users) {
                if (users[i]._id == id) {
                    users.splice(i, 1);
                }
            }
        }

        function updateUser(uid, user) {
            for (var u in users) {
                if (users[u]._id == uid) {
                    users[u].password = user.password;
                    users[u].firstName = user.firstName;
                    users[u].lastName = user.lastName;
                    users[u].email = user.email;
                    return angular.copy(users[u]);
                }
            }
            return null;
        }

    }
})();
