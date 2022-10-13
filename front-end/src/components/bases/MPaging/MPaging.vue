<template>
 <div class="paging">
    <div class="paging-left">
      <p class="paging-left-text">Tổng số <b>32</b> bản ghi</p>
    </div>
    <div class="paging-right">
      <div class="paging-right-combobox"> combobox nè</div>
      <div class="paging-right-button">
        <button class="paging-right-pre paging-disable" style="margin-right:13px;">Trước</button>
        <div class="paging-right-index">
          <button class="paging-right-index-child active">1</button>
          <button class="paging-right-index-child">2</button>
          <button class="paging-right-index-child">3</button>
        </div>
        <button class="paging-right-next"  style="margin-left:13px;">Sau</button>
      </div>
    </div>
 </div>
</template>

<script>
export default {
  name: 'MPaging',
  props: {
    text:String
  }
}
</script>

<style scoped>
@import url(MPaging.css)
</style>
