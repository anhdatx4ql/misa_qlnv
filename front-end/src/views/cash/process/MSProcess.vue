
<!-- 
  Author: Phạm Văn Đạt
  Function: màn hình tiền mặt
 -->

<template>
  <div class="process">
    <div class="process-left">
      <div class="process-left-content">
        <div class="process-left-content-header process-title">
          <p>NGHIỆP VỤ TIỀN MẶT</p>
        </div>
        <div class="process-left-content-center">
          <div class="process-left-content-center-img">
            <div class="receive">
              <span>Thu tiền</span>
            </div>
            <div class="audit">
              <span>Kiểm kê quỹ</span>
            </div>
            <div class="payment">
              <span>Chi tiền</span>
            </div>
          </div>
        </div>
        <div class="process-left-bottom">
          <router-link
            v-for="item in listMenuProcessBottom"
            :key="item.title"
            :to="item.route"
          >
            <span :class="item.class"></span>
            <span>{{ item.title }}</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="process-right">
      <div class="process-right-header process-title">
        <p>Báo cáo</p>
      </div>
      <div class="process-right-content">
        <ul>
          <li v-for="item in listReportProcess" :key="item.title">
            {{ item.title }}
          </li>
        </ul>
      </div>
      <div class="process-right-bottom">Tất cả báo cáo</div>
    </div>
  </div>
</template>

<script>
import {
  LIST_REPORTS_PROCESS,
  LIST_MENU_PROCESS_BOTTOM,
} from "../../../js/constants";

export default {
  name: "MSProcess",
  props: {},
  data() {
    return {
      listReportProcess: LIST_REPORTS_PROCESS,
      listMenuProcessBottom: LIST_MENU_PROCESS_BOTTOM,
    };
  },
};
</script>

<style scoped>
@import url(MSProcess.css);
</style>
