'use strict';

function Logger(level) {
    this.level = level;
}

var log = require("log4js");
var fs = require("fs");
var path = require("path");
var config = require("../config");
//获取根目录
var rootPath = __dirname.substring(0, __dirname.lastIndexOf("/") + 1);
var env = config.env; //什么模式
//获取配置文件中的内容
//var log4jsConfig = fs.readFileSync("../log4js.json", "utf8");
var log4jsConfig = '{"development":[{"appenders":[{"type":"console", "category":"console"}],"replaceConsole":true,"levels":"ALL"}]}';
var logConfig;
if(env === "development"){
    logConfig = JSON.parse(log4jsConfig).development[0];
}else{
    logConfig = JSON.parse(log4jsConfig).production[0];
    
    existsOrCreateDirectory(logConfig);
}

//将将配置文件加入到log4js中
log.configure(logConfig);
/**
 * 日志输出
 */
Logger.prototype.toString = function (message) {
    var loggerObj;
    if(env == "development"){
        loggerObj = log.getLogger("console");
    }else{
        loggerObj = log.getLogger(this.level);
    }
    switch(this.level){
        case "debug":
            loggerObj.debug(message);
            break;
        case "info":
            loggerObj.info(message);
            break;
        case "warn":
            loggerObj.warn(message);
            break;
        case "error":
            loggerObj.error(message);
            break;
    }
}
/**
 * 产品模式下以文件的方式来保存日志，这里是处理配置文件中所配置的文件路径问题
 */
function existsOrCreateDirectory(logConfig) {
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
                    item["filename"] = rootPath + customerBaseDir;
                }else{
                    item["filename"] = rootPath + customerBaseDir + item["filename"];
                }
            }
            var fileName = item["filename"];
            if(fileName == null) continue;
            
            if(item["pattern"] != null){
                fileName += item["pattern"];
            }
            var dir = path.dirname(fileName);
            directoryExistsOrCreate(dir);
        }
    }
}
/**
 * 判断目录是否存在，如果不存在则创建
 */
function directoryExistsOrCreate(directory){
    if(!fs.existsSync(directory)){
        fs.mkdirSync(directory);
    }
}

module.exports = {
    DEBUG: new Logger("debug"),
    INFO: new Logger("info"),
    WARN: new Logger("warn"),
    ERROR: new Logger("error")
};

exports.use = function (app) {
    app.use(log.connectLogger(info, {levels:"auto", format:"method :url"}));
}
