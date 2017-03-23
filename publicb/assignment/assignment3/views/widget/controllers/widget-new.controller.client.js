(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.createWidget = createWidget;
        vm.chooseWidgetType = chooseWidgetType;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.widgetType = $routeParams["wgt"];

        function init() {
            vm.widget = {"widgetType" : vm.widgetType};
        }

        init();

        function createWidget(widget) {
            vm.widget = WidgetService.createWidget(vm.pageId, widget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }

        function chooseWidgetType(widgetType) {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/new/"+widgetType);
        }
    }

})();