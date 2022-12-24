<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: Base button
 -->
<template>
  <div class="textarea-container">
    <p v-if="text != null" class="input-container-field-label">{{ text }}</p>

    <textarea
      v-model="currentValue"
      :style="'height: ' + height + 'px;'"
      :placeholder="textPlaceholder"
    ></textarea>
  </div>
</template>

<script>

export default {
  name: "BaseTextarea",
  props: {
    // dữ liệu đưa vào
    modelValue: {
      Type: String,
      default: null,
    },

    // text hiển thị
    text: {
      Type: String,
      default: null,
    },

    // nhắc nhở
    textPlaceholder: {
      Type: String,
      default: null,
    },

    // chiều cao
    height: {
      Type: Number,
      default: 56,
    },
  },
  data() {
    return {
      // text hiện tại
      currentValue: null
    };
  },
  created() {
    this.currentValue = this.modelValue;
  },
  methods: {
   
  },
  watch:{
    /**
     * Author: Phạm Văn Đạt(21/12/2022)
     * Function: Theo dõi gán giá trị model value
     * @param {*} value : giá trị text
     */
    modelValue(value){
      try{
        this.currentValue = value;
      }
      catch(e){
        console.log(e)
      }
    },

    /**
     * Author: Phạm Văn Đạt(21/12/2022)
     * Function: truyền dữ liệu vừa nhập ra component cha
     * @param {*} value : giá trị text
     */
    currentValue(value){
      try {
        // truyền lại dữ liệu cho cha gọi đến nó
        this.$emit("update:modelValue", value.trim());
      } catch (e) {
        console.log(e);
      }
    } 
  }
};
</script>

<style scoped>
@import url(BaseTextarea.css);
</style>
