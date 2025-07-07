const SmartInput = {
  props: {
    modelValue: {
      type: [String, Number],
      required: true
    },
    modelModifiers: {
      type: Object,
      default: () => ({})
    },
    label: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  template: `
    <label>
      {{ label }}
      <input type="text" :value="modelValue" @input="onInput" @change="onChange" />
    </label>
  `,
  methods: {
    // 通常入力用（.lazy がない場合）
    onInput(event) {
      if (this.modelModifiers.lazy) return  // .lazy のときは無視
      const value = this.processValue(event.target.value)
      this.$emit('update:modelValue', value)
    },
    // .lazy のときに使う（change イベント）
    onChange(event) {
      if (!this.modelModifiers.lazy) return  // .lazy でないときは無視
      const value = this.processValue(event.target.value)
      this.$emit('update:modelValue', value)
    },
    // .trim, .number の処理共通化
    processValue(rawValue) {
      let value = rawValue
      if (this.modelModifiers.trim) {
        value = value.trim()
      }
      if (this.modelModifiers.number) {
        value = Number(value)
      }
      return value
    }
  }
}

const app = Vue.createApp({
  data() {
    return {
      message: 'Vue.js 3 !!',
      testText: '初期値',
      testCheckbox: false,
      btnMsg: 'イベント待機',
      login: { email: '', password: '' },
    }
  },
  components: {
    SmartInput
  },
  setup() {
    Vue.onMounted(function () {
      console.log(`コンポーネントがマウントされました。`);
    })
    Vue.onUpdated(function () {
      console.log(`リアクティブデータが変更されました！`);
    })

    const counter = Vue.ref(0);
    const watchCounter = Vue.reactive({
      newValue: null,
      oldValue: null,
    })
    const name = Vue.ref('')
    const age = Vue.ref(null)

    const increment = () => {
      counter.value ++;
    }
    const decrement = function () {
      counter.value --;
    }

    const doubleCounter = Vue.computed(function() {
      return counter.value * 2;
    })

    Vue.watch(counter, function (newValue, oldValue) {
      watchCounter.newValue = newValue;
      watchCounter.oldValue = oldValue;
    })

    return {
      counter,
      watchCounter,
      name,age,
      increment,
      decrement,
      doubleCounter
    }
  }
})

app.component('global-component', {
  template: `
    <p class="u-fontB">{{ message }}</p>
    <p><strong>グローバルコンポーネントの使い方</strong></p>
  `,
  data: function () {
    return {
      message: 'Hello Vue!'
    }
  }
})

app.component('custom-input', {
  template: `<p>
    <input type="text" v-bind:value="modelValue" v-on:input="$emit('update:modelValue', $event.target.value)">
    子側：{{modelValue}}
    </p>
  `,
  props: { 'modelValue': [String, Number], 'modelModifiers': Object },
  emits: ['update:modelValue']
});

app.component('custom-input-checkbox', {
  template: `
    <label><input type="checkbox" v-bind:checked="checked" v-on:change="$emit('update:checked', $event.target.checked)">{{checked}}</label>
  `,
  props: { checked: Boolean },
  emits: ['update:checked']
})

app.component('login-component',{
  template: `
    <div class="u-mb1">
      <label>メール<input type="email" :value="email" @input="$emit('update:email', $event.target.value)"></label>
      <label>パスワード<input type="password" :value="password" @input="$emit('update:password', $event.target.value)" size="10"></label>
      子側props【{{email}} : {{password}}】
    </div>
  `,
  props: { email: String, password: String },
  emits: ['update:email', 'update:password']
})

const ChildProduct = {
  template: `
    <li class="formUnit">
      <p>◎{{name}}（在庫{{stock}}）</p>
      <button v-if="stock" v-on:click="clickBuy">買う</button>
      <span v-else>完売しました</span>
    </li>
  `,
  props: {
    name: String,
    stock: Number,
    index: Number
  },
  emits: ['buy'],
  setup(props, { emit }) {
    const clickBuy = function() {
      emit('buy', props.index);
    }

    return { clickBuy }
  }
};
const ChildAddProduct = {
  template: `
  <div class="formUnit">
    <label>品名：<input type="text" v-bind:value="name" v-on:input="onInput"></label>
    <label>仕入数：<select v-bind:value="stock" v-on:change="onChange">
    <option value="5">5</option>
    <option value="10">10</option>
    <option value="15">15</option>
    <option value="20">20</option>
    </select></label>
    <button v-on:click="addItem">リストに追加する</button>
  </div>
  `,
  props: {
    name: String,
    stock: Number,
    nameModifiers: Object,
    stockModifiers: Object
  },
  emits: ['update:name', 'update:stock', 'add'],
  setup(props, { emit }){
    // 商品の入力
    const onInput = function(event){
      let value = event.target.value;
      // 修飾子があれば変換
      if (props.nameModifiers?.trim) {
        value = value.trim();
      }
      emit('update:name', value);
    }

    // 仕入数の入力
    const onChange = function(event){
      let value = event.target.value;
      // 修飾子があれば変換
      if (props.stockModifiers?.number) {
        value = Number(value);
      }
      emit('update:stock', value);
    }

    // イベントの発火
    const addItem = function(){
      emit('add');
    }
    return { onInput, onChange, addItem }
  }
}
app.component('parent-component', {
  components: {
    'child-product': ChildProduct,
    'child-add-product': ChildAddProduct
  },
  template: `
  <ul class="c-list u-mb1">
    <child-product v-for="(item,i) in product" v-bind:key="item.id" v-bind:index="i" v-bind:name="item.name" v-bind:stock="item.stock" v-on:buy="decreaseStock"></child-product>
  </ul>
  <child-add-product v-model:name.trim="newItemName" v-model:stock.number="newItemStock" v-on:add="addItem"></child-add-product>
  `,
  setup() {
    const newItemName = Vue.ref('');
    const newItemStock = Vue.ref(10);
    const product = Vue.ref([
      { id: 1, name: 'フルーツタルト', stock: 3, price: 410 },
      { id: 2, name: '極生塩パン', stock: 10, price: 180 },
      { id: 3, name: '草餅', stock: 1, price: 240 }
    ])

    const decreaseStock = function(i) {
      if (product.value[i].stock > 0) {
        product.value[i].stock -= 1;
      }
    }
    const addItem = function() {
      const max = product.value.reduce(function(a,b){
        return a.id > b.id ? a.id : b.id;
      },0)

      if(newItemName.value){
        product.value.push({
          id: max + 1,
          name: newItemName.value,
          stock: newItemStock.value
        });
        newItemName.value = '';
        newItemStock.value = 10;
      }
    }
    return { newItemName, newItemStock, product, decreaseStock, addItem }
  }
})

app.component('teleport-component', {
  template: `
    <button @click="showModal = !showModal">モーダルを開く</button>
    <Teleport to="#secTeleport">
      <div v-if="showModal" class="modalPanel" ref="modalPanelRef">
        <div class="modalPanel_inner">
          <p class="u-fontB u-mb1">モーダルコンテンツ</p>
          <p>teleportの移動先は&lt;teleport&gt;がマウントされたときにDOMに存在していなければならない。Vueアプリケーション外（マウントした要素の外側）が理想的とされ、Vueでレンダリングされる別の要素をターゲットにする場合は、その要素が&lt;teleport&gt;の前にマウントされていなければならないとある。</p>
          <p class="u-mb1">しかし以下のように移動元のコンポーネントの前と後それぞれの場所に移動先（#secTeleport）を設置してみると、①と⑥以外はエラーが出てしまった。④と⑤は移動元のコンポーネントより後ろにあるのでエラーになるのも頷けるが、②と③がDOMにもともと存在していて且つコンポーネントより前にあってもエラーになるのは何故なのか。①の位置ならエラーにならないのはどうしてなのか。その辺りは分かり次第追記していきたい。</p>
          <p><img src="/assets/images/task/difference/img_01.png" alt="" class="u-fullImg pageImg01"></p>
          <button @click="showModal = false" class="modalPanel_btn">Close</button>
        </div>
      </div>
    </Teleport>
    <Teleport to="body">
      <div v-if="showModal" class="modalOverlay" @click="showModal = false"></div>
    </Teleport>
  `,
  setup() {
    // リアクティブデータ
    const showModal = Vue.ref(false);
    const modalPanelRef = Vue.ref(null);
    const scrollY = Vue.ref(0);

    // 変数
    const largeClass = 'is-lgSize';
    const fixedClass = 'is-fixed';
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;

    // モーダルがビューポートより大きい場合はクラスを付与
    function adjustSize(modalPanelRef) {
      let panelHeight = modalPanelRef.clientHeight,
          windowHeight = document.documentElement.clientHeight;

      if (panelHeight >= windowHeight) {
        modalPanelRef.classList.add(largeClass);
      }
    };

    // モーダルの開閉時にスタイルを変更
    function adjustScreen(fixed) {
      if (fixed) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      } else {
        document.body.style = "";
      }
    };

    // showModalの監視
    Vue.watch(showModal, function (newValue) {
      if (newValue) {
        scrollY.value = window.pageYOffset;
        document.documentElement.style.top = `-${scrollY.value}px`;
        adjustScreen(true);
        document.getElementsByTagName('html')[0].classList.add(fixedClass);
      } else {
        document.documentElement.style.top = '';
        adjustScreen(false);
        document.getElementsByTagName('html')[0].classList.remove(fixedClass);

        if (scrollY.value) {
          window.scrollTo(0, scrollY.value);
        }
      }
    });

    // ライフサイクルフック
    Vue.onUpdated(function () {
      if (showModal.value) {
        const target = modalPanelRef.value;
        if (modalPanelRef.value) {
          adjustSize(target);
        }
      }
    });

    return {
      showModal,
      modalPanelRef,
      adjustSize,
      adjustScreen
    };
  }
})

app.component('async-component', {
  template: `<p>読み込み完了！</p>`,
  async setup() {
    // 疑似的に3秒待つ
    await new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 3000)
    })

    // 非同期処理後さらに何かしたい場合
    // Vue.nextTick(() => {
    //   console.log('✅ DOMに表示された後の処理');
    // });

    return {};
  }
})
app.mount('#App');

