<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: Menu của web
 -->
<template>
  
 <div class="menu" :class="{'mini-menu':currentHideTheMenu}">
    <div class="menu-top">
      <div class="menu-top-icon icon-24" style="width:36px;" v-show="!currentHideTheMenu"></div>
      <div class="menu-top-logo" v-show="!currentHideTheMenu"></div>
      <button @click="currentHideTheMenu = false" v-show="currentHideTheMenu" class="menu-top-icon-mini icon-16 icon-ml-10 icon-mr-10">
        </button>
    </div>
    <div class="menu-content">
      
      <router-link class="menu-content-item"
       v-for="item in menuItems" :key="item.title" :to="item.route"
          v-slot="{ isActive }" :title="item.title"
        >
          <div class="background-icon icon-24 icon-mr-12" 
          :class="( isActive && item.activeClass)"
          :style="{'background-position': item.iconPosition[0] + 'px ' +item.iconPosition[1]+'px'}"></div>
          <div class="menu-content-item-text">{{item.title}}</div>
    </router-link>
    </div>
 </div>
</template>

<script>
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: Nhúng hằng số items
 */
import {MENU_ITEMS} from "../../constants"

export default {
  name: 'TheMenu',
  props: {
    hideTheMenu:{
      Type:Boolean,
      default: false
    }
  },
  data(){
    return{
      // danh sách các item trong menu
      menuItems: [],

      // theo dõi header co giãn
      currentHideTheMenu:false
    }
  }, 
  created(){
    // khởi tạo giá trị items menu
    this.menuItems = MENU_ITEMS;
  },
  watch:{
    /**
     * Author: Phạm Văn Đạt(25/10/2022)
     * Function: Theo dõi biến ẩn menu
     */
    hideTheMenu(value){
      this.currentHideTheMenu = value;
    },

    /**
     * Author: Phạm Văn Đạt(25/10/2022)
     * Function: Ẩn menu
     */
    currentHideTheMenu(value){
      if(value == false){
        this.$emit('hideTheMenu',false);
      }
    }
  }
}
</script>
  
<style scoped>
  @import url(TheMenu.css)
</style>
