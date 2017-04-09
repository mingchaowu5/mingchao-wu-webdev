
(function () {
   angular
       .module("WebProject")
       .controller("AdminController", AdminController);
   
   function AdminController(UserService) {

       var vm = this;
       vm.createUser = createUser;

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
       
       function createUser(user) {
           console.log(user);
           var promise = UserService.createUser(user);
           promise.success(function (user) {
               init();
           });

           promise.error(function (data, status) {
               vm.error = data;
           });
       }
   }
})();