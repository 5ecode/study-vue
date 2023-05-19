const app = Vue.createApp({
  data() {
    return {
      message: 'Vue.js 3 !!',
      testText: '初期値',
      testCheckbox: false,
      btnMsg: 'イベント待機',
      login: {
        email: '',
        password: ''
      }
    };
  },

  setup() {
    Vue.onMounted(function () {
      console.log(`コンポーネントがマウントされました。`);
    });
    Vue.onUpdated(function () {
      console.log(`リアクティブデータが変更されました！`);
    });
    const counter = Vue.ref(0);
    const watchCounter = Vue.reactive({
      newValue: null,
      oldValue: null
    });

    const increment = () => {
      counter.value++;
    };

    const decrement = function () {
      counter.value--;
    };

    const doubleCounter = Vue.computed(function () {
      return counter.value * 2;
    });
    Vue.watch(counter, function (newValue, oldValue) {
      watchCounter.newValue = newValue;
      watchCounter.oldValue = oldValue;
    });
    return {
      counter,
      watchCounter,
      increment,
      decrement,
      doubleCounter
    };
  }

});
app.component('global-component', {
  template: `
    <p class="u-fontB">{{ message }}</p>
    <p><strong>グローバルコンポーネントの使い方</strong></p>
  `,
  data: function () {
    return {
      message: 'Hello Vue!'
    };
  }
});
app.component('custom-input', {
  template: `<p>
    <input v-bind:value="modelValue" v-on:input="$emit('update:modelValue', $event.target.value)">
    子側：{{modelValue}}
    </p>
  `,
  props: {
    'modelValue': [String, Number]
  },
  emits: ['update:modelValue']
});
app.component('custom-input-checkbox', {
  template: `
    <label><input type="checkbox" v-bind:checked="checked" v-on:change="$emit('update:checked', $event.target.checked)">{{checked}}</label>
  `,
  props: {
    checked: Boolean
  },
  emits: ['update:checked']
});
app.component('login-component', {
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
  },
  emits: ['update:email', 'update:password']
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
    name: String,
    stock: Number,
    index: Number
  },
  emits: ['child-click'],

  setup(props, context) {
    const doSaleStock = function () {
      context.emit('child-click', props.index);
    };

    return {
      doSaleStock
    };
  }

};
app.component('parent-component', {
  components: {
    'child-product': childProduct
  },
  template: `<child-product v-for="(item,i) in product" v-bind:key="item.id" v-bind:index="i" v-bind="item" v-on:child-click="saleStock"></child-product>`,

  setup() {
    const product = Vue.ref([{
      id: 1,
      name: 'フルーツタルト',
      stock: 3,
      price: 410
    }, {
      id: 2,
      name: '極生塩パン',
      stock: 10,
      price: 180
    }, {
      id: 3,
      name: '草餅',
      stock: 1,
      price: 240
    }]);

    const saleStock = function (i) {
      if (product.value[i].stock > 0) {
        product.value[i].stock -= 1;
      }
    };

    return {
      product,
      saleStock
    };
  }

});
app.component('teleport-component', {
  template: `
    <button @click="open = !open" ref="trigger">モーダルを開く</button>
    <Teleport to="#secTeleport">
      <div v-if="open" class="modalPanel" ref="modalPanel">
        <div class="modalPanel_inner">
          <p class="u-fontB u-mb1">モーダルコンテンツ</p>
          <p>teleportの移動先は&lt;teleport&gt;がマウントされたときにDOMに存在していなければならない。Vueアプリケーション外（マウントした要素の外側）が理想的とされ、Vueでレンダリングされる別の要素をターゲットにする場合は、その要素が&lt;teleport&gt;の前にマウントされていなければならないとある。</p>
          <p class="u-mb1">しかし以下のように移動元のコンポーネントの前と後それぞれの場所に移動先（#secTeleport）を設置してみると、①と⑥以外はエラーが出てしまった。④と⑤は移動元のコンポーネントより後ろにあるのでエラーになるのも頷けるが、②と③がDOMにもともと存在していて且つコンポーネントより前にあってもエラーになるのは何故なのか。①の位置ならエラーにならないのはどうしてなのか。その辺りは分かり次第追記していきたい。</p>
          <p><img src="/assets/images/task/difference/img_01.png" alt="" class="u-fullImg pageImg01"></p>
          <button @click="open = false" class="modalPanel_btn">Close</button>
        </div>
      </div>
    </Teleport>
    <Teleport to="body">
      <div v-if="open" class="modalOverlay" @click="open = false"></div>
    </Teleport>
  `,

  setup() {
    const open = Vue.ref(false);
    const modalPanel = Vue.ref(null);
    Vue.onUpdated(function () {
      if (open.value) {
        const target = modalPanel.value;
        adjustSize(target);
      }
    });
    const largeClass = 'is-lgSize';

    adjustSize = function (modalPanel) {
      let panelHeight = modalPanel.clientHeight,
          windowHeight = document.documentElement.clientHeight;

      if (panelHeight >= windowHeight) {
        modalPanel.classList.add(largeClass);
      }
    };

    let scrollY;
    const fixedClass = 'is-fixed';
    Vue.watch(open, function (newValue) {
      if (newValue) {
        scrollY = Vue.ref(window.pageYOffset);
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
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;

    adjustScreen = function (fixed) {
      if (fixed) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      } else {
        document.body.style = "";
      }
    };

    return {
      open,
      modalPanel,
      adjustSize,
      adjustScreen
    };
  }

});
app.mount('#App');