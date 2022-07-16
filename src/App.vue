<template>
  <div id="app">
    <MyHeader></MyHeader>
    <router-view></router-view>
    <!-- 在home search是显示的，在登录和注册是隐藏的 -->
    <MyFooter v-show="$route.meta.show"></MyFooter>
  </div>
</template>

<script>
import MyHeader from "./components/MyHeader";
import MyFooter from "./components/MyFooter";

export default {
  name: "App",
  components: {
    MyHeader,
    MyFooter,
  },
  mounted() {
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
