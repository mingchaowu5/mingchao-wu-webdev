
module.exports = function (app) {

    var mongoose = require("mongoose");
    var mongojs = require('mongojs');

    var userModel = require("./user/user.model.server")();

    var connectionString = 'mongodb://127.0.0.1:27017/project';

    if(process.env.MONGODB_URI){
        connectionString = process.env.MONGODB_URI;
    } else if (process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    mongoose.connect(connectionString);
    // mongoose.createConnection(connectionString);
    // mongojs(connectionString);

    // var newUser = new Object({username: "dave", password: "dave", firstName: "dave", lastName: "dave", role: "reader"});
    // userModel.createUser(newUser);

    var model = {
        // developerModel: require("./developer/developer.models.server")(),
        // applicationModel: require("./application/application.models.server")(),
        // shareModel: require("./application/share.models.server")(applicationModel),
        // pageModel: require("./page/page.models.server")(applicationModel),
        // widgetMode: require("./widget/widget.models.server")(applicationModel),
        UserModel: userModel,
        mongojs: mongojs
    };

    return model;
}