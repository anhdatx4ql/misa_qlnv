<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: Base input radio
 -->

<template>
  <div class="radio-container">
    <label :for="id" @click="$emit('update:modelValue',value)">
      <input
      :id="id" type="radio" 
      :checked="(modelValue == value || checked)?true:false" 
      :name="name" :value="value">
      <span class="radio-focus"></span>
      <span class="radio-text m-l-10">{{text}}</span>
    </label>
   
  </div>
  
</template>

<script>

export default {
  name: 'BaseInputRadio',
  props: {
    // name của radio
    name: String,

    // giá trị các giới tính có thể có
    value:Number,

    // text hiển thị
    text:String,

    // khởi tạo checked ô radio nếu có
    checked:Boolean,

    // id radio
    id:String,

    // giới tính của khách hàng
    modelValue:Number
  },
  methods:{
  }
}
</script>

<style>
@import url(BaseInputRadio.css)
</style>
