import http from './index'

const TOKEN_KEY = '_token';
const STORAGE_KEY = '_token';
const HEADER_KEY = '_token';
let token = {
  key: TOKEN_KEY,
  storage_key: STORAGE_KEY,
  header_key: HEADER_KEY,
  get() {
    if (sessionStorage.getItem(STORAGE_KEY)) {
      return sessionStorage.getItem(STORAGE_KEY);
    } else if (http.params[TOKEN_KEY]) {
      sessionStorage.setItem(STORAGE_KEY, http.params[TOKEN_KEY]);
      return http.params[TOKEN_KEY];
    }
  },
  set(token) {
    sessionStorage.setItem(STORAGE_KEY, token);
  }
};
export default token;
