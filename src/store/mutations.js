import axios from 'axios'

export default {
  GET_ALL_PRODUCTS (state) {
    axios.get(state.baseURL + 'all-products/')
      .then(resp => {
        state.products = resp.data
      })
      .catch(err => {
        console.log(err.message)
      })
  },
  GET_CATEGORIES (state) {
    axios.get(state.baseURL + 'category/')
      .then(resp => {
        state.categories = resp.data
      })
      .catch(err => {
        console.log(err.message)
      })
  },
  FILTER_PRODUCTS (state, payload) {
    if (payload.length <= 0) {
      axios.get(state.baseURL + 'all-products/')
        .then(resp => {
          state.products = resp.data
        })
    } else {
      state.products = []
      payload.map(category => {
        axios.get(state.baseURL + `category/${category}/products/`)
          .then(resp => {
            resp.data.map(prod => {
              state.products.push(prod)
            })
          }).catch(err => {
            alert(err.message)
          })
      })
    }
  },
  GET_LATEST_PRODUCTS (state) {
    axios.get(state.baseURL + 'latest-products/')
      .then(resp => {
        state.latestProducts = resp.data
      })
      .catch(err => {
        console.log(err.message)
      })
  },
  OPEN_CART (state) {
    state.openCart = !state.openCart
  },
  ADD_TO_CART (state, payload) {
    const product = { ...payload, quantity: 1 }
    state.cart.push(product)
  },
  INCREMENT_QUANTITY (state, payload) {
    state.cart.map(product => {
      if (product.id === payload) {
        product.quantity += 1
      }
    })
  },
  DECREMENT_QUANTITY (state, payload) {
    state.cart.map(product => {
      if (product.id === payload) {
        product.quantity -= 1
      }
    })
  }
}
