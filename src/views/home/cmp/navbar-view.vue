<script setup></script>

<template>
  <div class="navbar">
    <a-row class="grid-demo" style="margin-bottom: 16px" align="center">
      <a-col flex="200px" class="left">
        <div
          :style="{
            width: '80px',
            height: '30px',
            borderRadius: '2px',
            background: 'var(--color-fill-3)',
            cursor: 'pointer'
          }"
        />
      </a-col>
      <a-col flex="auto">
        <a-menu mode="horizontal" :default-selected-keys="['1']">
          <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled> </a-menu-item>
          <a-menu-item key="1">Home</a-menu-item>
          <a-menu-item key="2">热门</a-menu-item>
          <a-menu-item key="3">最新</a-menu-item>
          <a-space direction="vertical" size="large" style="margin-left: 50px">
            <a-input :style="{ width: '320px' }" placeholder="请输入搜索内容" allow-clear>
              <template #prefix>
                <icon-search />
              </template>
            </a-input>
          </a-space>
        </a-menu>
      </a-col>
      <a-col flex="200px" class="right">
        <a-avatar class="avatar">Design</a-avatar>
        <icon-notification class="notify" />
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="less">
.navbar {
  .left,
  .right {
    margin-left: 40px;
  }
  .right {
    display: flex;
    margin-right: 40px;
    flex-direction: row-reverse;
    align-items: center;
    .notify {
      margin-right: 15px;
      cursor: pointer;
      font-size: 20px;
    }
    .avatar {
      background-color: #00d0b6;
      cursor: pointer;
    }
  }
}
</style>
