module.exports = function (app) {
    // var userModel = require('./models/user/user.model.server')();
    var model = require("./models/models.server.js")();

    require('./services/user.service.server')(app, model);
    require("./services/book.service.server")(app, model);
    require("./services/article.service.server")(app, model);

};