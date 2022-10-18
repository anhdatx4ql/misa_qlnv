<template>
 <div class="table-content">

  <div class="table-container" ref="table">

      <div class="table-header">
        <div class="thead">
          <div class="tr" ref="trThead">

            <div class="th" style="width:40px">
              <m-input-checkbox id="1"></m-input-checkbox>
            </div>

            <div class="th" v-for="field in fields" :key="field.name" :style="'width:'+field.width+'px'">{{field.name}}</div>
          
            <div class="th" style="width:120px">
              CHỨC NĂNG
            </div>
          </div>
        </div>
      </div>
      <div class="table-body">
        <div class="tbody" ref="tbody" @scroll="hanclerScroll">
         <div class="tr">
            <div class="td" style="width:40px">
                <m-input-checkbox style="width:40px" :id="employee"></m-input-checkbox>
            </div>
            <div class="td" v-for="field in fields" :key="field.name" :style="'width:'+field.width+'px'">{{field.name}}</div>

            <div class="td table-function" style="width:120px">
              <m-button ><span>Sửa</span></m-button>
             <m-combobox :listValues="fieldFunction" :icon="false" position="top" :width="120"></m-combobox>
            </div>
          </div>

          <div class="tr">
            <div class="td" style="width:40px">
                <m-input-checkbox style="width:40px" :id="employee"></m-input-checkbox>
            </div>
            <div class="td" v-for="field in fields" :key="field.name" :style="'width:'+field.width+'px'">{{field.name}}</div>
          </div>
          <div class="tr">
            <div class="td" style="width:40px">
                <m-input-checkbox style="width:40px" :id="employee"></m-input-checkbox>
            </div>
            <div class="td" v-for="field in fields" :key="field.name" :style="'width:'+field.width+'px'">{{field.name}}</div>
          </div>
          <div class="tr">
            <div class="td" style="width:40px">
                <m-input-checkbox style="width:40px" :id="employee"></m-input-checkbox>
            </div>
            <div class="td" v-for="field in fields" :key="field.name" :style="'width:'+field.width+'px'">{{field.name}}</div>
          </div>
          <div class="tr">
            <div class="td" style="width:40px">
                <m-input-checkbox style="width:40px" :id="employee"></m-input-checkbox>
            </div>
            <div class="td" v-for="field in fields" :key="field.name" :style="'width:'+field.width+'px'">{{field.name}}</div>
          </div>
         
        </div>
      </div>
    </div>
 </div>
</template>

<script>
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: Lấy danh sách hiển thị các cột trong table
 */
import {TABLE_FIELDS} from "../../../constants"

export default {
  name: 'MTable',
  props: {
  },
  data(){
    return {
      // các trường hiển thị dữ liệu
      fields: [],

      // các chức năng: nhân bản, xóa, nhưng sử dụng
      fieldFunction:[
        {
          id:1,
          name:"Nhân bản"
        },
        {
          id:2,
          name:"Xóa"
        },
        {
          id:3,
          name:"Ngưng sử dụng"
        }
      ]
    }
  },
  created(){
    /**
   * Author: Phạm Văn Đạt(18/10/2022)
   * Function: khởi tạo giá trị field
   */
    this.fields = TABLE_FIELDS;
  },
  methods: {
    /**
     * Author: Phạm Văn Đạt(18/10/2022)
     * Function: Xử lý scroll table
     */
    hanclerScroll(e){
      this.$refs.trThead.style.transform = "translateX(-"+e.target.scrollLeft+"px)";
    }
  },
  mounted(){
    
  }
  
}
</script>

<style scoped>
@import url(MTable.css)
</style>
