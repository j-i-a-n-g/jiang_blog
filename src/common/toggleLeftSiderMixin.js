export const toggleLeftSiderMixin = {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit("toggleLeftSider", false);
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("toggleLeftSider", true);
    next()
  },
}