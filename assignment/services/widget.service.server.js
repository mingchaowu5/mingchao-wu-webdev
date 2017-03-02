module.exports = function (app) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgets);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/upload", upload.single('image-upload-file'), uploadImage);
    app.put("/api/page/:pageId/widget", sortWidget);

    var widgets = [
        {
            "_id": "123", "widgetType": "HEADING", "pageId": "321", "index": 0,
            "size": 2, "text": "GIZMODO"
        },
        {
            "_id": "234", "widgetType": "HEADING", "pageId": "321", "index": 1,
            "size": 4, "text": "Lorem ipsum"
        },
        {
            "_id": "345", "widgetType": "IMAGE",
            "pageId": "321", "index": 2,
            "width": "100%", "url": "http://lorempixel.com/400/200/"
        },
        {
            "_id": "456", "widgetType": "HTML", "pageId": "321", "index": 3,
            "text": "<p>Lorem ipsum</p>"
        },
        {
            "_id": "567", "widgetType": "HEADING", "pageId": "321", "index": 4,
            "size": 4, "text": "Lorem ipsum"
        },
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "index": 5,
            "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {
            "_id": "789", "widgetType": "HTML", "pageId": "321", "index": 6,
            "text": "<p>Lorem ipsum</p>"
        }
    ];

    function findAllWidgets(req, res) {
        var pageId = req.params.pageId;
        var requestWidgets = [];
        for (var i in widgets) {
            if (pageId == widgets[i].pageId) {
                requestWidgets.push(widgets[i]);
            }
        }
        res.json(requestWidgets);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        var widget = widgets.find(function (p) {
            return p._id == widgetId;
        });
        res.json(widget);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        for (var i in widgets) {
            if (widgets[i]._id == widgetId) {
                // widgets[i] = angular.copy(newWidget);
                widgets[i].widgetType = newWidget.widgetType;
                widgets[i].pageId = newWidget.pageId;
                widgets[i].index = newWidget.index;
                if (newWidget.widgetType == "HEADING") {
                    widgets[i].size = parseInt(newWidget.size);
                    widgets[i].text = newWidget.text;
                } else if (newWidget.widgetType == "IMAGE") {
                    widgets[i].width = newWidget.width;
                    widgets[i].url = newWidget.url;
                } else if (newWidget.widgetType == "YOUTUBE") {
                    widgets[i].width = newWidget.width;
                    widgets[i].url = newWidget.url;
                } else if (newWidget.widgetType == "HTML") {
                    widgets[i].text = newWidget.text;
                }
                res.json(newWidget);
            }
        }
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        widget._id = parseInt(widgets[widgets.length - 1]._id) + 1;
        widget.pageId = pageId;
        widget.index = 1;
        for (var i in widgets) {
            if (widgets[i].pageId == pageId) {
                widget.index += 1;
            }
        }
        widgets.push(widget);
        res.json(widget);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var i in widgets) {
            if (widgets[i]._id == widgetId) {
                widgets.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var redirectURL   = req.body.redirectURL;
        var uploadFile    = req.file;

        var originalname  = uploadFile.originalname; // file name on user's computer
        var filename      = uploadFile.filename;     // new file name in upload folder
        var format        = uploadFile.originalname.split(".").pop();
        console.log("f:"+format);
        var path          = uploadFile.path;         // full path of uploaded file
        var destination   = uploadFile.destination;  // folder where file is saved to
        var size          = uploadFile.size;
        var mimetype      = uploadFile.mimetype;

        for (var i in widgets) {
            if (widgets[i]._id == widgetId) {
                // widgets[i].url = "/uploads/" + md5(filename) + "." + format;
                widgets[i].url = "/uploads/" + filename;
                widgets[i].width = width;
                console.log("url:"+widgets[i].url);
                res.redirect("/assignment/#" + redirectURL);
                return;
            }
        }
        res.sendStatus(404);
    }

    function sortWidget(req, res) {
        var initial = req.query.initial;
        var final = req.query.final;
        var pageId = req.params.pageId;
        console.log("init, final:"+initial+final);
        if (initial < final) {
            moveUpWidget(pageId, initial, final);
        }
        else if (initial > final) {
            moveDownWidget(pageId, initial, final);
        }
        res.sendStatus(200);
    }

    function moveUpWidget(pageId, i, j) {
        for (var w in widgets) {
            if (widgets[w].index > i && widgets[w].index <= j && widgets[w].pageId == pageId) {
                console.log(widgets[w].index);
                widgets[w].index -= 1;
            }
            else if (widgets[w].index == i && widgets[w].pageId == pageId) {
                widgets[w].index = parseInt(j);
            }
        }
    }

    function moveDownWidget(pageId, i, j) {
        for (var w in widgets) {
            if (widgets[w].index < i && widgets[w].index >= j && widgets[w].pageId == pageId) {
                console.log(widgets[w].index);
                widgets[w].index += 1;
            }
            else if (widgets[w].index == i && widgets[w].pageId == pageId) {
                widgets[w].index = parseInt(j);
            }
        }
    }
};