/*----------------------------------------------------------------------
子コンポーネント
----------------------------------------------------------------------*/
Vue.component('text-link', {
  props: ['text', 'url'],
  template: '<p><a v-bind:href="url" class="c-txtLink" target="_blank">{{ text }}</a></p>'
});
Vue.component('wish-list', {
  template: '<li>{{name}} : {{filter}}円（税込）</li>',
  props: ['name', 'price', 'tax'],
  computed: {
    filter() {
      const total = Math.round(this.price + this.price * this.tax / 100);
      return total.toLocaleString();
    }

  }
});
Vue.component('obj-bundle', {
  template: '<p v-bind:style="style"></p>',
  props: ['style']
});
const childProduct = {
  template: `
  <li>
    ◎{{name}}:在庫{{stock}}
    <button v-if="stock" v-on:click="doSaleStock">買う</button>
    <span v-else>完売しました</span>
  </li>
  `,
  props: {
    'index': Number,
    'name': String,
    'stock': Number
  },
  methods: {
    doSaleStock() {
      this.$emit('child-click', this.index);
    }

  }
};
const product = {
  template: `
  <div class="productList_item">
    <a href="#" class="product">
      <figure class="product_img" v-bind:class="{'is-new': product.new}"><img v-bind:src="product.img" alt=""></figure>
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
  props: ['product'],
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
Vue.component('child-btn', {
  template: '<div><button v-on:click="handleClick">子側でクリック</button> {{msg}}</div>',
  props: {
    'msg': String
  },
  methods: {
    handleClick() {
      this.$emit('child-event');
    }

  }
});