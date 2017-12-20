/**
 * *******************************
 * JavaScript 常用方法扩展
 * *******************************
 */
// 检测数据非空
window.empty = function (obj) {
  return typeof (obj) === "undefined" || obj === "" || obj === null;
};
window.setTitle = function (t) {
  document.title = t;
  let i = document.createElement('iframe');
  i.style.display = 'none';
  i.onload = function () {
    setTimeout(function () {
      i.remove();
    }, 9)
  };
  document.body.appendChild(i);
};
// 百分数转换小数
String.prototype.toPoint = function () {
  let str = this.replace("%", "");
  str = str / 100;
  return str;
};
// 小数转换百分数
Number.prototype.toPrecent = function () {
  let str = Number(this * 100).toFixed(2);
  str += "%";
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
  return (/^true$/i).test(this);
};

