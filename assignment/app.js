module.exports = function (app) {
    var model = require("./model/models.server")();
    require("./services/flickr.service.server")(app, model);
    require("./services/user.service.server")(app);
    require("./services/website.service.server")(app);
    require("./services/page.service.server")(app);
    require("./services/widget.service.server")(app);
};