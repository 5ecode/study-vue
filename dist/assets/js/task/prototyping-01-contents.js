/*----------------------------------------------------------------------
商品コンポーネント
----------------------------------------------------------------------*/
Vue.component('product-contents', {
  template: `
  <div class="contents">
    <head-option v-bind:selectList="selectList" v-on:child-change="narrowDown"></head-option>
    <div class="contents_list">
      <div class="productList">
        <product v-for="product in filterdList" :key="product.id" v-bind:product="product" v-bind:path="imgPath"></product>
      </div>
    </div>
    <div class="u-txtC" v-show="moreActive">
      <button class="c-btn" v-on:click="countMore">もっと見る</button>
    </div>
  </div>
  `,
  components: {
    'head-option': headOption,
    'product': product
  },
  props: ['masterData', 'imgPath'],
  data: function () {
    return {
      typeSelect: 0,
      defaultShow: 12,
      moreShow: 12,
      maxLength: '',
      moreActive: true
    };
  },
  methods: {
    countMore: function () {
      this.moreShow += this.defaultShow;
    },
    narrowDown: function (type) {
      this.typeSelect = type;
    }
  },
  computed: {
    products: function () {
      const filtered = this.masterData.filter(item => item.id !== 0);
      return filtered;
    },
    filterdList: function () {
      const _this = this;

      let newArr = 'null';

      if (this.typeSelect === 0) {
        newArr = this.products;
      } else {
        newArr = this.products.filter(function (val) {
          return val.type === _this.typeSelect;
        });
      }

      this.maxLength = newArr.length;
      return newArr.slice(0, this.moreShow);
    },
    selectList: function () {
      var uniqueType = Array.from(new Map(this.masterData.map(function (val) {
        return [val.type, val];
      })).values());
      uniqueType.sort((a, b) => a.type - b.type);
      return uniqueType;
    }
  },
  watch: {
    typeSelect: function (newjob, oldjob) {
      if (newjob != oldjob) {
        this.moreShow = this.defaultShow;
      }
    },
    moreShow: function () {
      if (this.maxLength <= this.moreShow) {
        this.moreActive = false;
      }
    },
    maxLength: function () {
      if (this.maxLength <= this.defaultShow) {
        this.moreActive = false;
      } else {
        this.moreActive = true;
      }
    }
  }
});