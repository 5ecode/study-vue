/*----------------------------------------------------------------------
子コンポーネント
----------------------------------------------------------------------*/
Vue.component('text-link', {
  template: '<p><a v-bind:href="url" class="c-txtLink" target="_blank">{{ text }}</a></p>',
  props: ['text', 'url']
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
  template: '<p v-bind:style="styling"></p>',
  props: ['styling']
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
Vue.component('custom-input-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  template: `
    <label><input type="checkbox" v-bind:checked="checked" v-on:change="$emit('change', $event.target.checked)">{{checked}}</label>
  `,
  props: {
    checked: Boolean
  }
});
Vue.component('custom-input', {
  template: `<p>
    <input v-bind:value="value" v-on:input="$emit('child-input', $event.target.value)">
    子側：{{value}}
    </p>
  `,
  props: ['value']
}); // 双方向v-model

Vue.component('radio-tax-check', {
  model: {
    event: 'change'
  },
  template: `<label><input type="radio" v-bind:name="name" v-bind:value="data.val" v-on:change="$emit('change', $event.target.value)" v-bind:checked="value === data.val">{{data.theme}}</label>`,
  props: {
    data: Object,
    name: String,
    value: Number
  }
});
Vue.component('checkbox-fruits-list', {
  model: {
    prop: 'order',
    event: 'change'
  },
  template: `
    <ul>
      <li v-for="item in filtersort" v-bind:key="item.id">
        <label><input type="checkbox" name="name" v-bind:value="item.price" v-on:change="orders">{{item.name}} : {{item.price}}円</label>
      </li>
    </ul>
  `,
  props: {
    filtersort: Array,
    name: String,
    order: Array
  },
  data: function () {
    return {
      myOrder: [0]
    };
  },
  methods: {
    orders(e) {
      const value = parseInt(e.target.value);

      if (e.target.checked) {
        this.myOrder.push(value);
      } else {
        const index = this.myOrder.indexOf(value);
        this.myOrder.splice(index, 1);
      }

      this.$emit('change', this.myOrder);
    }

  }
});
Vue.component('new-item-input', {
  template: `<label>{{theme}}：<input type="text" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" v-bind:size="size"></label>`,
  props: {
    value: String,
    theme: String,
    size: Number
  }
});
Vue.component('add-item-component', {
  template: `
    <dl>
      <dt>商品追加</dt>
      <dd>
        <div class="u-mb1">
          <new-item-input v-model="newItemName" v-bind:theme="'品名'"></new-item-input>
          <new-item-input v-model="newItemPrice" v-bind:theme="'本体価格'" v-bind:size="10"></new-item-input> 円<span v-bind:style="styleColor" v-if="isError">{{errorMsg}}</span>
        </div>
        <button v-on:click="$emit('add-item')">リストに追加する</button>
      </dd>
    </dl>
  `,
  props: {
    name: String,
    price: [Number, String]
  },

  data() {
    return {
      isError: false,
      errorMsg: '半角数字で入力してください',
      styleColor: 'color: #f00'
    };
  },

  computed: {
    newItemName: {
      get() {
        return this.name;
      },

      set(newVal) {
        return this.$emit('update:name', newVal);
      }

    },
    newItemPrice: {
      get() {
        return this.price;
      },

      set(newVal) {
        return this.$emit('update:price', newVal);
      }

    }
  },
  watch: {
    price(val) {
      if (val && isNaN(val)) {
        this.isError = true;
      } else {
        this.isError = false;
      }
    }

  }
});
Vue.component('sync-component', {
  template: `
    <div class="u-mb1">
      <label>メール<input type="email" :value="email" @input="$emit('update:email', $event.target.value)"></label>
      <label>パスワード<input type="password" :value="password" @input="$emit('update:password', $event.target.value)" size="10"></label>
      子側props【{{email}} : {{password}}】
    </div>
  `,
  props: {
    email: String,
    password: String
  }
});
Vue.component('slot-component', {
  template: `
    <div class="slotBox">
      <slot>何もないとき</slot>
    </div>
  `
});
Vue.component('name-slot-component', {
  template: `
    <div class="nameSlotBox">
      <p class="noname"><slot>名前なしスロット</slot></P>
      <slot name="slot2">名前ありスロットひとつめ</slot>
      <slot name="slot3">名前ありスロットふたつめ</slot>
      <slot name="slot4"></slot>
      <p>ここは子側のテンプレートに元々記述されているところ。「v-slot:スロット名」は「#スロット名」と省略することも可能。</p>
    </div>
  `
});
Vue.component('scoped-slot-component', {
  template: `
    <div class="nameSlotBox">
      <slot v-bind:childData="childData">{{ childData.childItem }}</slot>
      <slot name="scoped-slot" v-bind:childData="childData"></slot>
      <slot name="scoped-slot2"></slot>
    </div>
  `,

  data() {
    return {
      childData: {
        childItem: '子の持つデータ',
        childItem2: '子の持つデータ2',
        childItem3: '子の持つデータ3'
      }
    };
  }

});