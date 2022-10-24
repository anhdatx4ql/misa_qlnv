<template>
  <div class="radio-container">
    <label :for="id">
      <input
      :id="id" type="radio" 
      :checked="(valueGender == value || checked)?true:false" 
      :name="name" :value="value">
      <span class="radio-focus"></span>
      <span class="radio-text m-l-10">{{text}}</span>
    </label>
   
  </div>
  
</template>

<script>

export default {
  name: 'MInputRadio',
  props: {
    // name của radio
    name: String,

    // giá trị các giới tính có thể có
    value:Number,

    // text hiển thị
    text:String,

    // khởi tạo checked ô radio nếu có
    checked:String,

    // id radio
    id:String,

    // giới tính của khách hàng
    valueGender:Number
  },
  methods:{
  }
}
</script>

<style>
@import url(MInputRadio.css)
</style>
