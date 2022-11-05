<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: Base phân trang dữ liệu
 -->
<template>
 <div class="paging">
    <div class="paging-left">
      <p class="paging-left-text">Tổng số <b>{{total}}</b> bản ghi</p>
    </div>
    <div class="paging-right">
      <div class="paging-right-combobox">
        <base-combobox :value="pagingItems[0]" 
        :listValues="pagingItems" :disabled="true" position="bottom"
        @newValueId="pageSize = $event">
        </base-combobox>
      </div>
      <div class="paging-right-button">
        <button class="paging-right-pre" 
        :class="{'paging-disable':(currentPage==1)}"
        :disabled="hasPre"
        @click.prevent="$emit('currentPage',currentPage-1), hasPre = true"
        style="margin-right:13px;">Trước</button>
        <div class="paging-right-index">
          <el-pagination
            v-model:currentPage="currentPagePaging"
            v-model:page-size="pageSize"
            :pager-count="5"
            layout="pager"
            :total="total"
          />
         
        </div>
        <button class="paging-right-next"
         :class="{'paging-disable':(currentPage==totalPageSize)}"
         @click.prevent="$emit('currentPage',currentPage+1)"
         :disabled="hasNext"
          style="margin-left:13px;">Sau</button>
      </div>
    </div>
 </div>
</template>

<script>
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: Lấy danh sách paging có thể có
 */
import {PAGING_ITEMS} from '../../constants.js'

export default {
  name: 'BasePaging',
  props: {
    // tổng số bản ghi thỏa mãn
    totalCount:Number,

    // số trang hiện tại 
    currentPage:{
      Type:Number,
      default:1
    }
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

      // được click next trang
      hasNext: false,

      // click lấy dữ liệu trang sau
      hasPre: true,

      // giá trị hiện tại của current page
      currentPagePaging:1

    }
  },
  created(){
    // khởi tạo giá trị items paging
    this.pagingItems= PAGING_ITEMS;
    this.currentPagePaging = this.currentPage;
  },
  watch:{

     /**
     * Author: Phạm Văn Đạt(27/10/2022)
     * Function: lấy giá trị trang hiện tại
     */
    currentPage(value){
      this.currentPagePaging = value;
    },

    /**
     * Author: Phạm Văn Đạt(27/10/2022)
     * Function: theo dõi giá trị hiện trang hiện tại
     */
    currentPagePaging(value){
      if(value ==1){
        // nếu đứng ở trang đầu => được lấy dữ liệu trang sau
        this.hasPre = true;
        this.hasNext = false;
      }else if(value == this.totalPageSize){
        // nếu đứng ở trang cuối => được lấy dữ liệu trang trước
        this.hasPre = false;
        this.hasNext = true;
      }else{
        // nếu đứng ở giữa => được lấy cả 2 bên
        this.hasPre = false;
        this.hasNext = false;
      }
      // gửi dữ liệu trang mới về cho component cha
      this.$emit('currentPage',value);
    },

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
@import url(BasePaging.css)
</style>
