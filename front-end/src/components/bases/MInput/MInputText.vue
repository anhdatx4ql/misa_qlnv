<template>

 <div class="input-container">

  <div class="input-container-field-label" v-if="(fieldLabel!=null)?true:false">
    <span v-if="tooltip == null">{{fieldLabel}}</span>
    <span v-else v-tooltip="`${tooltip}`">{{fieldLabel}}</span>
    <span v-show="iconRed" style="color:red"> *</span>
  </div>


  <div class="input-container-content" :style="'height: '+height+';width: '+width+'px'">
    <input :type="type" :value="value" :ref="nameRef"
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
  name: 'MInput',
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
    nameRef: {
      Type:String,
      default:null
    },
    tooltip:{
      Type:String,
      default: null
    }
  },
  data(){
    return {
      // khai báo biến chứa chuỗi lỗi
      errorText: null
    }
  },
  created() {

  },
  mounted(){
    if(this.nameRef == "firstFocus"){
      console.log(this.$refs[this.nameRef].focus())
    }
  }
}
</script>

<style>
@import url(MInputText.css)
</style>
