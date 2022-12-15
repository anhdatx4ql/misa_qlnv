<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: Base button
 -->
<template>
  <div class="textarea-container">

   <p v-if="text!=null" class="input-container-field-label">{{text}}</p>

   <textarea @input="changeValueInput" :style="'height: '+height+'px;'" :placeholder="textPlaceholder"></textarea>
 
  </div>
   
</template>

<script>
import _ from "lodash";

export default {
  name: 'BaseTextarea',
  props: {
    // text hiển thị
   text:{
    Type: String,
    default: null
   },

   // nhắc nhở
   textPlaceholder:{
    Type: String,
    default: null
   },

   // chiều cao
   height:{
    Type: Number,
    default: 56
   }

  },
  data(){
    return{
     
    }
  },
  created(){
  },
  methods:{

    /**
     * Author: Phạm Văn Đạt(14/12/2022)
     * Function: Xử lý trả về dữ liệu sau 300ms
     */
     changeValueInput: _.debounce(function (event) {
      try {
        // truyền lại dữ liệu cho cha gọi đến nó
        this.$emit('update:modelValue', event.target?.value?.trim());
        this.$emit('valueChange', true);
        console.log(event.target?.value?.trim())
      } catch (e) {
        console.log(e);
      }
    }, 300),
  }
}
</script>

<style scoped>
@import url(BaseTextarea.css)
</style>
