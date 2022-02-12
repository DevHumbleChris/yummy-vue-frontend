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
  }
}
