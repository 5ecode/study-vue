/*----------------------------------------------------------------------
子コンポーネント
----------------------------------------------------------------------*/
const tabContents1 = {
  template: `
  <div class="tabContainer">
    <p>タブコンポーネントのコンテンツ1</p>
  </div>
  `
};
const tabContents2 = {
  template: `
  <div class="tabContainer">
    <p>タブコンポーネントのコンテンツ2</p>
    <label><input type="checkbox" v-bind:checked="checked" v-on:change="$emit('change', $event.target.checked)">{{checked}}</label>
  </div>
  `,
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
};
const tabContents3 = {
  template: `
  <div class="tabContainer">
    <p>タブコンポーネントのコンテンツ3</p>
    <button @click="show = !show">クリック@{{show}}</button>
    <template v-if="show">
      <p>表示がアクティブのときだけ表示する。</p>
    </template>
  </div>
  `,
  data() {
    return {
      show: false
    }
  }
};

Vue.component('toggle-component', {
  template: `
    <div class="u-mb2" ref="target">
      <template v-if="isShow">
        <slot></slot>
      </template>
      <button @click="toggleEvent">{{btnTxt}}</button>
    </div>
  `,
  data() {
    return {
      btnTxt: '',
      isShow: false,
      target:''
    }
  },
  mounted: function () {
    this.changeTxt();
    this.target = this.$refs.target;
    console.log(this.target)
  },
  methods: {
    toggleEvent(){
      this.isShow = !this.isShow;
      this.changeTxt();
      this.target.scrollIntoView();
    },
    changeTxt() {
      if (this.isShow) {
        this.btnTxt = 'コードを閉じる';
      } else {
        this.btnTxt = 'コードを見る';
      }
    }
  }
});

Vue.component('mixin-component-01', {
  mixins: [myMixin],
  template: `
    <div class="u-mb1">
      <p>{{mixinMsg}}</p>
      <button @click="changeMsg">{{btnTxt}}</button>
    </div>
  `,
  created: function () {
    console.log('コンポーネントのcreated');
  }
});
Vue.component('mixin-component-02', {
  mixins: [myMixin],
  template: `
    <div class="u-mb1">
      <p>{{addMsg}}</p>
      <button @click="changeMsg">{{btnTxt}}</button>
    </div>
  `,
  data(){
    return {
      compoMsg: 'にコンポーネントでテキストを追加',
      btnTxt: 'コンポーネントのメソッド'
    }
  },
  computed:{
    addMsg() {
      return this.mixinMsg + this.compoMsg;
    },
  },
  methods: {
    changeMsg: function () {
      this.mixinMsg = '「コンポーネントでデータを変更」';
      this.compoMsg = 'コンポーネントのメソッド';
    }
  }
});