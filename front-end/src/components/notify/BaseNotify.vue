<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: THông báo hiển thị giữa trang
 -->
<template>
  <div class="notify">
    <div class="notify-content" ref="notify">
      <div class="notify-content-title" :class="type">
        <div class="notify-content-title-icon background-icon w-h-48"></div>
        <div class="notify-content-title-text">{{ text }}</div>
      </div>
      <div class="notify-content-button">
        <div
          class="notify-question-button"
          v-if="type == 'question' ? true : false"
          style="justify-content: space-between"
        >
          <!-- button hủy -->
          <base-button
            class="button-white"
            tabindex="3"
            @keydown.tab.prevent="handlerFocus"
            @click="$emit('checkShowNotify', false)"
          >
            <span>Hủy</span>
          </base-button>
          <div>
            <!-- button  -->
            <base-button
              class="button-white base-r-8"
              tabindex="2"
              @click="$emit('closeForm', true)"
            >
              <span>Không</span>
            </base-button>

            <button
              class="button"
              @click="$emit('sayYes', true)"
              autofocus
              ref="firstFocus"
              tabindex="1"
            >
              <span>Có</span>
            </button>
          </div>
        </div>

        <div
          class="notify-question-button"
          v-else-if="type == 'error' ? true : false"
        >
          <!-- button  -->
          <button
            class="button"
            autofocus
            ref="firstFocus"
            tabindex="1"
            @click="
              $emit('checkShowNotify', false);
              $emit('checkFocusCloseNotify', fieldNameFocus);
            "
          >
            <span>Đóng</span>
          </button>
        </div>

        <!-- start type = warning -->
        <div
          class="notify-warning-button"
          v-else-if="type == 'warning' ? true : false"
        >
          <!-- button  -->
          <button
            autofocus
            class="button-white"
            ref="firstFocus"
            tabindex="1"
            @click="
              $emit('checkShowNotify', false);
              $emit('checkFocusCloseNotify', fieldNameFocus);
            "
          >
            <span>Không</span>
          </button>

          <!-- button  -->
          <button
            class="button"
            tabindex="2"
            @keydown.tab.prevent="handlerFocus"
            @click="
              $emit('checkShowNotify', false);
              $emit('sayYes', true);
            "
          >
            <span>Có</span>
          </button>
        </div>
        <!-- end type = warning -->
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 */
export default {
  name: "BaseNotify",
  props: {
    // kiểu thông báo
    type: String,

    // text thông báo
    text: String,

    // lưu lại focus sau khi tắt form
    fieldNameFocus: String,
  },
  created() {},
  mounted() {
    this.handlerFocus();
  },
  watch: {},
  methods: {
    /**
     * Author: Phạm Văn Đạt
     * Function: xử lý focus button khi hiển thị notify
     */
    handlerFocus() {
      this.$refs.firstFocus.focus();
    },
  },
};
</script>

<style>
@import url(BaseNotify.css);
</style>
