<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: THông báo hiển thị giữa trang
 -->
<template>
    <div class="tab-content" v-show="selectedTitle === title">
     <slot></slot>
  </div>
</template>

<script>
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 */
 import { inject } from 'vue'

export default {
  name: "BaseTab", 
  inject: ['selectedTitle'],
  props:{
    // title truyền vào
    title:{
      Type: String,
      default:null
    }
  },
  setup() {
    const selectedTitle = inject('selectedTitle')
    return { selectedTitle}
  },
};
</script>

<style>
@import url(BaseTab.css);
</style>
