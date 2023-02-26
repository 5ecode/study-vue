/*----------------------------------------------------------------------
子コンポーネント
----------------------------------------------------------------------*/
const product = {
  template: `
  <div class="productList_item">
    <a href="#" class="product">
      <figure class="product_img" v-bind:class="{'is-new': product.new}"><img v-bind:src="imgPath + product.img" alt=""></figure>
      <div class="product_detail">
        <p class="product_name">{{product.name}}</p>
        <div class="product_price price" v-bind:class="{'is-sale': product.sale}">
          <p class="price_typical">{{priceAddTax | addComma}}</p>
          <p v-show="product.sale" class="price_sale">{{priceAddTax | doDiscount(product.sale) | addComma}}</p>
          <span v-show="product.sale" class="price_off">{{product.sale}}%<span>OFF</span></span>
        </div>
      </div>
    </a>
  </div>
  `,
  props: {
    'product': Object,
    'imgPath': String
  },
  data: function () {
    return {
      tax: 10
    };
  },
  filters: {
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