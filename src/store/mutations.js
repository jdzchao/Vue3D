export default {
  resizeViewport(state) {
    state.vWidth = document.body.clientWidth - 223;
    state.vHeight = document.body.clientHeight - 80;
  }
}
