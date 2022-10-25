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


  <div class="input-container-content" :style="'height: '+height+';width: '+width+'px'">
    <input :type="type" :value="value" ref="input"
    :style="'height: '+height" :placeholder="placeholder"
    :name="name">
    <button class="input-container-content-icon icon-20 icon-mr-10" :class="classIcon"
     v-if="(classIcon == null)?false:true">
  </button>
  </div>
  <div class="input-container-error" v-show="(errorText!=null)?true:false">
    <span>{{errorText}}</span>
  </div>
 </div>
</template>

<script>
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 */
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
    checkFocus: {
      Type:String,
      default:false
    },
    tooltip:{
      Type:String,
      default: null
    }
  },
  data(){
    return {
      // khai báo biến chứa chuỗi lỗi
      errorText: null,

    }
  },
  created() {

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
     * Author: Phạm Văn Đạt(25/10/2022)
     * Function: Focus vào input
     */
    HandlerFocus(){
      this.$refs.input?.focus();
      this.$emit('checkFocus',false);
      console.log(this.$refs.input);
    }
  }
}
</script>

<style>
@import url(BaseInputText.css)
</style>
