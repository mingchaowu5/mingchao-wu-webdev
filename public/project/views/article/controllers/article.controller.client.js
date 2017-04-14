
(function () {
    angular
        .module("CourseSystem")
        .controller("ArticleListController", ArticleListController)
        .controller("NewArticleController", NewArticleController)
        .controller("EditArticleController", EditArticleController)
        .controller("ArticleViewController", ArticleViewController);
    
    function ArticleViewController($sce, $routeParams, $location, ArticleService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.bookId = $routeParams.bid;
        vm.articleId = $routeParams.aid;
        vm.getTrustedHtml = getTrustedHtml;

        function init() {
            var promise = ArticleService.findArticleById(vm.articleId);
            promise
                .success(function (article) {
                    vm.article = article;
                })
                .error(function (err, status) {
                    vm.error = err;
                });
        }
        init();

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }
    }
    

    function ArticleListController($sce, $routeParams, $location, ArticleService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.bookId = $routeParams.bid;

        function init() {
            var promise = ArticleService.findArticlesByBookId(vm.bookId);
            promise
                .success(function (articles) {
                    vm.articles = articles;
                })
                .error(function (err, status) {
                    vm.error = err;
                });
        }

        init();
    }

    function NewArticleController($routeParams, $location, ArticleService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.bookId = $routeParams.bid;

        vm.createArticle = createArticle;

        function init() {
            var promise = ArticleService.findArticlesByBookId(vm.bookId);
            promise.success(function (articles) {
                vm.articles = articles;
            })
        }

        init();

        function createArticle(article) {
            console.log("creating article");
            console.log(article);
            var promise = ArticleService.createArticle(vm.bookId, article);
            promise.success(
                function (article) {
                    init();
                    $location.url("/writer/" + vm.userId + "/boob/" + vm.bookId + "/articles");
                });

            promise.error(function (res, status) {
                vm.error = res;
            });
        }
    }

    function EditArticleController($routeParams, $location, ArticleService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.bookId = $routeParams.bid;
        vm.articleId = $routeParams.aid;

        vm.updateArticle = updateArticle;
        vm.deleteArticle = deleteArticle;

        function init() {
            var promise = ArticleService.findArticleById(vm.articleId);
            promise.success(function (article) {
                vm.article = article;
            });

            promise.error(function (res, status) {
                vm.error = res;
            });
        }

        init();

        function updateArticle() {
            var promise = ArticleService.updateArticle(vm.articleId, vm.article);
            promise.success(function (article) {
                init();
                $location.url("/writer/" + vm.userId + "/book/" + vm.bookId + "/articles");
            });
            promise.error(function (res, status) {
                vm.error = res;
            });
        }

        function deleteArticle() {
            var promise = ArticleService.deleteArticle(vm.article._id);
            promise.success(function () {
                $location.url("/writer/" + vm.userId + "/book/" + vm.bookId + "/articles");
            });
        }
    }
})();