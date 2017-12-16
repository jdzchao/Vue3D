export default {
  setRatio(state) {
    state.width = document.body.clientWidth;
    state.height = document.body.clientHeight;
    state.ratio = state.width / state.height;
  },
  setDirection(state) {
    if (state.directionLocked) {
      state.orient = state.directionLocked;
    } else {
      if (state.ratio <= 1) {
        state.orient = 'vertical';
      } else {
        state.orient = 'horizontal';
      }
    }
  },
  setRem(state) {
    if (state.orient === 'vertical') {
      state.rem = state.height * state.rem_scale;
    } else if (state.orient === 'horizontal') {
      state.rem = state.width * state.rem_scale;
    }
    document.documentElement.style.fontSize = state.rem + "px";
  },
}
