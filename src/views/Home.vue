<template>
  <div class="home">
    <HelloWorld />
    <div v-for="category in responseData" :key="category.id">
      {{ category.name }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data () {
    return {
      responseData: '',
      love: 'failed'
    }
  },
  components: {
    HelloWorld
  },
  mounted () {
    axios.get('http://127.0.0.1:8000/api/v1/category/')
      .then(res => {
        this.responseData = res.data
      })
      .catch(err => {
        console.log(err.message)
      })
  }
}
</script>
