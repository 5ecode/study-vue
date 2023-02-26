/*----------------------------------------------------------------------
商品コンポーネント
----------------------------------------------------------------------*/
const product = {
  template: `
  <a href="#" class="product">
    <figure class="product_img" v-bind:class="{'is-new': product.new}"><img v-bind:src="path + product.img" alt=""></figure>
    <div class="product_detail">
      <p class="product_name">{{product.name}}</p>
      <div class="product_price price" v-bind:class="{'is-sale': product.sale}">
        <p class="price_original">{{addComma(priceAddTax)}}</p>
        <p v-show="product.sale" class="price_sale">{{addComma(doDiscount(priceAddTax,product.sale))}}</p>
        <span v-show="product.sale" class="price_off">{{product.sale}}%<span>OFF</span></span>
      </div>
    </div>
  </a>
  `,
  props: ['product', 'path'],
  data: function () {
    return {
      tax: 10
    };
  },
  methods: {
    addComma: function (total) {
      return '¥' + total.toLocaleString();
    },
    doDiscount: function (price, sale) {
      return Math.round(price - price * sale / 100);
    }
  },
  computed: {
    priceAddTax: function () {
      let price = this.product.price;
      return Math.round(price + price * this.tax / 100);
    }
  }
};