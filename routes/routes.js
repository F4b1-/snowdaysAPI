var appRouter = function(app) {

    app.all('/*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Request-Headers', 'X-Requested-With, accept, content-type');

        next();
    });

    app.get("/autoAllocation", function(req, res) {

        if(!req.query.username) {
            return res.send({"status": "error", "message": "missing username"});
        } else if(req.query.username != accountMock.username) {
            return res.send({"status": "error", "message": "wrong username"});
        } else {
            return res.send(accountMock);
        }
    });

    app.post("/autoAllocation", function(req, res) {
        var testHosts = [
            {"firstName": "Test Host", "lastName": "1"},
            {"firstName": "Test Host", "lastName": "2"},
            {"firstName": "Test Host", "lastName": "3"},
            {"firstName": "Test Host", "lastName": "4"}
        ];

        mappings = req.body.participants;
        mappings.forEach(function(obj) {
            var randHost = testHosts[Math.floor(Math.random() * testHosts.length)];
            obj.host = randHost;
        });
        return res.send(mappings);
    });
}

module.exports = appRouter;