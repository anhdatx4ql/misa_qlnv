<template>
 <div class="paging">
    <div class="paging-left">
      <p class="paging-left-text">Tổng số <b>{{total}}</b> bản ghi</p>
    </div>
    <div class="paging-right">
      <div class="paging-right-combobox">
        <m-combobox :value="pagingItems[0]" 
        :listValues="pagingItems" :disabled="true" position="bottom"
        @newValue="pageSize = $event">
        </m-combobox>
      </div>
      <div class="paging-right-button">
        <button class="paging-right-pre paging-disable" style="margin-right:13px;">Trước</button>
        <div class="paging-right-index">
          <button class="paging-right-index-child" 
          v-for="(i) in totalPageSize" :key="i" :tabindex="Number(totalPageSize)-3"
          :style="((i<4 || i>totalPageSize-2))?'':'display:none'"
          :class="{'active':(i == currentPage)}"
          @click="$emit('currentPage',i), currentPage = i"
          >
          {{i}}
        </button>
        </div>
        <button class="paging-right-next"  style="margin-left:13px;">Sau</button>
      </div>
    </div>
 </div>
</template>

<script>
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: Lấy danh sách paging có thể có
 */
import {PAGING_ITEMS} from '../../../constants.js'

export default {
  name: 'MPaging',
  props: {
    totalCount:Number,
  },
  data(){
    return{
      // khai báo mảng chứa các items paging
      pagingItems:[],

      // tổng số bản ghi
      total: 0,

      // số bản ghi trên trang
      pageSize:10,

      // các trang có thể có
      totalPageSize: 0,

      // trang đang đứng
      currentPage: 1
    }
  },
  created(){
    // khởi tạo giá trị items paging
    this.pagingItems= PAGING_ITEMS;

  },
  watch:{
    /**
     * Author: Phạm Văn Đạt(21/10/2022)
     * Function: Lấy tổng số bản ghi thỏa mãn điều kiện
     */
    totalCount(value){
      this.total = value;
      
      // tính toán lại số trang
      this.hanlderTotalPageZize();
    },

    // theo doi số bản ghi trên trang
    pageSize(value){
      this.$emit('pageSize', value);
      this.currentPage = 1;
      // tính toán lại số trang
      this.hanlderTotalPageZize();
    }
  },

  methods:{
    /**
     * Author: Phạm Văn Đạt(21/10/2022)
     * Function: Xử lý tính toán số trang có thể có
     */
    hanlderTotalPageZize(){
      this.totalPageSize = Math.ceil( this.total / this.pageSize);
    }
  }
}
</script>

<style scoped>
@import url(MPaging.css)
</style>
