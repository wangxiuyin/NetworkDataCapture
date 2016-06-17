; (function () {

    "use strict";

    var coreString = require("./coreString.js");

    var coreStr = new coreString.CoreString();

    function CoreUtil() { }

    CoreUtil.prototype = {
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
         * 测试对象是否是纯粹的对象（通过 "{}" 或者 "new Object" 创建的）。
         */
        isPlainObject: function (obj) {
            return typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype;
        },
        /**
        * 检测传入参数是否为函数
        */
        isFunction: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Function]";
        },
        /**
        * 检测传入参数是否为数组
        */
        isArray: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Array]";
        },
        /**
         * 检测传入参数是否为布尔值
         */
        isBoolean: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Boolean]";
        },
        /**
         * 检测传入参数是否为字符串
         */
        isString: function (obj) {
            return Object.prototype.toString.call(obj) === "[object String]";
        },
        /**
         * 检测传入参数是否为数字或者是数字格式的字符串
         */
        isNumeric: function (obj) {
            var type = Object.prototype.toString.call(obj);
            return (type === "[object Number]" || type === "[object String]") && !isNaN(obj - parseFloat(obj));
        },
        /**
         * 检测传入参数是否为数字
         */
        isNumber: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Number]";
        },
        /**
         * 检测传入参数是否为时间类型
         */
        isDate: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Date]";
        },
        /**
         * 检测传入参数是否为正则表达式
         */
        isRegExp: function (obj) {
            return Object.prototype.toString.call(obj) === "[object RegExp]";
        },
        /**
         * 生成一个 Guid(全球唯一标识符) 值；该函数定义如下参数：
         *      format: String 类型值，一个单格式说明符，它指示如何格式化此 Guid 的值。‎format 参数可以是：
         *          "N":    返回值的格式 32 位(xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx)
         *          "D":    返回值的格式 由连字符分隔的 32 位数字(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
         *          "B":    返回值的格式 括在大括号中、由连字符分隔的 32 位数字({xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx})
         *          "P":    返回值的格式 括在圆括号中、由连字符分隔的 32 位数字((xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx))
         *          如果 format 为 null 或空字符串 ("")，则使用 "D"。
         *      length: Number 类型值，表示返回字符串的长度；如果不定义该参数，则全部返回。
         */
        guid: function (format, length) {
            format = !coreStr.isNullOrWriteSpace(format) ? format.toLowerCase() : "d";
            length = (length == null || typeof length === "undefined" || !this.isNumeric(length)) ? 32 : length;
            if (length > 32 || length == 0) {
                length = 32;
            }
            if (length < -32) {
                length = -32;
            }
            var str = "";
            for (var i = 1; i < 32; i++) {
                str += Math.floor(Math.random() * 16.0).toString(16);
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    str += "-";
                }
            }
            switch (format) {
                case "n":
                    str = coreStr.replaceAll(str, "-", "");
                    break;
                case "b":
                    str = "{" + str + "}";
                    break;
                case "p":
                    str = "(" + str + ")";
                    break;
                case "d":
                default:
                    break;
            }
            return length >= 0 ? coreStr.left(str, length) : coreStr.right(str, Math.abs(length));  //Math.abs(double a) 取绝对值
        },
    };


    module.exports = CoreUtil;
})();