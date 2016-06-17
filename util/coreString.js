/**
 * 一些验证
 */
; (function () {
    "use strict";

    var exports = {};

    function CoreString() {

    }

    CoreString.prototype = {

        /**
         * 判断传入的字符串是否为Null或者为空字符串。
         */
        isNullOrEmpty: function (str) {
            return typeof str === "undefined" || str === null || str === "";
        },

        /**
         * 判断传入的字符串是否为Null或者为空字符串或者全是空格。
         */
        isNullOrWriteSpace: function (str) {
            return this.isNullOrEmpty(str) || this.trim(String(str)) === "";
        },

        /**
         * 除去字符中的首尾空格
         */
        trim: function (str) {
            return str === null ? "" : (str + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
        },

        /**
         * 用新字符串替换与给定字符串匹配的所有子串；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值
         */
        replaceAll: function (str, substr, replacement) {
            if (!str || substr == replacement) {
                return str;
            }
            str = _getStr(str);
            var length = str.length, i = 0;
            while (str.indexOf(substr) > -1 && i++ < length) {
                str = str.replace(substr, replacement);
            }
            return str;
        },
        /**
         * 判断当前字符串对象是否包含指定的字符串内容。
         */
        contains: function (str, val) {
            str = _getStr(str);
            return String(str).indexOf(val) > -1;
        },
        /**
         * 字符串反转；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值
         */
        reverse: function (str) {
            str = _getStr(str);
            var arr = [];
            for (var i = str.length - 1; i >= 0; i--) {
                arr.push(str[i]);
            }
            return arr.join("");
        },
        /**
         * 去除字符串左边的空格；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值。
         */
        ltrim: function (str) {
            str = _getStr(str);
            return str.replace(/(^\s*)/g, "");
        },
        /**
         * 去除字符串右边的空格；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值。
         */
        rtirm: function (str) {
            str = _getStr(str);
            return str.replace(/(\s*$)/g, "");
        },
        /**
         * 判断当前 String 对象是否以指定的字符串开头。
         */
        startsWith: function (str, val) {
            str = _getStr(str);
            return str.substr(0, val.length) == val;
        },
        /**
         * 判断当前 String 对象是否以指定的字符串结尾。
         */
        endsWith: function (str, val) {
            str = _getStr(str);
            return str.substr(str.length - val.length) == val;
        },
        /**
         * 截取当前字符串左边的指定长度内容。
         */
        left: function (str, len) {
            str = _getStr(str);
            if(!_isNumeric(len)){
                len = parseInt(len, 10);
            }
            if(len < 0 || len > str.length){
                len = str.length;
            }

            return str.substr(0, len);
        },
        /**
         * 截取当前字符串右边的指定长度内容。
         */
        right:function (str, len) {
            str = _getStr(str);
            if(!_isNumeric(len)){
                len = parseInt(len, 10);
            }
            if(len < 0 || len > str.length){
                len = str.length;
            }
            return str.substring(str.length - len, str.length);
        },

        isLongDate:function (str) {
            str = _getStr(str);
            var r = str.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
            if(r == null){
                return false;
            }
            var d = new Date(r[1], r[3]-1, r[4], r[5], r[6], r[7]);
        }
    };

    exports.CoreString = CoreString;
    exports.coreString = function () {
        return new CoreString();
    }

    //AMD exports
    if (typeof define === "function" && define.amd) {
        define(function () {
            return exports;
        });
        //CommandJS exports
    } else if (typeof module !== "undefined" && module.exports) {
        module.exports = exports;
        //browser
    } else {
        //获取全局变量， 在浏览器中就是Window
        var _global = (function () { return this || (0, eval)("this"); } ());
        _global.exports = exports;
    }


    //-----------------------------私有方法--------------------------------
    function _getStr(str) {
        return typeof str === "undefined" || str === null || str === "" ? "" : String(str);
    }

    function _isNumeric(obj) {
        var type = Object.prototype.toString.call(obj);
            return (type === "[object Number]" || type === "[object String]") && !isNaN(obj - parseFloat(obj));
    }

})();