<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: Base button
 -->
<template>
  <div
    :style="'height: ' + height + 'px;'"
    class="button-container"
    @click="checkShowDropDown = true"
    :class="listClass"
    v-click-away="handlerClickButton"
  >
    <button
      :style="'height: ' + height + 'px;font-size: ' + frontSize + 'px;'"
      class="button"
      @click="$emit('clickButton')"
      :class="classButton"
      :value="value"
      :disabled="disable"
      @focusout.prevent="handlerFocusForm"
    >
      <span v-if="text">{{ text }}</span>
      <span v-if="classButtonIcon" :class="classButtonIcon"></span>
      <span v-if="iconDropDown" class="background-icon-arrow-bottom"></span>
    </button>

    <div v-if="listDropDown.length > 0" v-show="checkShowDropDown">
      <button
        @click="$emit('clickButtonDropDown', item.name)"
        v-for="item in listDropDown"
        :key="item"
      >
        {{ item.text }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    text: String,

    // giá trị
    value: {
      Type: String,
      default: null,
    },

    // kiểm tra có click được hay không
    disable: {
      Type: Boolean,
      default: false,
    },

    // class button
    listClass: {
      Type: String,
      default: null,
    },

    // drop down button
    listDropDown: {
      Type: Array,
      default: [],
    },

    // icon
    iconDropDown: {
      Type: Boolean,
      default: false,
    },

    // class button muốn thêm vào
    classButton: {
      Type: String,
      default: null,
    },

    // class button icon muốn thêm vào
    classButtonIcon: {
      Type: String,
      default: null,
    },

    // chiều cao button
    height: {
      Type: Number,
      default: 34,
    },

    // kích thước chữ
    frontSize: {
      Type: Number,
      default: 13,
    },
  },
  data() {
    return {
      // check hiển thị drop down
      checkShowDropDown: false,
    };
  },
  created() {},
  mounted() {},
  methods: {

    /**
     * Author: Phạm Văn Đạt(23/12/2022)
     * Function: Xử lý focus out button
     */
    handlerFocusForm(){
      try{
        this.$emit("focusOut");
      }catch(e){
        console.log(e);
      }
    },
    /**
     * Author: Phạm Văn Đạt(11/12/2022)
     * Functioin: kiểm tra click button hiển thị dropdown
     */
    handlerClickButton() {
      try {
        this.checkShowDropDown = false;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
@import url(BaseButton.css);
</style>
