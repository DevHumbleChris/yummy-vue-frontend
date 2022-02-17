<template>
  <div class="hello">
    <div class="carousel relative container mx-auto" style="max-width: 1600px">
      <div class="carousel-inner relative overflow-hidden w-full">
        <!--Slide 1-->

        <input
          class="carousel-open"
          type="radio"
          id="carousel-1"
          name="carousel"
          aria-hidden="true"
          hidden=""
          checked="checked"
        />

        <div class="carousel-item absolute opacity-0" style="height: 50vh">
          <div
            class="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right"
            style="
              background-image: url('http://127.0.0.1:8000/media/uploads/IMG_20211015_172933_021.jpg');
            "
          >
            <div class="container mx-auto">
              <div
                class="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide"
              >
                <p class="text-blue-900 text-2xl text-center my-4">
                  Stripy Zig Zag Jigsaw Pillow and Duvet Set
                </p>
              </div>
            </div>
          </div>
        </div>

        <label
          for="carousel-3"
          class="prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 left-0 my-auto"
          >‹</label
        >

        <label
          for="carousel-2"
          class="next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto"
          >›</label
        >

        <label
          for="carousel-1"
          class="next control-3 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto"
          >›</label
        >

        <!-- Add additional indicators for each slide-->

        <ol class="carousel-indicators">
          <li class="inline-block mr-3">
            <label
              for="carousel-1"
              class="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900"
              >•</label
            >
          </li>
        </ol>
      </div>
    </div>

    <section class="py-8">
      <div class="container mx-auto flex items-center flex-wrap pt-4 pb-3">
        <nav id="store" class="w-full z-30 top-0 px-6 py-1">
          <div
            class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-1"
          >
            <a
              class="uppercase tracking-wide no-underline hover:no-underline font-bold text-indigo-800 text-xl"
              href="#"
            >
              Store
            </a>

            <div class="flex items-center" id="store-nav-content">
              <button
                class="pl-3 text-indigo-800 text-xl inline-block no-underline hover:text-indigo-300" @click="openFilterSelection"
              >
                <FontAwesomeIcon :icon="['fas', 'filter']" />
              </button>

              <button
                class="pl-3 text-indigo-800 inline-block no-underline hover:text-indigo-400 text-xl"
              >
                <FontAwesomeIcon :icon="['fas', 'search']" />
              </button>
            </div>
          </div>
        </nav>
        <div v-if="filterSelection" class="m-auto w-96 my-2 bg-indigo-200 p-3 rounded-2xl shadow-xl">
          <div class="flex justify-between my-1">
            <h4 class="text-indigo-500 text-lg">Filter Selection</h4>
            <button @click="openFilterSelection">
              <FontAwesomeIcon :icon="['far', 'times-circle']" class="text-indigo-500 text-lg" />
            </button>
          </div>
          <div class="flex flex-wrap justify-center p-1">
            <div v-for="category in categories" :key="category.id" class="mx-3">
              <input v-model="checkedCategory" type="checkbox" :value="category.slug" :id="category.slug" @change="onChange(category.id)" hidden />
              <label :for="category.slug" class="mx-2">
                <img :src="category.icon_image_url" alt="category.name" :class="category.isChecked ? 'w-12 object-contain rounded-xl border-2 border-purple-900 p-1' : 'w-12 object-contain rounded-xl border-2 border-purple-50 p-1'"/>
                <h4 class="text-center text-sm">
                  {{ category.name }}
                </h4>
              </label>
            </div>
          </div>
          <button class="text-indigo-600 border-2 border-indigo-500 active:border-pink-600 font-bold uppercase text-sm px-6 py-3 rounded-3xl shadow-2xl hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" @click="clearSelection">clear</button>
          <button class="text-indigo-600 border-2 border-indigo-500 active:border-pink-600 font-bold uppercase text-sm px-6 py-3 rounded-3xl shadow-2xl hover:shadow-lg outline-none focus:outline-none ml-3 mr-1 mb-1 ease-linear transition-all duration-150" @click="openFilterSelection">close</button>
        </div>

        <div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
          <div v-for="product in products" :key="product.id" class="bg-white shadow-xl rounded-xl hover:grow hover:shadow-lg my-5">
            <img
              class="rounded-t-xl"
              :src="product.img_path"
              :alt="product.name"
            />
            <div class="px-3 pt-3 flex items-center justify-between">
              <p class="text-lg text-blue-900">{{ product.name }}</p>

              <svg
                class="h-6 w-6 fill-current text-gray-500 hover:text-black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z"
                />
              </svg>
            </div>
            <p class="px-3 pb-2 text-indigo-800">{{ product.price }}</p>
          </div>
        </div>
      </div>
    </section>

    <footer class="container mx-auto bg-white py-8 border-t border-gray-400">
      <div class="container flex px-3 py-8">
        <div class="w-full mx-auto flex flex-wrap">
          <div class="flex w-full lg:w-1/2">
            <div class="px-3 md:px-0">
              <h3 class="font-bold text-gray-900">About</h3>

              <p class="py-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas vel mi ut felis tempus commodo nec id erat. Suspendisse
                consectetur dapibus velit ut lacinia.
              </p>
            </div>
          </div>

          <div class="flex w-full lg:w-1/2 lg:justify-end lg:text-right">
            <div class="px-3 md:px-0">
              <h3 class="font-bold text-gray-900">Social</h3>

              <ul class="list-reset items-center pt-3">
                <li>
                  <a
                    class="inline-block no-underline hover:text-black hover:underline py-1"
                    href="#"
                    >Add social links</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, onBeforeMount } from 'vue'
