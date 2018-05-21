export default {
  loading(state) {
    return state.progress.goal > 0 && state.progress.goal > state.progress.current;
  }
}
