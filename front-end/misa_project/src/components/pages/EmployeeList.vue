<template>
    <m-button>Thêm mới dữ liệu</m-button>
    <m-input-text type="text" fieldLabel="Tên nhân viên"></m-input-text>
    <m-input-text type="text" fieldLabel="Tên nhân viên" classIcon="input-icon-search"></m-input-text>
    <m-input-checkbox text="Là nhà cung cấp"></m-input-checkbox>
    <m-table></m-table>
</template>
   
<script>
export default {
    name: 'EmployeeList',
    props: {
    }
}
</script>
   
<style scoped>
   
</style>
   