(function () {
    angular
        .module("WebAppMaker")
      .controller("NewWebsiteController", NewWebsiteController);


    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.createWebsite = createWebsite;
        vm.userId = $routeParams["uid"];

        function init() {
            //load websites for landscape showing list
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        init();

        function createWebsite(website) {
            WebsiteService.createWebsite(vm.userId, website);
            $location.url("/user/"+vm.userId+"/website");
        }
    }

})();