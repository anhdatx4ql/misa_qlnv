<template>
 <div class="menu">
    <div class="menu-top">
      <div class="menu-top-icon icon-24 icon-mr-10"></div>
      <div class="menu-top-logo"></div>
    </div>
    <div class="menu-content">
      <router-link class="menu-content-item" v-for="item in menuItems" :key="item.title" :to="item.route">
          <div class="background-icon icon-24 icon-mr-8" 
          :style="{'background-position': item.iconPosition[0] + 'px ' +item.iconPosition[1]+'px'}"></div>
          <div class="menu-content-item-text">{{item.title}}</div>
    </router-link>
    </div>
 </div>
</template>

<script>
import {MENU_ITEMS} from "../../../constants"

export default {
  name: 'TheMenu',
  props: {
  },
  data(){
    return{
      menuItems: []
    }
  }, 
  created(){
    this.menuItems = MENU_ITEMS;
    console.log(this.menuItems)
  }
}
</script>
  
<style scoped>
  @import url(TheMenu.css)
</style>
