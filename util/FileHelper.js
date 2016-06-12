/**
 * 文件操作帮助类
 */
var fs = require('fs');
var Promise = require('bluebird');
Promise.promisifyAll(fs);

exports.readFileAsync = function (path) {
    fs.readFileAsync(path).delay(0)      //delay 延迟执行， 单位毫秒
        .then(function (data) {
            var content = JSON.parse(data);
            console.log("content:"+content);
        }).catch(SyntaxError, function (e) {
            console.log("转换JSON出错");
        }).catch(function (e) {
            console.log("读取文件异常");
        });
}

