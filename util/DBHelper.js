'use strict';

var mysql = require("mysql");
var config = require("../config");
var log = require("./logger");

var connection;
//pool断线后在node-mysql内部是移除了连接，在下次访问时会自动再次创建连接
var pool = mysql.createPool(config.db);

/**
 * 连接中断后，自动重连
 */
exports.handleDisconnect = function handleDisconnect() {
    connection = mysql.createConnection(config.db);
    connection.connect(function (err) {
        if(err){
            //记录日志
            log.WARN.toString("进行断线重连：" + new Date());
            setTimeout(handleDisconnect, 2000);
            return;
        }
        log.INFO.toString("连接成功");  
    });
    connection.on("error", function (err) {
        //记录日志
        if(err.code === "PROTOCOL_CONNECTION_LOST"){
            handleDisconnect();
        }else{
            //记录日志
            throw err;
        }
    });
}

exports.executeSql = function (sql, params, fn, connect) {
    var exec = function (connect) {
        connect.query(sql, params, function (err, result) {
            if(err){
                //记录日志
                connect.release();
                fn();
            }else{
                if(!connect){
                    connect.release();
                }
                fn(result);
            }
        });
    }
    
    if(connect){
        exec(connect);
    }else{
        pool.getConnection(function (err, conn) {
            if(err){
                conn.release();
                fn();
            }else{
                exec(conn);
            }
        });
    }
}
