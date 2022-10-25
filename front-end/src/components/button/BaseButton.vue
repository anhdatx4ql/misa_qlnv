<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: Base button
 -->
<template>
   <button class="button" :value="value" :disabled="disable">
      <slot></slot>
    </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    text:String,
    value:{
      Type:String,
      default:null
    },
    disable:{
      Type:Boolean,
      default: false
    }
  },
  mounted(){
  }
}
</script>

<style scoped>
@import url(BaseButton.css)
</style>
