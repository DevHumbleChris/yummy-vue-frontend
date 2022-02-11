<template>
  <div class="home">
    <HelloWorld />
    <div>{{ responseData }}</div>
  </div>
</template>

<script>
import axios from 'axios'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data () {
    return {
      responseData: ''
    }
  },
  components: {
    HelloWorld
  },
  mounted () {
    const response = axios.get('http://127.0.0.1:800/api/v1/all-products/')
    this.responseData = response.data
  }
}
</script>
