<script setup></script>

<template>
  <div class="edit-user">
    <div class="edit-user-container">
      <div class="edit-user-content"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.edit-user {
  background-color: var(--theme-bg2);
  min-height: calc(100vh - 58px);
  .edit-user-container {
    max-width: 1200px;
    padding: 20px 0;
    margin: 0 auto;
    .edit-user-content {
      background-color: #fff;
      min-height: calc(100vh - 98px);
    }
  }
}
</style>
