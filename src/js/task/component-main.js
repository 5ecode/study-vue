// インスタンス生成
const app = new Vue({
  el: '#App',
  components: {
    'local-component': localComponent,
    'child-product': childProduct
  },
  data: {
    items: [
      { id: 0, name: '人間工学オフィスチェア', price: 21817 },
      { id: 1, name: 'FINAL FANTASY VII REMAKE INTERGRADE', price: 8980 },
      { id: 2, name: 'PINARELLO Prince', price: 465000 },
      { id: 3, name: 'エアウィーヴ 02 シングル', price: 100000 }
    ],
    tax: 10,
    styleObject: [
      { display: 'inline-block', width: '30%', height: '100px', background: '#4d7dc5' },
      { display: 'inline-block', width: '40%', height: '150px', background: '#4fc54d' },
      { display: 'inline-block', width: '30%', height: '200px', background: '#c5844d' }
    ],
    product: [
      { id: 0, name: 'フルーツタルト', stock: 3 },
      { id: 1, name: '極生塩パン', stock: 10 },
      { id: 2, name: '草餅', stock: 1 }
    ],
    msg: 'イベント待機'
  },
  methods: {
    saleStock(i) {
      if (this.product[i].stock > 0) {
        this.product[i].stock -= 1;
      }
    },
    parentMethods() {
      this.msg = '親側でイベントをキャッチ';
    }
  }
});
