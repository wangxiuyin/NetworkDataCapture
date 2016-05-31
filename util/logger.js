var logger = {};
exports.logger = logger;

var log = require("log4js");
var fs = require("fs");
var path = require("path");

var logConfig = JSON.parse(fs.readFileSync("../log4js.json", "utf8"));
if(logConfig.appenders){
    var customerBaseDir = logConfig["customerBaseDirectory"];
    var customerDefaultAttr = logConfig["customerDefaultAttribute"];
    
}
