<script setup>
import '@arco-design/web-vue/es/message/style/css.js'
// import { Message } from '@arco-design/web-vue'
import sidebarView from './cmp/sidebar-view.vue'
import contentView from './cmp/content-view.vue'
import userinfoView from './cmp/userinfo-view.vue'
import useHomeStore from '@/stores/home.store'
import { storeToRefs } from 'pinia'
const homeStore = useHomeStore()
homeStore.getMomentList(15, 0)
const { moments } = storeToRefs(homeStore)
</script>

<template>
  <div class="home">
    <div class="home-container">
      <sidebar-view />
      <content-view :moments="moments" />
      <userinfo-view />
    </div>
  </div>
</template>

<style lang="less" scoped>
.home {
  background-color: var(--theme-bgk2);
  .home-container {
    max-width: 1200px;
    padding: 20px 0;
    margin: 0 auto;
    display: flex;
  }
}
</style>
