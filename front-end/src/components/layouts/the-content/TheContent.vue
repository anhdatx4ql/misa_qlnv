<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'TheContent',
  props: {
    msg: String
  }
}
</script>

<style scoped>
  @import url(TheContent.css);
</style>
