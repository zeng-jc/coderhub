<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const avatarClick = () => {
  console.log('----------s')
  router.push('/login')
}
</script>

<template>
  <div class="navbar">
    <a-row class="grid-demo" style="margin-bottom: 16px" align="center">
      <a-col :flex="2" class="left">
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
      <a-col :flex="9" class="center">
        <a-menu mode="horizontal" :default-selected-keys="['1']">
          <a-menu-item key="1">Home</a-menu-item>
          <a-menu-item key="2">热门</a-menu-item>
          <a-menu-item key="3">最新</a-menu-item>
          <a-menu-item key="4">动态</a-menu-item>
          <a-menu-item key="5">文章</a-menu-item>
          <a-menu-item key="6">资源</a-menu-item>
        </a-menu>
        <a-input placeholder="请输入搜索内容" allow-clear :style="{ width: '300px' }">
          <template #prefix>
            <icon-search />
          </template>
        </a-input>
      </a-col>
      <a-col :flex="2" class="right">
        <a-avatar class="avatar" @click="avatarClick">Design</a-avatar>
        <icon-notification class="notify" />
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="less">
.navbar {
  background-color: var(--theme-bgk1);
  .left,
  .right {
    margin-left: 40px;
  }
  .center {
    display: flex;
    align-items: center;
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
