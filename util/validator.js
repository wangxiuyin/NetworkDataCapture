/**
 * 一些验证
 */
; (function () {
    var exports = {};

    function Exists() { }
    Exists.prototype = {
        /**
        * 检查传入值是否为空，空对象也成立
        */
        isEmpty: function (obj) {
            if (!obj) return true;

            if (typeof obj === "object") {
                for (var a in obj) {
                    return false;
                }
                return true;
            }
            return false;
        },
        /**
        * 检测对象是否是空对象（不包含任何属性）
        */
        isEmptyObject: function (obj) {
            if (typeof obj === "object") {
                for (var a in obj) {
                    return false;
                }
                return true
            }
            return false;
        },
        /**
        * 检测传入参数是否为对象
        */
        isObject: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Object]";
        },
        /**
        * 检测传入参数是否为函数
        */
        isFunction = function (obj) {
            return Object.prototype.toString.call(obj) === "[object Function]";
        },
        /**
        * 检测传入参数是否为数组
        */
        isArray = function (obj) {
            return Object.prototype.toString.call(obj) === "[object Array]";
        },
        /**
         * 检测传入参数是否为布尔值
         */
        isBoolean = function (obj) {
            return Object.prototype.toString.call(obj) === "[object Boolean]";
        },
        /**
         * 检测传入参数是否为字符串
         */
        isString = function (obj) {
            return Object.prototype.toString.call(obj) === "[object String]";
        },
        /**
         * 检测传入参数是否为数字或者是数字格式的字符串
         */
        isNumeric = function (obj) {
            var type = Object.prototype.toString.call(obj);
            return (type === "[object Number]" || type === "[object String]") && !isNAN(obj - parseFloat(obj));
        },
        /**
         * 检测传入参数是否为数字
         */
        isNumber = function (obj) {
            return Object.prototype.toString.call(obj) === "[object Number]";
        },
        /**
         * 检测传入参数是否为时间类型
         */
        isDate = function (obj) {
            return Object.prototype.toString.call(obj) === "[object Date]";
        },
        /**
         * 检测传入参数是否为正则表达式
         */
        isRegExp = function (obj) {
            return Object.prototype.toString.call(obj) === "[object RegExp]";
        }
    }
})();

//---------------------------字符串相关判断-------------------------------
function CoreString() {

}

/**
 * 除去字符中的首尾空格
 */
CoreString.prototype.trim = _trim;

/**
 * 判断传入的字符串是否为Null或者为空字符串。
 */
CoreString.prototype.isNullOrEmpty = _isNullOrEmpty;

/**
 * 判断传入的字符串是否为Null或者为空字符串或者全是空格。
 */
CoreString.prototype.isNullOrWriteSpace = function (str) {
    return _isNullOrEmpty(str) || _trim(String(str)) === "";
}
module.exports = { coreString: new CoreString() };
exports.coreString = function () {
    return new CoreString();
}
//console.log(Object.prototype.toString.call(/^&/));





//-----------------------------私有方法--------------------------------
/**
 * 除去字符中的首尾空格
 */
function _trim(text) {
    return text === null ? "" : (text + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
/**
 * 判断传入的字符串是否为Null或者为空字符串。
 */
function _isNullOrEmpty(str) {
    return typeof str === "undefined" || str === null || str === "";
}