<template>
  <div class="app">
    <MaskCanvas class="globle"></MaskCanvas>
    <NavBar />
    <div class="app-content">
      <div :class="['app-content-left','hidden-xs-only']"  v-show="$store.state.showLeftSider">
        <LeftSider></LeftSider>
      </div>
      <div class="app-content-right">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import LeftSider from "@/components/HomeComponent/LeftSider.vue";
import MaskCanvas from "./components/MaskCanvas.vue";
export default {
  name: "App",
  components: { NavBar, LeftSider, MaskCanvas },
};
</script>

<style lang="scss" scoped>
.app {
  font-size: 16px;
  &-content {
    max-width: 1500px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-wrap: nowrap;
    overflow-y: scroll;
    // 隐藏滚动条兼容性处理
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    ::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    &-left {
      width: 300px;
      max-height: 900px;
      padding-right: 35px;
      box-shadow: 0 0 2px 1px #ccc;
      margin-top: 50px;
      overflow-y: scroll;
      overflow-x: hidden;
    }
    &-right {
      flex: 1;
      height: 100vh;
      max-height: 1200px;
      // z-index: 2;
      overflow-y: scroll;
      // 隐藏滚动条兼容性处理
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE 10+ */
      ::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }
      margin-top: 50px;
      box-shadow: 0 0 2px 1px #ccc;
    }
  }
}
.globle {
  width: 100%;
  height: 100%;
}
</style>

