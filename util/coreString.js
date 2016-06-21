/**
 * 字符串相关操作
 */
; (function (CoreString) {

    "use strict";
    /**
     * 判断传入的字符串是否为Null或者为空字符串。
     */
    CoreString.isNullOrEmpty = function (str) {
        return typeof str === "undefined" || str === null || str === "";
    };

    /**
     * 判断传入的字符串是否为Null或者为空字符串或者全是空格。
     */
    CoreString.isNullOrWriteSpace = function (str) {
        return this.isNullOrEmpty(str) || this.trim(String(str)) === "";
    };

    /**
     * 除去字符中的首尾空格
     */
    CoreString.trim = function (str) {
        return str === null ? "" : (str + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    };

    /**
     * 用新字符串替换与给定字符串匹配的所有子串；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值
     */
    CoreString.replaceAll = function (str, substr, replacement) {
        if (!str || substr == replacement) {
            return str;
        }
        str = _getStr(str);
        var length = str.length; i = 0;
        while (str.indexOf(substr) > -1 && i++ < length) {
            str = str.replace(substr, replacement);
        }
        return str;
    };
    /**
     * 判断当前字符串对象是否包含指定的字符串内容。
     */
    CoreString.contains = function (str, val) {
        str = _getStr(str);
        return String(str).indexOf(val) > -1;
    };
    /**
     * 字符串反转；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值
     */
    CoreString.reverse = function (str) {
        str = _getStr(str);
        var arr = [];
        for (var i = str.length - 1; i >= 0; i--) {
            arr.push(str[i]);
        }
        return arr.join("");
    };
    /**
     * 去除字符串左边的空格；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值。
     */
    CoreString.ltrim = function (str) {
        str = _getStr(str);
        return str.replace(/(^\s*)/g, "");
    };
    /**
     * 去除字符串右边的空格；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值。
     */
    CoreString.rtirm = function (str) {
        str = _getStr(str);
        return str.replace(/(\s*$)/g, "");
    };
    /**
     * 判断当前 String 对象是否以指定的字符串开头。
     */
    CoreString.startsWith = function (str, val) {
        str = _getStr(str);
        return str.substr(0, val.length) == val;
    };
    /**
     * 判断当前 String 对象是否以指定的字符串结尾。
     */
    CoreString.endsWith = function (str, val) {
        str = _getStr(str);
        return str.substr(str.length - val.length) == val;
    };
    /**
     * 截取当前字符串左边的指定长度内容。
     */
    CoreString.left = function (str, len) {
        str = _getStr(str);
        if (!_isNumeric(len)) {
            len = parseInt(len, 10);
        }
        if (len < 0 || len > str.length) {
            len = str.length;
        }

        return str.substr(0, len);
    };
    /**
     * 截取当前字符串右边的指定长度内容。
     */
    CoreString.right = function (str, len) {
        str = _getStr(str);
        if (!_isNumeric(len)) {
            len = parseInt(len, 10);
        }
        if (len < 0 || len > str.length) {
            len = str.length;
        }
        return str.substring(str.length - len, str.length);
    };
    /**
     * 判断当前 String 对象是否是正确的长日期格式
     */
    CoreString.isLongDate = function (str) {
        str = _getStr(str);
        var r = str.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
        if (r == null) {
            return false;
        }
        var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
        return (d.getFullYear() == r[1] && d.getMonth() + 1 == r[3] && d.getDate() == r[4]
            && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
    };

    /**
     * 判断当前 String 对象是否是正确的短日期格式。
     */
    CoreString.isShortDate = function (str) {
        str = _getStr(str);
        var r = str.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1;4})(-|\/)(\d{1;2})\2(\d{1;2}) (\d{1;2}):(\d{1;2}):(\d{1;2})$/);
        if (r == null) {
            return false;
        }
        var d = new Date(r[1], r[3] - 1, r[4]);
        return (d.getFullYear() === r[1] && d.getMonth() + 1 === r[3] && d.getDate() === r[4]);
    };
    /**
     * 判断当前 String 对象是否是正确的日期格式
     */
    CoreString.isDate = function (str) {
        return this.isLongDate(str) || this.isShortDate(str);
    };
    /**
     * 判断当前 String 对象是否是正确的电话号码格式(中国)
     */
    CoreString.isTel = function (str) {
        str = _getStr(str);
        return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(str);
    };

    /**
     * 判断当前 String 对象是否是正确的电话号码或者手机号码格式(中国)
     */
    CoreString.isMobile = function (str) {
        str = _getStr(str);
        return /^(13|14|15|17|18)\d{9}$/i.test(str);
    };

    /**
     * 判断当前 String 对象是否是正确的电话号码或者手机号码格式(中国)
     */
    CoreString.isTelOrMobile = function (str) {
        return this.isTel(str) || this.isMobile(str);
    };

    /**
     * 判断当前 String 对象是否是正确的传真号码格式
     */
    CoreString.isFax = function (str) {
        str = _getStr(str);
        return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(str);
    };

    /**
     * 判断当前 String 对象是否是正确的 电子邮箱地址(Email) 格式
     */
    CoreString.isEmail = function (str) {
        str = _getStr(str);
        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|        [\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(str);
    };

    /**
     * 判断当前 String 对象是否是正确的 邮政编码(中国) 格式
     */
    CoreString.isZipCode = function (str) {
        str = _getStr(str);
        return /^[\d]{6}$/.test(str);
    };

    /**
     * 判断当前 String 对象是否是否存在汉字字符
     */
    CoreString.existChinese = function (str) {
        str = _getStr(str);
        //[\u4E00-\u9FA5]為漢字﹐[\uFE30-\uFFA0]為全角符號
        return !/^[\x00-\xff]*$/.test(str);
    };

    /**
     *  验证中文
     */
    CoreString.isChinese = function (str) {
        str = _getStr(str);
        return /^[\u0391-\uFFE5]+$/i.test(str);
    };

    /**
     *  验证英文
     */
    CoreString.isEnglish = function (str) {
        str = _getStr(str);
        return /^[A-Za-z]+$/i.test(str);
    };

    /**
     * 验证是否为整数格式
     */
    CoreString.isInteger = function (str) {
        str = _getStr(str);
        return /^[+]?[1-9]+\d*$/i.test(str);
    };

    /**
     * 判断当前 String 对象是否是正确的 数字 格式
     */
    CoreString.isNumeric = function (str, flag) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        //验证是否是数字
        if (isNaN(str)) { return false; }
        if (arguments.length == 0) { return false; }
        switch (flag) {
            case "":
                return true;
            case "+":        //正数
                return /(^\+?|^\d?)\d*\.?\d+$/.test(str);
            case "-":        //负数
                return /^-\d*\.?\d+$/.test(str);
            case "i":        //整数
                return /(^-?|^\+?|\d)\d+$/.test(str);
            case "+i":        //正整数
                return /(^\d+$)|(^\+?\d+$)/.test(str);
            case "-i":        //负整数
                return /^[-]\d+$/.test(str);
            case "f":        //浮点数
                return /(^-?|^\+?|^\d?)\d*\.\d+$/.test(str);
            case "+f":        //正浮点数
                return /(^\+?|^\d?)\d*\.\d+$/.test(str);
            case "-f":        //负浮点数
                return /^[-]\d*\.\d$/.test(str);
            default:        //缺省
                return true;
        }
    };

    /**
     * 转换成全角
     */
    CoreString.toCase = function (str) {
        str = _getStr(str);
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 255) { tmp += String.fromCharCode(str.charCodeAt(i) + 65248); }
            else { tmp += String.fromCharCode(str.charCodeAt(i)); }
        }
        return tmp;
    };

    /**
     * 对字符串进行Html编码
     */
    CoreString.toHtmlEncode = function (str) {
        str = _getStr(str);
        var temp = str;
        temp = temp.replace(/&/g, "&amp;");
        temp = temp.replace(/</g, "&lt;");
        temp = temp.replace(/>/g, "&gt;");
        temp = temp.replace(/\'/g, "&apos;");
        temp = temp.replace(/\"/g, "&quot;");
        temp = temp.replace(/\n/g, "<br />");
        temp = temp.replace(/\ /g, "&nbsp;");
        temp = temp.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
        return temp;
    };

    /**
     * 转换成日期
     */
    CoreString.toDate = function (str) {
        str = _getStr(str);
        try { return new Date(str.replace(/\//g, "-")); }
        catch (e) { return null; }
    };

    /**
     * 将字符串对象转换成 布尔(boolean) 值
     */
    CoreString.toBoolean = function (str) {
        if (typeof str === "boolean") {
            return str;
        }
        str = _getStr(str).toLowerCase();
        str = coreString.trim(str);
        return str == "true" || str == "yes" || str == "y" || str == "t" || str == "1";
    };

    /**
     * 将字符串对象转换成 整数(int) 值
     */
    CoreString.toInteger = function (str) {
        return parseInt(str);
    };

    /**
     * 将字符串对象转换成 浮点数(float) 值
     */
    CoreString.toFloat = function (str) {
        return parseFloat(str);
    };

    //-----------------------------私有方法--------------------------------
    function _getStr(str) {
        return typeof str === "undefined" || str === null || str === "" ? "" : String(str);
    }

    function _isNumeric(obj) {
        var type = Object.prototype.toString.call(obj);
        return (type === "[object Number]" || type === "[object String]") && !isNaN(obj - parseFloat(obj));
    }
})(exports);