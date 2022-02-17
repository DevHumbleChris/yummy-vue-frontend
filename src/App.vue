<template>
    <Navbar />
  <router-view/>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { useStore } from 'vuex'
import { onBeforeMount } from 'vue'

export default {
  components: {
    Navbar
  },
  setup () {
    const store = useStore()
    onBeforeMount(() => {
      store.commit('GET_ALL_PRODUCTS')
      store.commit('GET_LATEST_PRODUCTS')
    })
  }
}
</script>

<style>
</style>
