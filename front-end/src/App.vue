<template>
  <the-menu></the-menu>
  <div class="main">
    <the-header></the-header>
    <the-content></the-content>
  </div>
</template>

<script>
import TheMenu from './components/layouts/the-menu/TheMenu.vue'
import TheHeader from './components/layouts/the-header/TheHeader.vue'
import TheContent from './components/layouts/the-content/TheContent.vue'


export default {
  name: 'App',
  components: {
    TheMenu,
    TheHeader,
    TheContent
  }
}
</script>

<style>
  @import url(App.css)
</style>
