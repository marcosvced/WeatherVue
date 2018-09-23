<template>
  <div id="app">
    <router-view class="view one" name="SearchCity"></router-view>
    <router-view class="view two" name="SearchWeather"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import "styles/main";
</style>
