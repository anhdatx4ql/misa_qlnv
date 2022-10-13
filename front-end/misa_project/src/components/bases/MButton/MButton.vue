<template>
 <button class="button">
  <slot></slot>
 </button>
</template>

<script>
export default {
  name: 'MButton',
  props: {
  }
}
</script>

<style scoped>
@import url(MButton.css)
</style>
