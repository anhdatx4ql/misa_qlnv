<template>
 <button class="button" :value="value">
  <slot></slot>
 </button>
</template>

<script>
export default {
  name: 'MButton',
  props: {
    text:String,
    value:{
      Type:String,
      default:null
    }
  }
}
</script>

<style scoped>
@import url(MButton.css)
</style>
