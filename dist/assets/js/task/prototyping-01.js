/*----------------------------------------------------------------------
親コンポーネント
----------------------------------------------------------------------*/
new Vue({
  el: '#App',
  data: {
    defaultShow: 12,
    masterData: [],
    moreShow: 12,
    maxLength: '',
    moreActive: true,
    tax: 10
  },
  created: function () {
    axios.get('/task/product_data.json').then(function (response) {
      this.masterData = response.data;
    }.bind(this)).catch(function (e) {
      console.log(e);
    });
  }
});