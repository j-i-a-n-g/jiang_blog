<template>
  <div class="app">
    <MaskCanvas class="globle"></MaskCanvas>
    <NavBar />
    <div class="app-content">
      <div class="app-content-left">
        <LeftSider></LeftSider>
      </div>
      <div class="app-content-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import LeftSider from '@/components/HomeComponent/LeftSider.vue';
import MaskCanvas from './components/MaskCanvas.vue';
export default {
    name: "App",
    components: { NavBar, LeftSider, MaskCanvas }
}
</script>

<style lang="scss">
.app {
  font-size: 16px;
  &-content {
    max-width: 1500px;
    margin: 0 auto;
    display: flex;
    flex-wrap: nowrap;
    &-left {
      width: 300px;
      height: 100vh;
      max-height: 1200px;
      padding-right: 47px;
      overflow-y: auto;
      overflow-x: hidden;
      box-shadow: 0 0 2px 1px #ccc;
      margin-top: 50px;
    }
    &-right {
      flex: 1;
      height: 100vh;
      max-height: 1200px;
      z-index: 2;
      overflow-y: auto;
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

