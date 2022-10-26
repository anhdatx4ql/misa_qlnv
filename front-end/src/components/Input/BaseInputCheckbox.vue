<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: Base input checkbox
 -->

<template>
  <div class="checkbox">
    <label class="checkbox-container" :for="id">
      <input type="checkbox" 
        :disabled="disabled" 
        :checked="currentChecked" 
        :value="value" 
        :id="id" 
        style="display:none" 
        @input="$emit('value',!currentChecked), currentChecked=!currentChecked">
      <span class="checkbox-container-icon"></span>
      <span class="checkbox-container-text" v-show="(text != null)?true:false">{{text}}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'BaseInputCheckbox',
  props: {
    // giá trị hiện tại
    value: String,

    // trường text
    text:{
      Type:String,
      default: null
    },

    // id input
    id:String,

    // kiểm tra checked hay chưa
    checked:{
      Type: Boolean,
      default: false
    },

    // ckeck có được click hay không
    disabled:{
      Type: Boolean,
      default: false
    }
  },
  data(){
    return {
      currentChecked: false
    }
  },
  created() {
    this.currentChecked = this.checked;
  },
  watch:{
    /**
     * Author: Phạm Văn Đạt(26/10/2022)
     * Function: Xử lý theo dõi checked của checkbox
     */
    checked(value){
      this.currentChecked = value;
    }
  }
}
</script>

<style scoped>
  @import url(BaseInputCheckbox.css);
</style>
