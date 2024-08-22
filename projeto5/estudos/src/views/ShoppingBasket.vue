<template>
  <div class="basket">
    <div class="items">

      <template v-if="this.productsInBag.length">
        <div class="item" v-for="(product, index) in this.productsInBag" :key="index">
          <div class="remove" @click="this.removeFromBag(product.id);">Remover do carrinho</div>
          <div class="photo">
            <a target="_blank" :href="product.image">
              <img :src="product.image" alt="">
            </a>
          </div>
          <div class="description">{{ product.title }}</div>
          <div class="price">
            <span class="quantity-area">
              <button :disabled="product.quantity == 1"
                @click="product.quantity > 1 ? product.quantity-- : 1">-</button>
              <span class="quantity">{{ product.quantity }}</span>
              <button @click="product.quantity++">+</button>
            </span>
            <span class="amount">Unidade: ${{ product.price.toFixed(2) }}</span>
            <span class="amount">Total: ${{ this.productPrice(product) }}</span>
          </div>
        </div>
      </template>
      <h4 v-else style="color:red">Nenhum item adicionado ao carrinho</h4>

      <div class="grand-total"> Grand Total: ${{ totalPrice() }}</div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ShoppingBasket',

  // as computed a baixo utilizam o mapState importado acima, porem o requisito é o nome do metodo ser igual ao nome do store state do vuex no array do mapa
  computed: mapState([
    'products',
    'productsInBag',
  ]),

  methods: {

    removeFromBag(productId) {
      if (confirm('Deseja realmente remover o produto?')) {
        this.$store.dispatch('removeFromBag', productId); // chama o metodo removeFromBag do action do store pelo dispacho para remover o produto pelo id
      }
    },

    productPrice(product) {
      let price = (product.quantity * product.price);
      return price.toFixed(2);
    },

    totalPrice() {
      var total = this.productsInBag.reduce((accumulator, product) => {
        return accumulator + product.price * product.quantity;
      }, 0);
      return total.toFixed(2);
    },

  },

}
</script>

<style lang="scss">
.basket {
  padding: 60px 0;

  .items {
    max-width: 800px;
    margin: auto;

    .item {
      display: flex;
      justify-content: space-between;
      padding: 40px 0;
      border-bottom: 1px solid lightgrey;
      position: relative;

      .remove {
        position: absolute;
        top: 8px;
        right: 0;
        font-size: 11px;
        text-decoration: underline;
        cursor: pointer;
      }

      .quantity-area {
        margin: 8px auto;
        height: 14px;

        button {
          width: 16px;
          height: 16px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        .quantity {

          margin: 0 4px;
        }
      }

      .photo {
        img {
          max-width: 80px;
        }
      }

      .description {
        padding-left: 30px;
        box-sizing: border-box;
        max-width: 50%;

      }

      .price {
        .amount {
          font-size: 16px;
          margin-left: 8px;
          vertical-align: middle;

        }
      }
    }

    .grand-total {
      font-size: 24px;
      font-weight: bold;
      text-align: right;
      margin-top: 8px;
    }

  }

}
</style>