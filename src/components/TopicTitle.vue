<template>
  <div class="main-design">
    <h2>
      <i :class="iconClass">
        {{ topic }}
      </i>
    </h2>
    <div class="main-design-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    topic: String,
    iconClass: String,
  },
};
</script>

<style lang="scss" scoped>
.main-design {
  height: calc(100vh - 90px);
  overflow: hidden;
  width: 100%;
  padding: 20px;
}
h2 {
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 20px;
  > i {
    text-shadow: 0 0 10px #fff;
  }
}
.main-design-content {
  height: calc(100% - 50px);
  margin: 40px 50px 0;
  position: relative;
}
</style>