import Axios from 'axios'
import Base64 from 'js-base64'
import sha256 from 'crypto-js/sha256'
import md5 from 'crypto-js/md5'

const base64 = Base64.Base64;


let http = {};

const header = {
  // APPID: "H5Phone",
  // code: window.tokenTrack.code || "",
  // type: md5(window.navigator.userAgent).toString(),
  // cookieEnabled: window.navigator.cookieEnabled,
  // client: window.tokenTrack.client,
};

http.header = base64.encodeURI(JSON.stringify(header));
http.payload = "";//window.tokenTrack.payload;
http.token = http.header;

if (http.payload !== null && http.payload !== "") {
  http.token += '.' + http.payload;
  http.token = http.token + "." + sha256(http.header + '.' + http.payload);
}

http.http = Axios.create({
  baseURL: 'https://wode.cifuwu.com',
  timeout: 1000,
  //headers: {'token': http.token},
});

http.Awake = function (callback) {
  if (typeof callback === "function") {
    callback();
  }
};

http.Token = function (payload) {
  const origin = http.header + "." + payload;
  http.token = origin + "." + sha256(origin);
  http.http.defaults.headers.token = http.token;
};

http.http.all = Axios.all;
http.http.spread = Axios.spread;

export default http;
