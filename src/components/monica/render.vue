<template>
  <div id="online-render">
    <div></div>
    <component :is="renderComponent" />
  </div>
</template>

<script>
import Vue from 'vue';
export default {
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
      this.renderComponent = Vue.component("online-render", {
        template: '<div class="editor"></div>',
        render(h) {
          return h("div", {
            class: "editor",
          });
        },
      });
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