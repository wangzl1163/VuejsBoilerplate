<template>
   <div id="app">
      <router-view></router-view>
   </div>
</template>

<script>
export default {
   name: 'App'
}
</script>

<style lang="less">
@import url("./Assets/Style/Base.less");
#app {
   height: 100%;
}
</style>
