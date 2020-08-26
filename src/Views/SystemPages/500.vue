<template>
   <el-row class="error-layout">
      <el-row>
         <i class="error-icon" type="icon-500"></i>
      </el-row>
      <el-row class="error-code">
         <b>500</b>
      </el-row>
      <el-row class="error-message">
         抱歉，服务器发生错误！
      </el-row>
   </el-row>
</template>

<script>
export default {}
</script>

<style lang="less">
.error-layout {
   padding-top: 50px;
   text-align: center;
   .error-icon {
      font-size: 300px;
   }
   .error-code {
      margin-top: 20px;
      font-size: 22px;
      line-height: 28px;
   }
   .error-message {
      margin-top: 20px;
      font-size: 16px;
      line-height: 28px;
   }
}
</style>
