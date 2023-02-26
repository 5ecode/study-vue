/*----------------------------------------------------------------------
絞り込みコンポーネント
----------------------------------------------------------------------*/
const headOption = {
  template: `
  <div class="u-mb1">
    <label>絞り込み
      <select id="filterSelect" v-on:change="doChange" v-bind:value="type" v-model="type">
        <option v-for="(item,i) in selectList" v-bind:value="i">{{item['category']}}</option>
      </select>
    </label>
  </div>
  `,
  props: ['selectList'],
  data: function () {
    return {
      type: 0
    }
  },
  methods: {
    doChange() {
      this.$emit('child-change', this.type);
    }
  }
}