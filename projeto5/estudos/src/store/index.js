import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    products: [],
    productsInBag: [],
  },

  // as mutacoes chamadas atraves de metodos commit sao de forma sincrona tem uma ordenacao de sequencia onde um metodo espera pelo outro
  mutations: {
    loadProducts(state, products) {
      state.products = products;
    },
    addToBag(state, product) {
      state.productsInBag.push(product);
    },
    removeFromBag(state, productId) {
      state.productsInBag = state.productsInBag.filter(product => product.id !== productId); // Filtra os produtos, removendo o que tem o id correspondente
    },

  },

  // as ações chamadas atraves do metodo de dispacho sao de forma assincrona nao segue uma sequencia entre os metodoss chamados
  actions: {
    loadProducts({ commit }) {
      axios.get('https://fakestoreapi.com/products').then(response => {
        commit('loadProducts', response.data);
      })
    },
    addToBag({ commit }, product) {
      commit('addToBag', product);
    },
    removeFromBag({ commit }, productId) {
      commit('removeFromBag', productId);
    },
  },
  modules: {

  }
})
