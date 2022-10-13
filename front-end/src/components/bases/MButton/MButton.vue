<template>
 <button class="button">
  <slot></slot>
 </button>
</template>

<script>
export default {
  name: 'MButton',
  props: {
    text:String
  }
}
</script>

<style scoped>
@import url(MButton.css)
</style>
