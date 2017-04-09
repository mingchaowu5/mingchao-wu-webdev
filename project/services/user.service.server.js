module.exports = function (app, model) {
    // passport
    /*
     var passport      = require('passport');
     var auth = authorized;

     app.post  ('/api/login', passport.authenticate('local'), login);
     app.post  ('/api/logout',         logout);
     app.post  ('/api/register',       register);
     app.post  ('/api/user',     auth, createUser);
     app.get   ('/api/loggedin',       loggedin);
     app.get   ('/api/user',     auth, findAllUsers);
     app.put   ('/api/user/:id', auth, updateUser);
     app.delete('/api/user/:id', auth, deleteUser);

     function authorized (req, res, next) {
     if (!req.isAuthenticated()) {
     res.send(401);
     } else {
     next();
     }
     };
     */

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    var bcrypt = require("bcrypt-nodejs");
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // old
    app.post('/aw/api/login', passport.authenticate('local'), login);
    app.get('/aw/api/loggedin', loggedin);
    app.post('/aw/api/logout', logout);
    app.post("/aw/api/register", register);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/#/user', // TODO: add user id to this?
            failureRedirect: '/#/login'
        }));

    app.post("/aw/api/user", createUser);
    app.get("/aw/api/user?username=username", findUserByUsername);
    app.get("/aw/api/user", findUserByCredentials);
    app.get("/aw/api/user/:userId", findUserByUserId);
    app.put("/aw/api/user/:userId", updateUser);
    app.delete("/aw/api/user/:userId", deleteUser);
    app.get("/aw/api/user", findUser);
    app.get("/aw/api/allusers", findAllUsers);

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);

        userModel
            .createUser(user)
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
            );
    }

    function localStrategy(username, password, done) {
        console.log(username);
        console.log(password);
        model.UserModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if (user.username === username && user.password === password) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        model.UserModel
            .findUserByFacebookId(profile.id) // TODO: Use the ID to look up the user in the database.
            .then(
                function (user) {
                    console.log("facebook login successful");
                    // TODO: user is there, log them in
                },
                function (err) {
                    console.log("facebook login failed");
                    // TODO: user is not there store as a new user
                }
            );
    }

    function login(req, res) {
        if(user && bcrypt.compareSync(password, user.password)) {
            return done(null, user);
        } else {
            return done(null, false);
        }
        // TODO: is this really checking the user from the database?
        // var user = req.user;
        // res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut(); // nullify the cookie
        res.send(200);
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.UserModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    console.log(err);
                    done(err, null);
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
        model.UserModel
            .createUser(newUser)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findUserByUserId(req, res) {
        var userId = req.params.userId;

        model.UserModel
            .findUserById(userId)
            .then(
                function (response) {
                    res.send(response);
                })
            .catch(function (err) {
                res.status(500).send(err);
            });
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];

        model.UserModel
            .findUserByUsername(username)
            .then(
                function (response) {
                    res.send(response);
                }
            )
            .catch(function (err) {
                res.status(500).send(err);
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        model.UserModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.json(user);
                }
            );
    }

    function findAllUsers(req, res) {
        console.log("finding all users in user service server");
        model.UserModel
            .findAllUsers()
            .then(
                function (users) {
                    res.send(users);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;

        model.UserModel
            .updateUser(userId, newUser)
            .then(
                function (status) {
                    res.sendStatus(200);
                }
            )
            .catch(function (err) {
                res.status(500).send(err);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;

        var userId = req.params.userId;

        model.UserModel
            .deleteUser(userId)
            .then(
                function (status) {
                    res.sendStatus(200);
                }
            )
            .catch(
                function (err) {
                    res.status(500).send(err);
                }
            );
    }
};