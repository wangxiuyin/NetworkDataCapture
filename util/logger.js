var logger = {};
exports.logger = logger;

var log = require("log4js");
var fs = require("fs");
var path = require("path");

var logConfig = JSON.parse(fs.readFileSync("../log4js.json", "utf8"));
if(logConfig.appenders){
    var customerBaseDir = logConfig["customerBaseDirectory"];
    var customerDefaultAttr = logConfig["customerDefaultAttribute"];
    for(var i = 0, len = logConfig.appenders.length; i < len; i++){
        var item = logConfig.appenders[i];
        if(item["type"] === "console"){
            continue;
        }
        //将customerDefaultAttribute中的对象添加到appenders中除
        if(customerDefaultAttr != null){
            for(var attr in customerDefaultAttr){
                if(item[attr] == null){
                    item[attr] = customerDefaultAttr[attr];
                }
            }
        }
        //设置日志文件到根目录下的/logs文件夹下
        if(customerBaseDir != null){
            if(item["filename"] == null){
                item["filename"] == __dirname + customerBaseDir;
            }else{
                item["filename"] == __dirname + customerBaseDir + item["filename"];
            }
        }
        var fileName = item["filename"];
        if(fileName == null) continue;
        if(item["pertten"] != null){
            fileName += item["pertten"];
        }
        var dir = path.dirname(fileName);
        directoryExistsOrCreate(dir);
    }
}
//以上代码是确保在项目中有log4js.json中配置的文件夹，不然会报错
log.configure(logConfig);
var debug = log.getLogger("debug");
var info = log.getLogger("info");
var warn = log.getLogger("warn");
var error = log.getLogger("error");
logger.debug = function (message) {
    if(message == null){
        message = "";
    }
    debug.debug(message);
};
logger.info = function(message){
    if(message == null){
        message = "";
    }
    info.info(message);
};
logger.warn = function (message) {
    if(message == null){
        message = "";
    }
    warn.warn(message);
};
logger.error = function(message, exp){
    if(message == null){
        message = "";
    }
    if(exp != null){
        message += "\r\n"+exp;
    }
    error.error(message);
};

exports.use = function (app) {
    app.use(log.connectLogger(info, {levels:"debug", format:"method :url"}));
}

function directoryExistsOrCreate(directory){
    fs.exists(directory, function (exists) {
        if(!exists){
            fs.mkdir(directory, function (err) {
                if(err){
                    throw err;
                }
            });
        }
    });
}