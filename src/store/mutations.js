import axios from 'axios'

export default {
  SET_LATEST_PRODUCTS (state) {
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
  SET_DEFAULT_PRODUCTS (state, payload) {
    console.log(payload)
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
  }
}
