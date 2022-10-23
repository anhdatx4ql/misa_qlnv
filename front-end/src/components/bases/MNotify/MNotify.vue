<template>
 <div class="notify">
    <div class="notify-content" ref="notify">
      <div class="notify-content-title" :class="type">
        <div class="notify-content-title-icon background-icon w-h-48"></div>
        <div class="notify-content-title-text">{{text}}</div>
      </div>
      <div class="notify-content-button">
        <div class="notify-question-button" v-if="(type=='question')?true:false" 
        style="justify-content: space-between;">
            <!-- button hủy -->
          <m-button class="button-white" tabindex="3" @click="$emit('checkShowNotify',false)">
            <span>Hủy</span>
          </m-button>
          <div> 
             <!-- button  -->
            <m-button class="button-white m-r-8" tabindex="2" @click="$emit('closeForm',false)">
              <span>Không</span>
            </m-button>

            <button class="button" autofocus ref="firstFocus" tabindex="1">
              <span>Có</span>
            </button>
          </div>
        
        </div>
      
        <div class="notify-question-button" v-if="(type=='error')?true:false">
          <!-- button  -->
         <button v-if="(type=='error')?true:false" class="button" autofocus ref="firstFocus" tabindex="1">
            <span>Đóng</span>
          </button>
        </div>
         

      </div>
    </div>
 </div>
</template>

<script>
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 */
export default {
  name: 'MNotify',
  props: {
    type:String,
    text:String
  },
  created(){
  },
  mounted(){
    /**
     * Author: Phạm Văn Đạt
     * Function: xử lý focus khi hiển thị notify
     */
    this.$refs.firstFocus.focus();
  }
}
</script>

<style>
@import url(MNotify.css);
</style>
