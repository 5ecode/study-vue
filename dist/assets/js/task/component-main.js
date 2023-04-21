// インスタンス生成
new Vue({
  el: '#App',
  components: {
    'local-component': localComponent,
    'child-product': childProduct
  },
  data: {
    items: [{
      id: 1,
      name: '人間工学オフィスチェア',
      price: 21817
    }, {
      id: 2,
      name: 'FINAL FANTASY VII REBIRTH',
      price: 9000
    }, {
      id: 3,
      name: 'PINARELLO Prince',
      price: 465000
    }, {
      id: 4,
      name: 'エアウィーヴ 02 シングル',
      price: 100000
    }],
    tax: 10,
    styleObject: [{
      display: 'inline-block',
      width: '30%',
      height: '100px',
      background: '#4d7dc5'
    }, {
      display: 'inline-block',
      width: '40%',
      height: '150px',
      background: '#4fc54d'
    }, {
      display: 'inline-block',
      width: '30%',
      height: '200px',
      background: '#c5844d'
    }],
    product: [{
      id: 1,
      name: 'フルーツタルト',
      stock: 3
    }, {
      id: 2,
      name: '極生塩パン',
      stock: 10
    }, {
      id: 3,
      name: '草餅',
      stock: 1
    }],
    msg: 'イベント待機',
    testText: '初期値',
    order: [0],
    tax: 10,
    reducedTaxRate: '',
    sweetsList: [{
      id: 1,
      name: '季節のフルーツタルト',
      price: 860
    }, {
      id: 2,
      name: 'オレンジのタルト',
      price: 760
    }, {
      id: 3,
      name: '5種の柑橘のタルト',
      price: 900
    }],
    taxRate: [{
      id: 1,
      theme: 'テイクアウト',
      val: 1
    }, {
      id: 2,
      theme: 'イートイン',
      val: 2
    }],
    stockFruits: [{
      id: 1,
      name: '赤いフルーツのタルト',
      price: 800
    }, {
      id: 2,
      name: '静岡県産 "桃薫（とうくん）"のタルト',
      price: 1260
    }, {
      id: 3,
      name: '輪花型 新潟県産 "越後姫"のタルト',
      price: 1350
    }],
    login: {
      email: '',
      password: ''
    },
    orderType: 1,
    newItemName: '',
    newItemPrice: '',
    testCheckbox: false,
    codeType: '',
    slotBoxClass: 'slotBox',
    parentData: '親の持つデータ',
    scrollAnchor: document.getElementById('scrollAnchor'),
    activeClass: 'inactive'
  },
  methods: {
    testTextEvent(event) {
      this.testText = event;
    },

    saleStock(i) {
      if (this.product[i].stock > 0) {
        this.product[i].stock -= 1;
      }
    },

    parentMethods() {
      this.msg = '親側でイベントをキャッチ';
    },

    addItem() {
      var max = this.sweetsList.reduce(function (a, b) {
        return a.id > b.id ? a.id : b.id;
      }, 0);

      if (this.newItemPrice && isNaN(this.newItemPrice)) {
        return false;
      }

      if (this.newItemName) {
        this.sweetsList.push({
          id: max + 1,
          name: this.newItemName,
          price: this.newItemPrice
        });
      }
    }

  },
  computed: {
    filtersort() {
      const sweets = this.sweetsList.filter(function (val) {
        return val.price;
      });
      return sweets.sort((a, b) => a.price - b.price);
    },

    totalPrice() {
      const total = this.order.reduce(function (a, b) {
        return a + b;
      });
      const taxIncluded = Math.round(total + total * this.reducedTaxRate / 100);
      return taxIncluded.toLocaleString();
    }

  },
  watch: {
    orderType: {
      handler() {
        if (this.orderType === 1) {
          this.reducedTaxRate = 8;
        } else {
          this.reducedTaxRate = this.tax;
        }
      },

      immediate: true
    },

    codeType() {
      scrollAnchor.scrollIntoView();
    }

  }
});