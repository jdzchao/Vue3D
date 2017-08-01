/**
 * *******************************
 * JavaScript 扩展
 * *******************************
 */
String.prototype.toPoint = function () {
  let str = this.replace("%", "");
  str = str / 100;
  return str;
};

Number.prototype.toPrecent = function () {
  let str = Number(this * 100).toFixed(2);
  str += "%";
  return str;
};

String.prototype.toPrecent = function () {
  let str = Number(this * 100).toFixed(2);
  str += "%";
  return str;
};
