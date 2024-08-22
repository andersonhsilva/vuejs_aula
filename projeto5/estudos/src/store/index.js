import { createStore } from 'vuex'
import axios from 'axios'

// Função auxiliar para salvar no localStorage
function saveProductsLocalStorage(productsInBag) {
  localStorage.setItem('productsInBag', JSON.stringify(productsInBag));
}

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

    loadBag(state, products) {
      state.productsInBag = products;
    },

    addToBag(state, product) {
      state.productsInBag.push(product); // adiciona o produto ao storage state      
      saveProductsLocalStorage(state.productsInBag);
    },

    removeFromBag(state, productId) {
      state.productsInBag = state.productsInBag.filter(product => product.id !== productId); // Filtra os produtos, removendo o que tem o id correspondente
      saveProductsLocalStorage(state.productsInBag);
    },

  },

  // as ações chamadas atraves do metodo de dispacho sao de forma assincrona nao segue uma sequencia entre os metodoss chamados
  actions: {

    loadProducts({ commit }) {
      axios.get('https://fakestoreapi.com/products').then(response => {
        commit('loadProducts', response.data);
      })
    },

    loadBag({ commit }) {
      if (localStorage.getItem('productsInBag')) commit('loadBag', JSON.parse(localStorage.getItem('productsInBag')));
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
