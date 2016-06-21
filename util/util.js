/**
 * 一些帮助方法
 */
// var validator = require("./validator.js");
// var tool = require("./tools.js");

var str = require("./coreString");

console.log(str.isDate("2011-03-01 12:12:12"));


// var coreString = require("./coreString");

// var coreStr = new coreString.CoreString();
// var str = "2341234_dafadfa_222_dafda_ads";
// console.log(coreStr.replaceAll(str, "_", "~"));
// var str = "abcd";
// var s = coreStr.reverse(str);
// console.log(str+"--"+s);

// console.log(coreStr.isNullOrWriteSpace(""));

// console.log(validator.coreString.trim(" dddd "));
//console.log((new validator.CoreUtil()).isArray(" dd "));


// exports.extend = function () {
//     var target = arguments[0] || {};
//     var lenght = arguments.length;
//     var i = 1;

// }


var r = String(new Date()).match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
console.log(r);