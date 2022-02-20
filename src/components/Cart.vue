<template>
  <TransitionRoot as="template" :show="openCart">
    <Dialog as="div" class="fixed inset-0 overflow-hidden z-40" @close="setOpenCart">
      <div class="absolute inset-0 overflow-hidden">
        <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
            <div class="w-screen max-w-md">
              <div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                <div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                  <div class="flex items-start justify-between">
                    <DialogTitle class="text-lg font-medium text-gray-900"> Shopping cart
                    <span v-if="totalNoOfCart > 0" class="mx-2 text-indigo-800">
                      ({{ totalNoOfCart }})
                    </span>
                    </DialogTitle>
                    <div class="ml-3 h-7 flex items-center">
                      <button type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500" @click="setOpenCart">
                        <span class="sr-only">Close panel</span>
                        <XIcon class="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div class="mt-8">
                    <div class="flow-root">
                      <ul role="list" class="-my-6 divide-y divide-gray-200">
                        <li v-for="product in cart" :key="product.id" class="py-6 flex">
                          <div class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                            <img :src="product.img_path" :alt="product.name" class="w-full h-full object-center object-cover" />
                          </div>

                          <div class="ml-4 flex-1 flex flex-col">
                            <div>
                              <div class="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href="#">
                                    {{ product.name }}
                                  </a>
                                </h3>
                                <p class="ml-4">
                                  $ {{ product.price }}
                                </p>
                              </div>
                            </div>
                            <div class="my-2">
                          <button class="text-indigo-600 border-2 border-indigo-500 active:border-pink-600 font-bold uppercase text-sm p-1 rounded-xl shadow-2xl hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" @click="decrementQuantity(product.id)" :disabled="product.quantity <= 1">
                      <FontAwesomeIcon :icon="['fas', 'minus' ]" />
                                </button>
                                Qty: <span class="mx-1">{{ product.quantity }}</span>
                                <button class="text-indigo-600 border-2 border-indigo-500 active:border-pink-600 font-bold uppercase text-sm p-1 rounded-xl shadow-2xl hover:shadow-lg outline-none focus:outline-none ml-1 mb-1 ease-linear transition-all duration-150" @click="incrementQuantity(product.id)">
                      <FontAwesomeIcon :icon="['fas', 'plus' ]" />
                                </button>
                            </div>
                            <div class="flex-1 flex items-center justify-between text-sm">
                              <p class="text-gray-500">Total Price:
                      <span class="mx-1 text-indigo-600">$ {{ product.totalPrice }}
                    </span>
                    </p>

                              <div class="flex">
                                <button type="button" class="text-red-600 border-2 border-red-500 active:border-red-900 font-bold text-sm p-1 rounded-xl shadow-2xl hover:shadow-lg outline-none focus:outline-none ml-1 mb-1 ease-linear transition-all duration-150">Remove</button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div class="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>$ {{ subTotal }}</p>
                  </div>
                  <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div class="mt-6">
                    <router-link to="/checkout" class="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700" @click="setOpenCart">
                      Checkout
                    </router-link>
                  </div>
                  <div class="mt-6 flex justify-center text-sm text-center text-gray-500">
                    <p>
                      or <button type="button" class="text-indigo-600 font-medium hover:text-indigo-500" @click="setOpenCart">Continue Shopping<span aria-hidden="true"> &rarr;</span></button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { computed } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/outline'
import { useStore } from 'vuex'

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XIcon
  },
  setup () {
    const store = useStore()
    const openCart = computed(() => {
      return store.state.openCart
    })
    const setOpenCart = () => {
      store.commit('OPEN_CART')
    }
    const cart = computed(() => {
      return store.state.cart
    })
    const totalNoOfCart = computed(() => {
      return store.getters.totalNoOfCart
    })
    const incrementQuantity = (id) => {
      store.commit('INCREMENT_QUANTITY', id)
    }
    const decrementQuantity = (id) => {
      store.commit('DECREMENT_QUANTITY', id)
    }
    const subTotal = computed(() => {
      return store.getters.SUB_TOTAL
    })

    return {
      openCart,
      setOpenCart,
      cart,
      totalNoOfCart,
      incrementQuantity,
      decrementQuantity,
      subTotal
    }
  }
}
</script>
