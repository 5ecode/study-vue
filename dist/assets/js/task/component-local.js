/*----------------------------------------------------------------------
ローカルコンポーネント
----------------------------------------------------------------------*/
const localComponent = {
  template: '<div><p>{{ message }}</p><p>ローカルコンポーネントの使い方</p></div>',
  data: function () {
    return {
      message: 'Hello Vue!'
    };
  }
};