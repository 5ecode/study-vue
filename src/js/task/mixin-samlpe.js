/*----------------------------------------------------------------------
Mixinオブジェクト
----------------------------------------------------------------------*/
const myMixin = {
  data(){
    return {
      mixinMsg: '「ミックスインで持つデータ」',
      btnTxt: 'ミックスインのメソッド'
    }
  },
  created: function () {
    console.log('ミックスインのcreated');
  },
  methods: {
    changeMsg: function () {
      this.mixinMsg = '「ミックスインでデータを変更」';
    }
  }
}