import axios from 'axios'
export default {
  name: 'HelloWorld',
  setup () {
    const store = useStore()
    const categories = ref([])
    const products = computed(() => {
      return store.state.products
    })
    onBeforeMount(() => {
      axios.get(store.state.baseURL + 'category/')
        .then(resp => {
          categories.value = resp.data.map(response => {
            return { ...response, isChecked: false }
          })
        })
        .catch(err => {
          console.log(err.message)
        })
    })
    const randomNo = Math.floor(Math.random() * products.value.length)
    console.log(randomNo)
    const checkedCategory = ref([])
    const onChange = (id) => {
      console.log(id)
      categories.value.map(category => {
        if (category.id === id) {
          category.isChecked = !category.isChecked
        }
      })
      store.commit('FILTER_PRODUCTS', checkedCategory.value)
    }
    const filterSelection = ref(false)
    const openFilterSelection = () => {
      filterSelection.value = !filterSelection.value
    }
    const clearSelection = () => {
      console.log(checkedCategory.value, 'before')
      setTimeout(() => {
        checkedCategory.value = []
        categories.value.forEach(category => {
          category.isChecked = false
        })
        store.commit('FILTER_PRODUCTS', checkedCategory.value)
      }, 1)
    }
    const latestProducts = computed(() => {
      return store.state.latestProducts
    })
    return {
      products,
      checkedCategory,
      categories,
      onChange,
      filterSelection,
      openFilterSelection,
      clearSelection,
      latestProducts
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.work-sans {
  font-family: "Work Sans", sans-serif;
}

#menu-toggle:checked + #menu {
  display: block;
}

.hover\:grow {
  transition: all 0.3s;

  transform: scale(1);
}

.hover\:grow:hover {
  transform: scale(1.02);
}

.carousel-open:checked + .carousel-item {
  position: static;

  opacity: 100;
}

.carousel-item {
  -webkit-transition: opacity 0.6s ease-out;

  transition: opacity 0.6s ease-out;
}

#carousel-1:checked ~ .control-1,
#carousel-2:checked ~ .control-2,
#carousel-3:checked ~ .control-3 {
  display: block;
}

.carousel-indicators {
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 2%;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 10;
}

#carousel-1:checked
  ~ .control-1
  ~ .carousel-indicators
  li:nth-child(1)
  .carousel-bullet,
#carousel-2:checked
  ~ .control-2
  ~ .carousel-indicators
  li:nth-child(2)
  .carousel-bullet,
#carousel-3:checked
  ~ .control-3
  ~ .carousel-indicators
  li:nth-child(3)
  .carousel-bullet {
  color: #000;

  /*Set to match the Tailwind colour you want the active one to be */
}
</style>
