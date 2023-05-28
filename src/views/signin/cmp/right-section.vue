<script setup></script>

<template>
  <div class="right-section">
    <div class="circle"></div>
  </div>
</template>

<style lang="less" scoped>
.right-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7f9;
  .circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: rgb(var(--primary-6));
    position: relative;
    &::after {
      content: '';
      width: 180px;
      height: 85px;
      background-color: transparent;
      backdrop-filter: blur(8px);
      position: absolute;
      top: 50%;
      right: 50%;
      transform: translateX(50%);
    }
  }
}
</style>
