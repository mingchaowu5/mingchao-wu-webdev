
(function () {
    angular
        .module("WebProject")
        .config(configuration);

    function configuration($routeProvider, $locationProvider) {
        var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
            console.log("checking logged in");
            var deferred = $q.defer();
            $http.get('/api/loggedin').success(function (user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url('/');
                }
            });
            return deferred.promise;
        };

        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.client.html",
                controller: "LoginController",
                // controller: "HomeController",
                controllerAs: "models"
            })
            .when("/home", {
                templateUrl: "views/home/home.view.client.html",
                controller: "LoginController",
                // controller: "HomeController",
                controllerAs: "models"
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", { // for both reader and writer profiles
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/templates/admin.view.client.html",
                controller: "AdminController",
                controllerAs: "model"
                // resolve: {
                //     isAdmin: checkIsAdmin
                // }
            })
            .when("/reader/:uid/bookshelf", { // show all books that is on user's shelf
                templateUrl: "views/user/templates/reader/bookshelf.view.client.html",
                controller: "ReaderController",
                controllerAs: "model"
            })
            .when("/writer/:uid/published", { // listing all the books having this user as an author
                templateUrl: "views/user/templates/writer/publish-list.view.client.html",
                controller: "WriterController",
                controllerAs: "model"
            })
            .when("/reader/:uid/book/:bid", { // show all the visible chapters of this book for the reader
                templateUrl: "views/book/templates/book-list.view.client.html",
                controller: "ViewBookController",
                controllerAs: "models"
            })
            .when("/writer/:uid/book/new", { // add new book with this user as the 1st author
                templateUrl: "views/book/templates/book-new.view.client.html",
                controller: "NewBookController",
                controllerAs: "models"
            })
            .when("/writer/:uid/book/:bid", { // change title, Nid etc. add/remove new articles to this book
                templateUrl: "views/book/templates/book-edit.view.client.html",
                controller: "EditBookController",
                controllerAs: "models"
            })

            /*
             TODO: add article controllers/pages
             .when("/writer/:uid/book/:bid/page", {
             templateUrl: "views/page/templates/page-list.view.client.html",
             controller: "PageListController",
             controllerAs: "models"
             })
             .when("/user/:uid/website/:wid/page/new", {
             templateUrl: "views/page/templates/page-new.view.client.html",
             controller: "NewPageController",
             controllerAs: "models"
             })
             .when("/user/:uid/website/:wid/page/:pid", {
             templateUrl: "views/page/templates/page-edit.view.client.html",
             controller: "EditPageController",
             controllerAs: "models"
             })
             .when("/user/:uid/website/:wid/page/:pid/widget", {
             templateUrl: "views/widget/templates/widget-list.view.client.html",
             controller: "WidgetListController",
             controllerAs: "models"
             })
             .when("/user/:uid/website/:wid/page/:pid/widget/new", {
             templateUrl: "views/widget/templates/widget-chooser.view.client.html",
             controller: "NewWidgetController",
             controllerAs: "models"
             })
             .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
             templateUrl: "views/widget/templates/widget-edit.view.client.html",
             controller: "EditWidgetController",
             controllerAs: "models"
             })
             .when("/user/:uid/website/:wid/page/:pid/widget/:wgid/flickr", {
             templateUrl: "views/widget/templates/widget-flickr-search.view.client.html",
             controller: "FlickrImageSearchController",
             controllerAs: "models"
             })
             */
            .otherwise({
                templateUrl: "views/home/home.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            });
        // $locationProvider.html5Mode(true);
    }
})();