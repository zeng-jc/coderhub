<script setup>
import '@arco-design/web-vue/es/message/style/css.js'
// import { Message } from '@arco-design/web-vue'
import navbarView from '@/components/navbar/navbar-view.vue'
import sidebarView from './cmp/sidebar-view.vue'
import contentView from './cmp/content-view.vue'
import userinfoView from './cmp/userinfo-view.vue'
</script>

<template>
  <div class="home">
    <navbar-view />
    <div class="main-container">
      <sidebar-view />
      <content-view />
      <userinfo-view />
    </div>
  </div>
</template>

<style lang="less" scoped>
.home {
  background-color: var(--theme-bgk2);
  height: 100%;
  .main-container {
    max-width: 1200px;
    margin: auto;
    display: flex;
  }
}
</style>
