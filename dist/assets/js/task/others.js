new Vue({
  el: '#App',
  data: {
    isShow: true,
    currentTab: 'contents1',
    tabs: [{
      key: 'contents1',
      name: 'タブ1'
    }, {
      key: 'contents2',
      name: 'タブ2'
    }, {
      key: 'contents3',
      name: 'タブ3'
    }],
    testCheckbox: false
  },
  components: {
    'tab-contents1': tabContents1,
    'tab-contents2': tabContents2,
    'tab-contents3': tabContents3
  },
  methods: {
    warn: function (message, event) {
      alert(event);

      if (event) {
        event.preventDefault();
      }

      alert(message);
    }
  },
  computed: {
    tabComponents() {
      return 'tab-' + this.currentTab.toLowerCase();
    }

  }
});