export default {
  totalNoOfCart (state) {
    if (state.cart.length <= 0) {
      return 0
    }
    return state.cart.length
  },
  SUB_TOTAL (state) {
    let subtotal = 0
    console.log(state.cart)
    for (let x = 0; x < state.cart.length; x++) {
      subtotal = subtotal + state.cart[x].totalPrice
    }
    return subtotal
  }
}
