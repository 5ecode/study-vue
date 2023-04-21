Vue.filter('addComma', function (val) {
  return val.toLocaleString();
});
new Vue({
  el: '#App',
  data: {
    message: 'World',
    styleColor: {
      'color': '#f00',
      'font-weight': 'bold'
    },
    addClass: 'test-class',
    styleList: 'list-style-type: disc',
    date: new Date().toLocaleString(),
    list: ['spring（春）', 'summer（夏）', 'autumn（秋）', 'winter（冬）'],
    colors: ['あか', 'あお', 'きいろ'],
    todos: [{
      id: 1,
      status: true,
      text: 'Vue.jsの学習'
    }, {
      id: 2,
      status: false,
      text: '部屋の片づけ'
    }],
    searchText: '',
    counter: 0,
    ok: true,
    items: [{
      id: 1,
      name: 'チーズケーキ',
      stock: 3,
      price: 370
    }, {
      id: 2,
      name: 'クリームパン',
      stock: 10,
      price: 200
    }, {
      id: 3,
      name: '麩まんじゅう',
      stock: 1,
      price: 240
    }],
    newItemName: '',
    newItemStock: '10',
    order: [0],
    tax: 8,
    number: '',
    pattern: /^[0-9]+$/,
    isError: false,
    errorMsg: '半角数字で入力してください',
    lifecyclehook: '',
    price: 10000,
    testCounter: 0
  },
  methods: {
    addItem() {
      var max = this.items.reduce(function (a, b) {
        return a.id > b.id ? a.id : b.id;
      }, 0);

      if (this.newItemName) {
        this.items.push({
          id: max + 1,
          name: this.newItemName,
          stock: this.newItemStock
        });
      }
    },

    saleStock(i) {
      if (this.items[i].stock > 0) {
        this.items[i].stock -= 1;
      }
    },

    removeColor() {
      this.colors.shift();
    }

  },
  computed: {
    filtersort() {
      const sweets = this.items.filter(function (val) {
        return val.price;
      });
      return sweets.sort((a, b) => a.price - b.price);
    },

    totalPrice() {
      const total = this.order.reduce(function (a, b) {
        return a + b;
      });
      return Math.round(total + total * this.tax / 100);
    }

  },
  watch: {
    number(val) {
      if (!this.pattern.test(val) && val) {
        this.isError = true;
      } else {
        this.isError = false;
      }
    }

  },
  filters: {
    addTax: function (price, rate) {
      const tax = rate ? rate : 10;
      return Math.round(price + price * tax / 100);
    }
  },
  beforeCreate: function () {
    console.group('beforeCreate');
    console.log(this.$data);
    console.log(this.$el);
    console.groupEnd();
  },
  created: function () {
    console.group('created');
    console.log(this.$data);
    console.log(this.$el);
    console.groupEnd();
  },
  beforeMount: function () {
    console.group('beforeMount');
    console.log(this.$data);
    console.log(this.$el);
    console.groupEnd();
    this.$el.classList.add('is-beforeMount');
  },
  mounted: function () {
    console.group('mounted');
    console.log(this.$data);
    console.log(this.$el);
    console.groupEnd();
    this.$el.classList.add('is-mounted');
  },
  beforeUpdate: function () {
    console.group('beforeUpdate');
    console.log(this.$data.testCounter);
    console.log(this.$el);
    console.groupEnd();
  },
  updated: function () {
    console.group('updated');
    console.log(this.$data.testCounter);
    console.log(this.$el);
    console.groupEnd();
  },
  beforeDestroy: function () {
    console.group('beforeDestroy');
    console.groupEnd();
  },
  destroyed: function () {
    console.group('destroyed');
    console.groupEnd();
  }
});