<template>

  <div class="home">
    <div class="products">
      <div class="product" v-for="(product, index) in this.products" :key="index" :class="{ inBag: this.isInBag(product) }">
        <div class="product-image" :style="{ backgroundImage: 'url(' + product.image + ')' }"></div>
        <h4>{{ product.title }}</h4>
        <p class="price">${{ product.price.toFixed(2) }}</p>
        <button v-if="!this.isInBag(product)" @click="this.addToBag(product);">Adicioanr ao carrinho</button>
        <button v-else class="remove" @click="this.removeFromBag(product.id);">Remover do carrinho</button>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HomePage',
  data() {
    return {
    }
  },

  // as computed a baixo utilizam o mapState importado acima, porem o requisito é o nome do metodo ser igual ao nome do store state do vuex no array do mapa
  computed: mapState([
    'products',
    'productsInBag',
  ]),

  methods: {

    addToBag(product) {
      product.quantity = 1; // adiciona um novo atributo/coluna ao objeto chamado quantidade de valor um
      this.$store.dispatch('addToBag', product); // chama o metodo loadProducts, pelo dispacho, em açao no store do vuex
    },

    isInBag(product) {
      return this.productsInBag.find(item => item.id === product.id); // verifica se o produto já existe no array storage state
    },

    removeFromBag(productId) {
      if (confirm('Deseja realmente remover o produto?')) {
        this.$store.dispatch('removeFromBag', productId); // chama o metodo removeFromBag do action do store pelo dispacho para remover o produto pelo id
      }
    },

  },
}
</script>

<style lang="scss">
.home {

  .products {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;


    .product {
      flex: 0 0 30%;
      box-sizing: border-box;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      padding: 16px;
      margin: 8px;
      height: 360px;

      @media only screen and (max-width: 769px) {
        flex: 0 0 40%;
      }

      @media only screen and (max-width: 640px) {
        flex: 0 0 90%;
      }

      &.inBag {
        border: 1px solid #007bff;
      }

      .product-image {
        margin: 20px auto;
        width: 160px;
        height: 140px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
      }

      h4 {
        margin: 22px auto;
        font-size: 12px;
        max-width: 60%;
        font-weight: normal;
      }

      p.price {
        font-size: 20px;
        font-weight: bold;
      }

      button {
        color: #fff;
        background-color: #007bff;
        border: 1px solid #007bff;
        border-radius: 100px;
        font-weight: 400;
        text-align: center;
        padding: 8px 16px;
        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }

        &.remove {
          background-color: transparent;
          border: none;
          color: black;
          text-decoration: underline;
        }
      }
    }
  }

}
</style>