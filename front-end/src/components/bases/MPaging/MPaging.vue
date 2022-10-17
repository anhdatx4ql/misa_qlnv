<template>
 <div class="paging">
    <div class="paging-left">
      <p class="paging-left-text">Tổng số <b>32</b> bản ghi</p>
    </div>
    <div class="paging-right">
      <div class="paging-right-combobox">
        <m-combobox :value="{id:10,name:'10 bản ghi trên trang'}" 
        :listValues="pagingItems" :disabled="true" position="bottom">
        </m-combobox>
      </div>
      <div class="paging-right-button">
        <button class="paging-right-pre paging-disable" style="margin-right:13px;">Trước</button>
        <div class="paging-right-index">
          <button class="paging-right-index-child active">1</button>
          <button class="paging-right-index-child">2</button>
          <button class="paging-right-index-child">3</button>
        </div>
        <button class="paging-right-next"  style="margin-left:13px;">Sau</button>
      </div>
    </div>
 </div>
</template>

<script>
import {PAGING_ITEMS} from '../../../constants.js'
export default {
  name: 'MPaging',
  props: {
    text:String
  },
  data(){
    return{
      pagingItems:[]
    }
  },
  created(){
    console.log(PAGING_ITEMS)
    this.pagingItems= PAGING_ITEMS;
  }
}
</script>

<style scoped>
@import url(MPaging.css)
</style>
