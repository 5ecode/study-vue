/*----------------------------------------------------------------------
グローバルカスタムディレクティブ
----------------------------------------------------------------------*/
Vue.directive('custom-directive', {
  bind: function (el, binding) {
    console.group('bind');
    console.log(el);
    console.log(binding);
    el.style.backgroundColor = binding.value;
    el.style.padding = '5px';
    el.placeholder = 'コンソールも確認'
  }
})
