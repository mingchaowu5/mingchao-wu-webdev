(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);
    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
            for (var i in vm.widgets) {
                if (vm.widgets[i].widgetType == "HTML") {
                    vm.widgets[i].html = $sce.trustAsHtml(vm.widgets[i].text);
                }
                else if (vm.widgets[i].widgetType == "youtube") {
                    vm.widgets[i].trust_url = getYouTubeEmbedUrl(vm.widgets[i].url);
                } else if (vm.widgets[i].widgetType == "image") {
                    vm.widgets[i].trust_url = $sce.trustAsResourceUrl(vm.widgets[i].url);
                }
            }
        }

        init();

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }

})();