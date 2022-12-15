<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: THông báo hiển thị giữa trang
 -->
<template>
  <div>
    <div class="tabs">
      <ul>
        <li
          v-for="(tabTitle, index) in tabsTitle"
          :key="index"
          :class="{ 'is-active': selectedTitle === tabTitle }"
          @click.prevent="selectedTitle = tabTitle"
        >
          {{ tabTitle }}
        </li>
      </ul>
    </div>

    <slot></slot>
  </div>
</template>

<script>
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 */
 import {ref,useSlots,provide} from 'vue'

export default {
  name: "BaseTabs",
  setup() {

    // truyền ref vào để sử dụng như key-value = map()

    // nhúng useSlots để sử dụng slots <=> $slot
    const slots = useSlots();

    // lấy ra các thuộc tính trong v-slot truyền vào từ component con
    console.log(slots.default())
    const tabsTitle = ref(slots.default().map(tab => tab.props.title));

    // tab select
    const selectedTitle = ref(tabsTitle.value[0]);

    // tạo 
    provide('selectedTitle', selectedTitle)
    return {tabsTitle, selectedTitle}
  }
};
</script>

<style>
@import url(BaseTabs.css);
</style>
