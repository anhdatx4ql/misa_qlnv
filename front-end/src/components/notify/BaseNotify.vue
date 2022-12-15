<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: THông báo hiển thị giữa trang
 -->
<template>
  <div class="notify" ref="notify" >
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
            classButton="button-white"
            tabindex="3"
            @keydown.tab.prevent="handlerFocus"
            @clickButton="$emit('checkShowNotify', false)"
            text="Hủy"
          >
          </base-button>
          <div>
            <!-- button  -->
            <base-button
              classButton="button-white base-r-8"
              tabindex="2"
              @clickButton="$emit('closeForm', true)"
              text="Không"
            >
            </base-button>

            <base-button
              classButton="btn-pri"
              @clickButton="$emit('sayYes', true)"
              autofocus
              ref="firstFocus"
              tabindex="1"
              text="Có"
            >
            </base-button>
          </div>
        </div>

        <div
          class="notify-question-button"
          v-else-if="type == 'error' ? true : false"
        >
          <!-- button  -->
          <base-button
          listClass="btton-white"
            ref="firstFocus"
            tabindex="1"
            @clickButton="
              $emit('checkShowNotify', false);
              $emit('checkFocusCloseNotify', fieldNameFocus);
            "
            text="Đóng"
          >
          </base-button>
        </div>

        <!-- start type = warning -->
        <div
          class="notify-warning-button"
          v-else-if="type == 'warning' ? true : false"
        >
          <!-- button  -->
          <base-button
          listClass="button-white"
            ref="firstFocus"
            tabindex="1"
            @clickButton="
              $emit('checkShowNotify', false);
              $emit('checkFocusCloseNotify', fieldNameFocus);
            "
            text="Không"
          >
          </base-button>

          <!-- button  -->
          <base-button
            autofocus
            listClass="btn-pri"
            tabindex="1"
            @keydown.tab.prevent="handlerFocus"
            @clickButton="
              $emit('checkShowNotify', false);
              $emit('sayYes', true);
            "
            text="Có"
          >
          </base-button>
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
  },
  watch: {},
  methods: {
    
  },
};
</script>

<style>
@import url(BaseNotify.css);
</style>
