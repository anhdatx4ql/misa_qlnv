
<!-- 
  Author: Phạm Văn Đạt
  Function: màn hình tiền mặt
 -->

<template>
  
  <div class="cash">
    <div class="cash-header">
      <div class="cash-header-tab">
        <ul>
          <li v-for="item in listCashTab" :key="item.title" :class="( isActive && item.activeClass)">
            <router-link :to="item.route">{{item.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="cash-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { LIST_CASH_TAB } from "../../js/constants.js";
export default {
  name: "TheCash",
  props: {},
  data() {
    return {
      listCashTab: LIST_CASH_TAB,
    };
  },
};
</script>

<style scoped>
@import url(TheCash.css);
</style>
