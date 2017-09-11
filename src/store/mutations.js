export default {
  windowResize(state) {
    state.width = document.body.clientWidth;
    state.height = document.body.clientHeight;
    state.rem = document.body.clientHeight * state.ratio;
    document.documentElement.style.fontSize = state.rem + "px";
  }
}
