<template>
  <div id="app" class="columns">
    <router-view name="SearchWeather"></router-view>
    <router-view name="SearchCity"></router-view>
    <!--<router-view name="Maps"></router-view>-->
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
