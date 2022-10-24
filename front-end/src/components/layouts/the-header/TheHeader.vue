<template>
  <div class="header">
    <div class="header-left">
      <div class="header-left-icon">
        <button @click="currentHideTheMenu = true" v-show="!currentHideTheMenu" class="header-left-background-icon icon-24 icon-ml-10">
        </button>
      </div>
      <div class="header-left-text" style="padding-left:10px;">
        <m-combobox
            :value="companies[0]" 
            :listValues="companies"
            position="top"
            :disabled="true">
        </m-combobox>

      </div>
    </div>
    <div class="header-right">
      <div class="header-right-icon">
        <button class="header-right-background-icon icon-24 icon-ml-10 icon-mr-10"></button>
      </div>
      <div class="header-right-info">
        <div class="header-right-info-avatar icon-32"></div>
        <div class="header-right-info-name" style="margin-right:8px;">Phạm Văn Đạt</div>
        <div class="header-right-info-icon icon-14"></div>
      </div>
    </div>
 </div>
</template>

<script>
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: Lấy danh sách các công ty
 */
import {COMPANIES} from "../../../constants.js"
export default {
  name: 'TheHeader',
  props: {
    hideTheMenu:{
      Type:Boolean,
      default:false
    }
  },
  data(){
    return{
      // khai báo danh sách công ty
      companies:[],
      currentHideTheMenu:false
    }
  },
  created(){
    // khởi tạo danh sách công ty
    this.companies = COMPANIES;
  },
  watch:{
    hideTheMenu(value){
      this.currentHideTheMenu = value;
     
    },

    currentHideTheMenu(value){
      if(value == true){
        this.$emit('hideTheMenu',true);
      }
    }
  }
}
</script>
<style scoped>
  @import url(TheHeader.css);

</style>
