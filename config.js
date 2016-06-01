//数据库名称
const DATABASENAME = "NodeSample";
/**
 * config 配置
 */
var config = {
    rootPath: "NetworkDataCapture",
    env: "development",
    //mysql 连接字符串配置
    db: {
        host: "localhost",
        port: "3306",
        user: "root",
        password: "123456",
        database: DATABASENAME,
        queryFormat: function (query, values) {
            if(!values) return query;
            return query.replace(/\:(\w+)/g, function (txt,key) {
                if(values.hasOwnProperty(key)){
                    return this.escape(values[key]);
                }
                return txt;
            }.bind(this));
        }
    }
};
module.exports = config;