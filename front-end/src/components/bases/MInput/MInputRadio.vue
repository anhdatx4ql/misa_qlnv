<template>
  <div class="radio-container">
    <input :id="id" type="radio" :checked="checked" :name="name" :value="value">
    <label :for="id" class="radio-content-label">
      <span class="radio-content-label-box">
        <div class="radio-content-label-point"></div>
      </span>
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

    // giá trị 
    value:String,

    // text hiển thị
    text:String,

    // khởi tạo checked ô radio nếu có
    checked:String,

    // id radio
    id:String
  },
  methods:{
  }
}
</script>

<style>
@import url(MInputRadio.css)
</style>
