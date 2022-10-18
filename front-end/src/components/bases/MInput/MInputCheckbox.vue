<template>
  <div class="checkbox">
    <label class="checkbox-container" :for="id">
      <input type="checkbox" :value="value" :id="id" style="display:none" @input="$emit('update:value',$event.target.value)">
      <span class="checkbox-container-icon"></span>
      <span class="checkbox-container-text" v-show="(text != null)?true:false">{{text}}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'MInputCheckbox',
  props: {
    value: String,
    text:{
      Type:String,
      default: null
    },
    id:String
  },
  created() {
  },
  methods: {
  }
}
</script>

<style scoped>
  @import url(MInputCheckbox.css);
</style>
