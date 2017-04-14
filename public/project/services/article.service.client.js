
(function () {
    angular
        .module("CourseSystem")
        .factory("ArticleService", ArticleService);

    function ArticleService($http) {
        var api = {
            "createArticle": createArticle,
            "findArticlesByBookId": findArticlesByBookId,
            "findArticleById": findArticleById,
            "updateArticle": updateArticle,
            "deleteArticle": deleteArticle,
            "findPopularArticles": findPopularArticles
        };
        return api;

        function createArticle(bookId, newArticle) {
            return $http.post("/aw/api/book/" + bookId +"/article", newArticle);
        }

        function findArticlesByBookId(bookId) {
            // /aw/api/book/:bookId/article
            return $http.get("/aw/api/book/" + bookId + "/article");
        }

        function findArticleById(articleId) {
            return $http.get("/aw/api/article/" + articleId);
        }

        function updateArticle(articleId, newArticle) {
            return $http.put("/aw/api/article/" + articleId, newArticle);
        }

        function deleteArticle(articleId) {
            return $http.delete("/aw/api/article/" + articleId);
        }

        function findPopularArticles(amount) {
            return $http.get("/aw/api/article/popular/"+amount);
        }
    }
})();