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
    name: String,
    value:String,
    text:String,
    checked:String,
    id:String
  },
  methods:{
  }
}
</script>

<style>
@import url(MInputRadio.css)
</style>
