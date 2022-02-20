<template>
  <div class="">
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="fixed inset-0 flex z-40 lg:hidden" @close="open = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
          <div class="relative max-w-xs w-full bg-indigo-100 shadow-xl pb-12 flex flex-col overflow-y-auto">
            <div class="px-4 pt-5 pb-2 flex">
              <button type="button" class="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400" @click="open = false">
                <span class="sr-only">Close menu</span>
                <XIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div class="py-6 px-4 space-y-6">
              <div v-for="category in categories" :key="category.id" class="flow-root">
                <a :href="category.slug" class="-m-2 p-2 block font-medium text-gray-900 flex items-center">
                  <img :src="category.icon_image_url" class="h-8 w-auto " />
                  <span class="mx-2 capitalize">{{ category.name }}</span></a>
              </div>
            </div>

            <div class="border-t border-gray-200 py-6 px-4 space-y-6">
              <div class="flow-root">
                <a href="#" class="-m-2 p-2 block font-medium text-gray-900">Sign in</a>
              </div>
              <div class="flow-root">
                <a href="#" class="-m-2 p-2 block font-medium text-gray-900">Create account</a>
              </div>
            </div>
          </div>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>

    <header class="fixed w-full top-0 right-0 left-0 z-30 bg-indigo-100">
      <p class="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
        Get free delivery on orders over $100
      </p>

      <nav aria-label="Top" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="border-b border-gray-200">
          <div class="h-16 flex items-center">
            <button type="button" class="bg-white p-2 rounded-md text-gray-400 lg:hidden" @click="open = true">
              <span class="sr-only">Open menu</span>
              <MenuIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Logo -->
            <div class="ml-4 flex lg:ml-0">
              <router-link to="/" class="flex items-center">
                <img class="h-8 w-auto" src="https://img.icons8.com/external-tulpahn-outline-color-tulpahn/64/000000/external-tasty-heart-feeling-tulpahn-outline-color-tulpahn.png" alt="e-yummy-ke logo" />
                <h4 class="mx-2 text-xl text-indigo-600">YummyKE</h4>
              </router-link>
            </div>

            <!-- Flyout menus -->
            <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
              <div class="h-full flex space-x-8">
                <a v-for="page in navigation.pages" :key="page.name" :href="page.href" class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">{{ page.name }}</a>
              </div>
            </PopoverGroup>

            <div class="ml-auto flex items-center">
              <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <a href="#" class="text-sm font-medium text-gray-700 hover:text-gray-800">Sign in</a>
                <span class="h-6 w-px bg-gray-200" aria-hidden="true" />
                <a href="#" class="text-sm font-medium text-gray-700 hover:text-gray-800">Create account</a>
              </div>

              <div class="hidden lg:ml-8 lg:flex">
                <a href="#" class="text-gray-700 hover:text-gray-800 flex items-center">
                  <img src="https://tailwindui.com/img/flags/flag-canada.svg" alt="" class="w-5 h-auto block flex-shrink-0" />
                  <span class="ml-3 block text-sm font-medium"> CAD </span>
                  <span class="sr-only">, change currency</span>
                </a>
              </div>

              <!-- Cart -->
              <div class="ml-4 mr-3 flow-root lg:ml-6">
                <button class="relative group -m-2 p-2 flex items-center" @click="openCart">
                  <FontAwesomeIcon :icon="['fas', 'shopping-cart']" class="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  <span v-if="totalNoOfCart > 0" class="absolute top-0 -right-2 flex items-center justify-center ml-2 max-w-sm h-4  font-medium bg-green-600 px-2 py-1 rounded shadow-xl text-white group-hover:text-gray-800"> {{ totalNoOfCart }}</span>
                  <span class="sr-only">items in cart, view bag</span>
                </button>
                <Cart />
              </div>
              <div class="ml-4 flow-root lg:ml-6">
                <Menu as="div" class="relative inline-block text-left">
                  <div>
                    <MenuButton class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                      <button class="group -m-2 p-2 flex items-center">
                  <FontAwesomeIcon :icon="['fas', 'user']" class="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                </button>
                    </MenuButton>
                  </div>

                  <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div class="py-1">
                        <MenuItem v-slot="{ active }">
                          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Account settings</a>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Support</a>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">License</a>
                        </MenuItem>
                        <form method="POST" action="#">
                          <MenuItem v-slot="{ active }">
                            <button type="submit" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full text-left px-4 py-2 text-sm']">Sign out</button>
                          </MenuItem>
                        </form>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import {
  ref,
  onMounted,
  computed
} from 'vue'
import {
  useStore
} from 'vuex'
import axios from 'axios'
import {
  Dialog,
  DialogOverlay,
  PopoverGroup,
  TransitionChild,
  TransitionRoot,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/vue'
import {
  MenuIcon,
  XIcon
} from '@heroicons/vue/outline'
import Cart from '@/components/Cart.vue'

const navigation = {
  categories: [{
    id: 'women',
    name: 'Women',
    featured: [{
      name: 'New Arrivals',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
      imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.'
    },
    {
      name: 'Basic Tees',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
      imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.'
    }],
    sections: [{
      id: 'clothing',
      name: 'Clothing',
      items: [{
        name: 'Tops',
        href: '#'
      },
      {
        name: 'Dresses',
        href: '#'
      },
      {
        name: 'Pants',
        href: '#'
      },
      {
        name: 'Denim',
        href: '#'
      },
      {
        name: 'Sweaters',
        href: '#'
      },
      {
        name: 'T-Shirts',
        href: '#'
      },
      {
        name: 'Jackets',
        href: '#'
      },
      {
        name: 'Activewear',
        href: '#'
      },
      {
        name: 'Browse All',
        href: '#'
      }]
    },
    {
      id: 'accessories',
      name: 'Accessories',
      items: [{
        name: 'Watches',
        href: '#'
      },
      {
        name: 'Wallets',
        href: '#'
      },
      {
        name: 'Bags',
        href: '#'
      },
      {
        name: 'Sunglasses',
        href: '#'
      },
      {
        name: 'Hats',
        href: '#'
      },
      {
        name: 'Belts',
        href: '#'
      }]
    },
    {
      id: 'brands',
      name: 'Brands',
      items: [{
        name: 'Full Nelson',
        href: '#'
      },
      {
        name: 'My Way',
        href: '#'
      },
      {
        name: 'Re-Arranged',
        href: '#'
      },
      {
        name: 'Counterfeit',
        href: '#'
      },
      {
        name: 'Significant Other',
        href: '#'
      }]
    }]
  },
  {
    id: 'men',
    name: 'Men',
    featured: [{
      name: 'New Arrivals',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
      imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.'
    },
    {
      name: 'Artwork Tees',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
      imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.'
    }],
    sections: [{
      id: 'clothing',
      name: 'Clothing',
      items: [{
        name: 'Tops',
        href: '#'
      },
      {
        name: 'Pants',
        href: '#'
      },
      {
        name: 'Sweaters',
        href: '#'
      },
      {
        name: 'T-Shirts',
        href: '#'
      },
      {
        name: 'Jackets',
        href: '#'
      },
      {
        name: 'Activewear',
        href: '#'
      },
      {
        name: 'Browse All',
        href: '#'
      }]
    },
    {
      id: 'accessories',
      name: 'Accessories',
      items: [{
        name: 'Watches',
        href: '#'
      },
      {
        name: 'Wallets',
        href: '#'
      },
      {
        name: 'Bags',
        href: '#'
      },
      {
        name: 'Sunglasses',
        href: '#'
      },
      {
        name: 'Hats',
        href: '#'
      },
      {
        name: 'Belts',
        href: '#'
      }]
    },
    {
      id: 'brands',
      name: 'Brands',
      items: [{
        name: 'Re-Arranged',
        href: '#'
      },
      {
        name: 'Counterfeit',
        href: '#'
      },
      {
        name: 'Full Nelson',
        href: '#'
      },
      {
        name: 'My Way',
        href: '#'
      }]
    }]
  }],
  pages: [{
    name: 'Company',
    href: '#'
  },
  {
    name: 'Stores',
    href: '#'
  }]
}

export default {
  components: {
    Dialog,
    DialogOverlay,
    PopoverGroup,
    TransitionChild,
    TransitionRoot,
    MenuIcon,
    XIcon,
    Cart,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems
  },
  setup () {
    const open = ref(false)
    const store = useStore()
    const categories = ref([])
    onMounted(() => {
      axios.get(store.state.baseURL + 'category/')
        .then(resp => {
          categories.value = resp.data
        })
        .catch(err => {
          console.log(err.message)
        })
    })
    const openCart = () => {
      store.commit('OPEN_CART')
    }
    const totalNoOfCart = computed(() => {
      return store.getters.totalNoOfCart
    })
    return {
      navigation,
      open,
      categories,
      openCart,
      totalNoOfCart
    }
  }
}
</script>

  <style>
    .stylish-font {
      font-family: 'Shizuru', cursive;
    }
  </style>
