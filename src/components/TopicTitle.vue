<template>
    <h2>
    <i :class="iconClass">
      {{topic}}
    </i>
    </h2>
</template>

<script>
export default {
  props: {
    topic: String,
    iconClass: String
  }
}
</script>

<style lang="scss" scoped>
  h2 {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 20px;
    > i {
      text-shadow: 0 0 10px #fff;
    }
  }

</style>