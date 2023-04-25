/*----------------------------------------------------------------------
グローバルカスタムディレクティブ
----------------------------------------------------------------------*/
Vue.directive('custom-directive', {
  bind: function (el, binding, vnode, oldVnode) {
    console.group('bind');
    console.log(el);
    console.log(binding);
    console.log(vnode);
    console.log(oldVnode);
    el.style.backgroundColor = binding.value;
    el.style.padding = '5px';
    el.placeholder = 'コンソールも確認';
  }
});