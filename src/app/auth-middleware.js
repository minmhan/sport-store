const jwt = require("jsonwebtoken");

const APP_SECRET = "secret";
const USERNAME = "admin";
const PASSWORD = "password";

module.exports = function(req, res, next) {
    if(req.url == "/login" && req.method == "POST"){
        if(req.body != null && req.body.name == "USERNAME" && req.body.password == "PASSWORD"){
            let token = jwt.sign({ data:USERNAME, expiresIn: "1h"}, APP_SECRET);
            res.json({ success: true, token: token });
        }
        else {
            res.json( { success: false });
        }
        res.end();
        return;
    }
    else if ((req.url.startsWith("/products") && req.method != "GET")
        || (req.url.startsWith("/orders") && req.method != "POST")){
            let token = req.headers["authorization"];
            if(token != null && token.startsWith("Bearer<")){
                token = token.substring(7, token.length - 1);
                try{
                    jwt.verify(token, APP_SECRET);
                    next();
                    retun;
                } catch(err) {}
            }
        res.statusCode = 401;
        res.end();
        return;
    }
}