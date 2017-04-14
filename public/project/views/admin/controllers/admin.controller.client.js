
(function () {
   angular
       .module("CourseSystem")
       .controller("AdminController", AdminController);
   
   function AdminController(UserService) {

       var vm = this;
       vm.register = register;
       vm.updateUser = updateUser;
       vm.deleteUser = deleteUser;

       function init() {
           var promise = UserService.findAllUsers();
           promise.success(function (users) {
               vm.users = users;
           });

           promise.error(function (data, status) {
               vm.error = data;
           });
       }
       init();
       
       function register(user) {
           if (!user || !user.username || !user.password) {
               vm.error = "missing required field";
               return;
           }

           var promise = UserService.register(user);
           promise.success(function (user) {
               init();
           });

           promise.error(function (data, status) {
               vm.error = data;
           });
       }

       function updateUser(user) {
           if (!user || !user.username || !user.password) {
               vm.error = "missing required field";
               return;
           }

           var promise = UserService.updateUser(user._id, user);
           promise.success(function (user) {
               init();
           });

           promise.error(function (data, status) {
               vm.error = data;
           });
       }

       function deleteUser(userId) {
           var promise = UserService.deleteUser(userId);
           promise.success(function (user) {
               init();
           });

           promise.error(function (data, status) {
               vm.error = data;
           });
       }
   }
})();