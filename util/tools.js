var exports = {};

var arr = new Array();
arr.push("ddd");
arr.push("test");

exports.arr = arr;

function test() {
    
}
test.prototype.name = "test";

exports.test = test;

exports.name = "ddd";

exports.Test = function () {
    return new test();
}

if(typeof module !== "undefined" && module.exports){
    module.exports = exports;
}