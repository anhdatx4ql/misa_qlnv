<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: hiển thị thông báo message 
 -->
<template>
  <div class="toast-message" v-if="listValue.length > 0">
    <div class="toast-message-container">
      <div
        class="toast-message-item"
        :class="type"
        v-for="(item, index) in listValue"
        :key="index"
      >
        <div class="toast-message-item-icon">
          <span v-if="item.type == 'error'" class="error"></span>
          <span v-else-if="item.type == 'success'" class="success"></span>
          <span v-else-if="item.type == 'info'" class="info"></span>
          <span v-else-if="item.type == 'warn'" class="warn"></span>
        </div>
        <div class="toast-message-item-text">
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseToastMessage",
  props: {
    // kiểu hiển thị
    type: {
      Type: String,
      default: "error",
    },

    // nội dung hiển thị
    text: {
      Type: String,
      default: null,
    },
  },
  data() {
    return {
      // mảng chứa các nội dung cần hiển thị gồm: type và text
      listValue: [],
    };
  },
  created() {
    // thêm giá trị vào đầu mảng
    if (this.text != null) {
      this.listValue.push({ type: this.text, text: this.text });
    }

    this.HandlerRemove();
  },
  watch: {
    /**
     * Author: Phạm Văn Đạt(1/11/2022)
     * Function: Xử lý thêm giá trị mới vào đầu mảng
     */
    text(value) {
      try {
        if (value != null) {
          this.listValue.push({ type: this.text, text: value });
          this.$emit("textToastMessage", null);
          this.HandlerRemove();
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  methods: {
    /**
     * Author: Phạm Văn Đạt(1/11/2022)
     * Function: Xử lý xóa dữ liệu của toast message
     */
    HandlerRemove() {
      try {
        let me = this;
        if (this.listValue.length > 0) {
          let interval = setInterval(function () {
            if (me.listValue.length == 0) {
              clearInterval(interval);
            } else {
              me.listValue.pop();  
            }
          }, 5000);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
@import url(BaseToastMessage.css);
</style>
