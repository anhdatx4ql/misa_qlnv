<template>
 <div class="table-content">

  <table>
    <!-- start header table -->
    <thead>
      <tr>
        <th class="position-sticky fake-cloumn" style="width:20px;left:0"></th>
        <th class="position-sticky" style="left:20px;background:#E5E8EC">
          <m-input-checkbox id="1"></m-input-checkbox>
        </th>
        <th v-for="field in fields" :key="field.name" :class="field.class" :style="'width:'+field.width+'px'">
          {{field.name}}
        </th>
        <th style="width:120px;" class="table-function">
          CHỨC NĂNG
        </th>
        <th class="position-sticky fake-cloumn" style="width:30px;right:0"></th>
        <th class="position-sticky fake-cloumn r-30 background-container" style="width:30px;right:-30px"></th>
      </tr>
    </thead>
    <!-- end header table -->

    <!-- start body table -->
    <tbody>
      <tr v-for="data in listData" :key="data.id">
        <td class="position-sticky fake-cloumn" style="width:20px;left:0"></td>
        <td style="width:40px;left:20px" class="position-sticky">
          <m-input-checkbox style="width:40px" :id="data.id" :value="data.id"></m-input-checkbox>
        </td>
        <td v-for="field in fields" :key="field.fieldName" :style="'width:'+field.width+'px'" :class="field.class">
          <!-- start hiển thị ô checkbox -->
          <div v-if="field.checkBox == true">
            <m-input-checkbox 
              :id="data.id"
              :value="data.id"
              :checked="data[field.fieldName]"
              :disabled="true">
            </m-input-checkbox>
          </div>
          <!-- end hiển thị ô checkbox -->

          <!-- start hiển thị các dữ liệu còn lại -->
          <div v-else>
            {{
              (data[field.fieldName] || data[field.fieldName] == 0)
              ?(field.formatDate?field.formatDate(data[field.fieldName])
                :(field.formatGender?field.formatGender(data[field.fieldName]):data[field.fieldName]) )
              :""
            }}
          </div>
          <!-- end hiển thị các dữ liệu còn lại -->

        </td>
        <td class="td table-function" style="width:120px">
          <m-button @click="handlerDetailEmployee(data)"><span>Sửa</span></m-button>
          <m-combobox :listValues="fieldFunction" :icon="false" position="top" :width="120">
          </m-combobox>         
        </td>
        <th class="position-sticky fake-cloumn" style="width:30px;right:0"></th>
        <td class="position-sticky fake-cloumn r-30 background-container" style="width:30px;right:-30px;"></td>
      </tr>
    </tbody>
    <!-- end body table -->

  </table>
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
    listEmployees: Array[Object]
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
      ],

      // danh sách các bản ghi hiện tại
      listData:[]
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
    },

    /**
     * Author: Phạm Văn Đạt(22/10/2022)
     * Function: Xử lý khi click nút sửa
     */
    handlerDetailEmployee(data){
      console.log(data)
      this.$emit('employeeDetail',data);
      this.$emit('checkShowForm',true);
    }
  },
  watch:{
    /**
     * Author: Phạm Văn Đạt(21/10/2022)
     * Function: Load danh sách các bản ghi
     * @param {*} value danh sách các bản ghi
     */
    listEmployees(value){
      this.listData = value;
    },

    /**
     * Author: Phạm Văn Đạt(21/10/2022)
     * FUnction: Xử lý theo dõi dữ liệu
     */
     listData(value){
      if(!value){
        console.log("không có dữ liệu!");
      }
    }
  }

  
}
</script>

<style scoped>
@import url(MTable.css)
</style>
