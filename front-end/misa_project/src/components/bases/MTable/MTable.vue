<template>
 <div class="table-content">

    <div class="table-content-body">
      <table>
        <thead class="t-head">
          <m-input-checkbox value="selectedItem" id="1" ></m-input-checkbox>
        </thead>
        <tbody class="t-body">

        </tbody>
      </table>
    </div>
 </div>
</template>

<script>
export default {
  name: 'MTable',
  props: {
  },
  data(){
    return {
      selectedItem: []
    }
  },
  created(){

  },
  methods: {
    
  },
  computed: {
  
  }
  
}
</script>

<style scoped>
@import url(MTable.css)
</style>
