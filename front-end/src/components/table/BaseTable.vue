 <!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: base table hiển thị thông tin
  -->
<template>

 <div class="table-content">
  <table>
    <!-- start header table -->
    <thead>
      <tr>
     
        <th v-for="field in fieldsTHead" :key="field.fieldName" :class="field.class" :style="'width:'+field.width+'px;'+field.style">
          <div v-if="field.type=='checkbox'">
            <base-input-checkbox :id="idCheckbox"></base-input-checkbox>
          </div>
          <div v-else-if="!field.title">
            {{field.name}}
          </div>

          <el-tooltip v-else :content="field.title" effect="light" placement="bottom">
            {{field.name}}
          </el-tooltip>
        </th>
      
      </tr>
    </thead>
    <!-- end header table -->

    <!-- start body table -->
    <tbody v-show="!currentShowFormLoad">
      <tr v-for="data in listData" :key="data.id" @dblclick="handlerUpdate(data)">
      
        <td class="table-hover" v-for="field in fieldsTHead" :key="field.fieldName" :style="'width:'+field.width+'px;'+field.style" :class="field.class">
          
          <base-button v-if="field.button == 'Sửa'" @click="handlerUpdate(data)"><span>{{field.button}}</span></base-button>
          <base-combobox v-if="!!field.combobox"
           :listValues="field.combobox" 
           :input="field.inputCombobox"
           :icon="field.iconCombobox" :position="field.positionCombobox" 
           :width="120"
           @newValueId="handlerFunctionTable($event,data)"
           >
          </base-combobox> 

          <!-- hiển thị checkbox có thể sửa -->
          <!-- start hiển thị ô checkbox không thể sửa -->
          <div v-if="field.checkBox == true">
            <base-input-checkbox 
              :value="data.id"
              :checked="data[field.fieldName]"
              :disabled="field.disabled">
            </base-input-checkbox>
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

        </td>
      </tr>
    </tbody>
    <!-- end body table -->

  </table>

  <div v-show="currentShowFormLoad" class="loading">
    <div>
      <div class="spiner"></div>
      <div>
        Đang lấy dữ liệu
      </div>
    </div>
  </div>

</div>
</template>

<script>


export default {
  name: 'BaseTable',
  props: {
    // DỮ LIỆU HIỂN THỊ
    modelValue: Array[Object],

    // KIỂM TRA LOAD DỮ LIỆU
    showFormLoad:{
      Type:Boolean,
      default:true
    },

    // CÁC TRƯỜNG TRÊN HEADER
    fieldsTHead: Array[Object]
  },
  data(){
    return {
      // kiểm tra đang 
      currentShowFormLoad: false,

      // mảng lưu dữ liệu
      listData: Array[Object]
    }
  },
  created(){

    this.currentShowFormLoad = this.showFormLoad;

    console.log(this.modelValue)

  },
  methods: {

    /**
     * Author: Phạm Văn Đạt(03/11/2022)
     * Function: Xuywr lý xóa, nhân bản, ngưng sử dụng
     * @param {} value : giá trị xử lý nhân bản, xóa, ngưng sử dụng
     */
    async handlerFunctionTable(value,data){
      try{
        if(data.id != null){
          // đưa ra chức năng cần xử lý của table: Nhân bản, Xóa, Sửa
          this.$emit('functionTable',{value:value, data: data});

          // nếu là xóa thì hiển thị thông báo xem có được xóa không

        }
       
      }catch(e){
        console.log(e);
      }
    },
    /**
     * Author: Phạm Văn Đạt(22/10/2022)
     * Function: Xử lý khi click nút sửa
     */
    handlerUpdate(data){
      this.$emit('dataDetail',data);
      this.$emit('checkShowForm',true);
    },
  },
  watch:{

    /**
     * Author: Phạm Văn Đạt(08/11/2022)
     * Function: Xử lý lấy dữ liệu mới
     * @param {*} value : mảng data gửi vào
     */
    modelValue(value){
      this.listData = value;
    },

    /**
     * Author: Phạm Văn Đạt(28/10/2022)
     * Function: Xử lý hiển thị load dữ liệu
     */
    showFormLoad(value){
    
      this.currentShowFormLoad = value;

    }
  }

  
}
</script>

<style scoped>
@import url(BaseTable.css)
</style>
