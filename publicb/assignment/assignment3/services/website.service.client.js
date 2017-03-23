(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    function WebsiteService() {
        var websites = [
            {"_id": 123, "name": "Facebook", "developerId": "456", "description": "Lorem"},
            {"_id": 234, "name": "Tweeter", "developerId": "456", "description": "Lorem"},
            {"_id": 456, "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
            {"_id": 567, "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            {"_id": 678, "name": "Checkers", "developerId": "123", "description": "Lorem"},
            {"_id": 789, "name": "Chess", "developerId": "234", "description": "Lorem"}
        ];
        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function createWebsite(uid, website) {
            for (var w in websites)
            {
                if(websites[w].name == website.name)
                    return null;
            }

            var id = parseInt(websites[websites.length-1]._id);
            id++;
            website._id = id.toString();
            website.developerId = uid.toString();
            websites.push(website);
            return angular.copy(website);
        }

        function findWebsitesByUser(developerId) {
            var userWebsites = [];
            for (var w in websites)
            {
                if(websites[w].developerId == developerId)
                {
                    userWebsites.push(websites[w]);
                }
            }
            return  angular.copy(userWebsites);
        }

        function findWebsiteById(_id) {
            for (var w in websites)
            {
                if(websites[w]._id == _id)
                    return angular.copy(websites[w]);
            }
            return null;
        }

        function updateWebsite(wid, website) {
            for (var w in websites)
            {
                if(websites[w]._id == wid)
                {
                    websites[w].name= website.name;
                    websites[w].description = website.description;
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function deleteWebsite(wid) {
            for (var w in websites)
            {
                if(websites[w]._id == wid)
                {
                    var website = websites[w];
                    websites.splice(w,1);
                    return angular.copy(website);
                }
            }
            return null;
        }
    }
})();