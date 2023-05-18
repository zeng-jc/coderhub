<script setup>
// 子组件
import rightSection from './cmp/right-section.vue'
import leftSection from './cmp/left-section.vue'
</script>

<template>
  <div class="login-view">
    <div class="loginSection">
      <left-section />
      <right-section />
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-view {
  background-color: var(--theme-bgk1);
  display: flex;
  justify-content: center;
  margin-top: 18vh;
  .loginSection {
    background-color: #fff;
    width: 700px;
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 10px -5px #86909c;
    height: fit-content;
  }
}
</style>
