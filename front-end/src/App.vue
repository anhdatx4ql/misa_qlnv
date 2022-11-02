<!-- 
  Author: Phạm Văn Đạt(26/10/2022)
  Function: Trang chính hiển thị website
 -->
<template>
  <the-menu
    :hideTheMenu="hideTheMenu"
    @hideTheMenu="hideTheMenu = $event"
  ></the-menu>
  <div class="main">
    <the-header
      @hideTheMenu="hideTheMenu = $event"
      :hideTheMenu="hideTheMenu"
    ></the-header>
    <div class="main-container">
      <the-content></the-content>
    </div>
  </div>
</template>

<script>
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: nhúng các compontents cần dùng
 */
import TheMenu from "./views/menu/TheMenu.vue";
import TheHeader from "./views/header/TheHeader.vue";
import TheContent from "./views/content/TheContent.vue";

export default {
  name: "App",
  components: {
    TheMenu,
    TheHeader,
    TheContent,
  },
  data() {
    return {
      // hiển thị menu
      hideTheMenu: false,
    };
  },
  watch: {
    /**
     * Author: Phạm Văn Đạt(18/10/2022)
     * Function: theo dõi menu co giãn
     */
    hideTheMenu(value) {
      console.log(value);
    },
  },
};
</script>

<style>
@import url(App.css);
</style>
