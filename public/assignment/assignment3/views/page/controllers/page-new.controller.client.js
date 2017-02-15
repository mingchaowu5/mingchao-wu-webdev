(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);


    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.createPage = createPage;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        function init() {
            //load pages for landscape showing list
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();
        function createPage(page) {
            PageService.createPage(vm.websiteId, page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }
    }

})();