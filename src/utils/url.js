import './index.js'

const URL = function () {
  let url = window.document.location.href.toString();
  let urls = url.split("?");
  let uri = empty(urls[1]) ? [] : urls[1].split("&");

  this.url = urls[0];

  // 获取uri参数
  this.Get = function (key) {
    let gets = {};
    for (let i in uri) {
      let j = uri[i].split("=");
      gets[j[0]] = j[1];
    }
    return typeof (key) === "string" ? gets[key] : gets;
  };

  // 构造uri参数
  this.UriBuilder = function (key, value) {
    let gets = this.Get();
    if (empty(value)) {
      value = "";
    }
    gets[key] = value;
    url = urls[0] + "?";
    for (let i in gets) {
      url = url + i + "=" + gets[i] + "&";
    }
    url = url.substring(0, url.length - 1);
    history.replaceState(200, "", url);
  }
};

export default new URL();
