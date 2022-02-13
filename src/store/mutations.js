import axios from 'axios'

export default {
  SET_LATEST_PRODUCTS (state) {
    axios.get(state.baseURL + 'all-products/')
      .then(resp => {
        state.all_products = resp.data
      })
      .catch(err => {
        console.log(err.message)
      })
  },
  GET_CATEGORIES (state) {
    axios.get(state.baseURL + 'category/')
      .then(resp => {
        state.catgories = resp.data
      })
      .catch(err => {
        console.log(err.message)
      })
  }
}
