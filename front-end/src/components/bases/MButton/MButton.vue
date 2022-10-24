<template>
   <button class="button" :value="value" :disabled="disable">
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
@import url(MButton.css)
</style>
