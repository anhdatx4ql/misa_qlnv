<template>
  <div class="header">
    <div class="header-left">
      <div class="header-left-icon">
        <button class="header-left-background-icon icon-24 icon-ml-10 icon-mr-10"></button>
      </div>
      <div class="header-left-text">
        <select name="" id="">
          <option v-for="company in companies" :key="company.name" :value="company.value">{{company.name}}</option>
        </select>
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
import {COMPANIES} from "../../../constants.js"
export default {
  name: 'TheHeader',
  props: {
  },
  data(){
    return{
      companies:[]
    }
  },
  created(){
    this.companies = COMPANIES;
  }
}
</script>
<style scoped>
  @import url(TheHeader.css);

</style>
