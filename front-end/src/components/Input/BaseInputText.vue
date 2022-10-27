<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: Base input field
 -->
<template>

 <div class="input-container">

  <div class="input-container-field-label" v-if="(fieldLabel!=null)?true:false">
    <span v-if="tooltip == null">{{fieldLabel}}</span>
    <span v-else v-tooltip="`${tooltip}`">{{fieldLabel}}</span>
    <span v-show="iconRed" style="color:red"> *</span>
  </div>


  <div class="input-container-content" 
  :class="{'input-container-content-error':(errorText!=null)}" :style="'height: '+height+';width: '+width+'px'">
    <input :type="type" :value="currentValue" ref="input"
    :style="'height: '+height" :placeholder="placeholder"
    :name="name"
    @focusout="HandlerValidate" 
    @input.prevent="HandlerInput"
    >
    <button class="input-container-content-icon icon-20 icon-mr-10" :class="classIcon"
     v-if="(classIcon == null)?false:true">
  </button>
     <!-- start hiển thị lỗi nếu có -->
  <div class="input-container-error" v-show="(errorText!=null)?true:false">
      <div></div>
      <div><span>{{errorText}}</span></div>
    </div>
    <!-- end hiển thị lỗi nếu có -->
  </div>
 
 </div>
</template>

<script>
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 */

 // import thư viện này dùng để nhóm nhiều hành động giống 
 // nhau trong thời gian đang xử lý thành 1 hành động cuối cùng
 import _ from 'lodash'

 import {NOTIFY_TEXT} from '../../constants'
export default {
  name: 'BaseInput',
 
  props: {
    // field hiển thị
    fieldLabel:String,

    // kiểu input
    type: String,

    // giá trị truyền vào
    value:{
      Type: String,
      default: ""
    },

    // icon nếu có
    classIcon:{
      Type:String,
      default:null
    },

    // chiều cao
    height:{
      Type:String,
      default:"32px"
    },

    // nhắc nhở nhập
    placeholder:String,

    // kích thước
    width:{
      Type:Number,
      default:240
    },

    // tên input
    name:{
      Type:String,
      default:null
    },

    // icon sao nếu required
    iconRed:{
      Type:Boolean,
      default:false
    },

    // check focus input
    checkFocus: {
      Type:String,
      default:false
    },

    // text hiển thị tooltip
    tooltip:{
      Type:String,
      default: null
    },

    // check null giá trị
    isRequired:{
      Type:Boolean,
      default: false
    }
  },
  data(){
    return {
      // khai báo biến chứa chuỗi lỗi
      errorText: null,

      // giá trị input hiện tại
      currentValue: null
    }
  },
  created() {
    this.currentValue = this.value;
  },
  mounted(){
    /**
     * Author: Phạm Văn Đạt(25/10/2022)
     * Function: Focus nếu nameRef là first Focus
     */
    if(this.checkFocus == true){
      this.HandlerFocus();
    }
  },
  watch:{

    /**
     * Author: Phạm Văn Đạt(25/10/2022)
     * Function: Xử lý focus input
     */
    checkFocus(value){
      if(value == true){
        this.HandlerFocus();
      }
    },
    
  },
  methods:{
    /**
     * Author: Phạm Văn Đạt(26/10/2022)
     * Function: Xử lý lấy dữ liệu khi input nhận thay đổi với debounce dùng để nhóm nhiều hành động thành 1 hành động 
     * @param {} event 
     */
     HandlerInput(event){
      // validate dữ liệu khi thay đổi giá trị input
      this.currentValue = event.target.value;

      // gọi đến hàm xử lý validate
      this.HandlerValidate(event);

      // nhóm 1 nhiều hành động giống nhau thành 1 hành dodojngj cụ thể. Xử lý trả về dữ liệu sau 1s. 
      //Ứng dụng cụ thể vào input tìm kiếm khách hàng
      this.HandlerChangeValueInput(event);
     },
     
     /**
      * Author: Phạm Văn Đạt(27/10/2022)
      * Function: Xử lý trả về dữ liệu sau 1s
      */
     HandlerChangeValueInput:_.debounce(function (event) { 

      // truyền lại dữ liệu cho cha gọi đến nó
      this.$emit('value',event.target.value);

      console.log("chạy vào đây")
      }, 500), 
    
    /**
     * Author: Phạm Văn Đạt(25/10/2022)
     * Function: Focus vào input
     */
    HandlerFocus(){
      this.$refs.input?.focus();
      this.$emit('checkFocus',false);
      console.log(this.$refs.input);
    },

    /**
     * Author: Phạm Văn Đạt(27/10/2022)
     * Function: Focus out input kiểm tra check null
     */
    HandlerValidate(event){
    // nếu tồn tại isRequired thì xử lý validate required
      if(this.isRequired == true){
        if(!event.target.value){
          this.errorText = NOTIFY_TEXT.requiredField(this.fieldLabel);
          console.log(this.errorText)
          // xử lý cập nhật thông báo lỗi đến cha 
        }else{
          this.errorText = null;
           // xử lý cập nhật thông báo lỗi đến cha 
        }
      }
     
    }
  }
}
</script>

<style>
@import url(BaseInputText.css)
</style>
