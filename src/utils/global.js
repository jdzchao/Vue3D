// 小数转换百分数
Number.prototype.toPrecent = function () {
    let str = Number(this * 100).toFixed(2);
    str += "%";
    return str;
};

// 小数转换百分数
Number.prototype.toSystem62 = function () {
    const rule = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; //62进制规则
    let n = this;
    let str = '';
    s62(n);
    return str;

    function s62(num) {
        if (num > rule.length) {
            let m = num % rule.length;
            str = rule[m] + str;
            s62(Math.floor(num / rule.length));
        } else {
            str = rule[num] + str;
        }
    }
};

// 百分数转换小数
String.prototype.toPoint = function () {
    let str = this.replace("%", "");
    str = str / 100;
    return str;
};

// 小数转换百分数
String.prototype.toPrecent = function () {
    let str = Number(this * 100).toFixed(2);
    str += "%";
    return str;
};

// 字符串转换为Bool类型
String.prototype.toBoolean = function () {
    return (/^true$/i).test(this) || Number(this) > 0;
};

// 将下划线式字符串转化为驼峰式 PS: 去掉下划线后的首字母转为大写
String.prototype.toCamelCase = function () {
    const re = /_(\w)/g;
    return this.replace(re, function ($0, $1) {
        return $1.toUpperCase();
    });
};

// 将驼峰式字符串转换为下划线式 PS：大写字母转化为小写并在前面加上下划线
String.prototype.toUnderlineCase = function () {
    return this.replace(/([A-Z])/g, "_$1").toLowerCase();
};

// 去除字符串两边的字符，type=left or right
String.prototype.trim = function (char, type) {
    if (char) {
        if (type === 'left') {
            return this.replace(new RegExp('^\\' + char + '+', 'g'), '');
        } else if (type === 'right') {
            return this.replace(new RegExp('\\' + char + '+$', 'g'), '');
        }
        return this.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
    }
    return this.replace(/^\s+|\s+$/g, '');
};
