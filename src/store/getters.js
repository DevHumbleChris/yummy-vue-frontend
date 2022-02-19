export default {
  totalNoOfCart (state) {
    if (state.cart.length <= 0) {
      return 0
    }
    return state.cart.length
  }
}
