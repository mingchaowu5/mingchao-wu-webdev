module.exports = function (app) {
    // var userModel = require('./models/user/user.model.server')();
    var model = require("./models/models.server.js")();

    require('./services/user.service.server')(app, model);
    require("./services/book.service.server")(app, model);

    // var mongoose = require("mongoose");
    // var connectionString = 'mongodb://127.0.0.1:27017/project';
    // var db = mongoose.createConnection(connectionString);
    // var db = mongoose.connect(connectionString);
};