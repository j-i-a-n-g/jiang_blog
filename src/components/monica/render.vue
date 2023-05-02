<template>
  <div id="online-render">
    <div id="preview-css"></div>
    <component :is="renderComponent" />
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  props: ['code'],
  data() {
    return {
      renderComponent: null
    }
  },
  mounted() {
    this.initComponent();
  },
  methods: {
    initComponent() {
      let $preview = document.getElementById('preview-css')
      $preview.innerHTML = `<style>${this.code.css}</style>`
      this.code.js = this.code.js.replace(/export/, "").replace(/default/, "")
      this.renderComponent = Vue.component("online-render", {
        mixins: [this.initVueInfo(this.code.js)], 
        template: this.code.html,
        data() {
          return {}
        },
        methods: {}
      });
    },
    initVueInfo(data) {
      return new Function(`return ${data}`)();
    },
  }
}
</script>

<style lang="scss" scoped>
.online-render {
  width: 100%;
  height: 100%;
}
</style>