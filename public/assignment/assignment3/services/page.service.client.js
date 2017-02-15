(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService() {
        var pages = [
            {"_id": 321, "name": "Post 1", "websiteId": "567", "title": "Lorem"},
            {"_id": 432, "name": "Post 2", "websiteId": "567", "title": "Lorem"},
            {"_id": 543, "name": "Post 3", "websiteId": "567", "title": "Lorem"}
        ];
        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };

        return api;

        function createPage(wid, page) {
            for (var p in pages)
            {
                if(pages[p].name === page.name)
                    return null;
            }

            var id = parseInt(pages[pages.length-1]._id);
            id++;
            page._id = id.toString();
            page.websiteId = wid.toString();
            pages.push(page);
            return angular.copy(page);
        }

        function findPageByWebsiteId(wid) {
            var reqPages = [];
            for (var p in pages)
            {
                if(pages[p].websiteId === wid)
                {
                    reqPages.push(pages[p]);
                }
            }
            return  angular.copy(reqPages);
        }

        function findPageById(_id) {
            for (var p in pages)
            {
                if(pages[p]._id === _id)
                    return angular.copy(pages[p]);
            }
            return null;
        }

        function updatePage(pid, page) {
            for (var p in pages)
            {
                if(pages[p]._id === pid)
                {
                    pages[p].name= page.name;
                    pages[p].description = page.description;
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function deletePage(pid) {
            for (var p in pages)
            {
                if(pages[p]._id === pid)
                {
                    var page = pages[p];
                    pages.splice(p,1);
                    return angular.copy(page);
                }
            }
            return null;
        }
    }
})();