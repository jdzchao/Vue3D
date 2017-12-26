import '../utils'

const uriReg = new RegExp('\\?.*#/');

class Http {
  constructor() {
    this.url = ''; // url 地址分析
    this.domain = '';
    this.params = {};
    this.state = '';
    this.callback = {};
    document.onreadystatechange = () => {
      this.state = document.readyState;
      if (this.state === 'complete') {
        this.init();
      }
    };
  }

  init() {
    this.url = window.document.location.href.toString();
    this.domain = this.url.split('?')[0];
    let urs = empty(this.url.match(uriReg)) ? '' : this.url.match(uriReg)[0].replace(/(^\?)|(#\/$)/g, "");
    let uri = empty(urs) ? [] : urs.split("&");
    for (let i in uri) {
      let j = uri[i].split("=");
      this.params[j[0]] = j[1];
    }
    this.callback();
  }

  complete(callback) {
    if (typeof callback === 'function') {
      this.callback = callback;
    } else {
      this.callback = new Function();
    }
  }

  urlBuilder(key, value) {
    let url = this.domain + "?";
    if (!empty(key)) {
      this.params[key] = value;
    }
    for (let i in this.params) {
      url = url + i + "=" + this.params[i] + "&";
    }
    url = url.substring(0, url.length - 1);
    history.replaceState(200, "", url);
  }
}

export default new Http;
