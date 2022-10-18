<template>
  <the-menu :hideTheMenu="hideTheMenu" @hideTheMenu="hideTheMenu = $event"></the-menu>
  <div class="main">
    <the-header @hideTheMenu="hideTheMenu = $event" :hideTheMenu="hideTheMenu"></the-header>
    <the-content></the-content>
  </div>
</template>

<script>
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: nhúng các compontents cần dùng
 */
import TheMenu from './components/layouts/the-menu/TheMenu.vue'
import TheHeader from './components/layouts/the-header/TheHeader.vue'
import TheContent from './components/layouts/the-content/TheContent.vue'


export default {
  name: 'App',
  components: {
    TheMenu,
    TheHeader,
    TheContent
  },
  data(){
    return {
      hideTheMenu:false
    }
  },
  watch:{
    /**
     * Author: Phạm Văn Đạt(18/10/2022)
     * Function: theo dõi menu co giãn
     */
    hideTheMenu(value){
      console.log(value)
    }
  }
}
</script>

<style>
  @import url(App.css)
</style>
