<script setup>
import '@arco-design/web-vue/es/message/style/css.js'
// import { Message } from '@arco-design/web-vue'
import navbarView from './cmp/navbar-view.vue'
import sidebarView from './cmp/sidebar-view.vue'
import contentView from './cmp/content-view.vue'
import userinfoView from './cmp/userinfo-view.vue'
</script>

<template>
  <a-layout>
    <a-layout-header class="nav-bar">
      <navbar-view />
    </a-layout-header>
    <a-layout class="content">
      <a-layout-sider>
        <sidebar-view />
      </a-layout-sider>
      <content-view />
      <userinfo-view></userinfo-view>
    </a-layout>
  </a-layout>
</template>

<style>
.content {
  background-color: var(--home-bgk);
  height: 100%;
  padding: 30px 45px;
}
</style>
