<script setup>
import { ref } from 'vue'
import '@arco-design/web-vue/es/message/style/css.js'
// import { Message } from '@arco-design/web-vue'
import sidebarView from './cmp/sidebar-view.vue'
import contentView from './cmp/content-view.vue'
import userlistView from './cmp/userlist-view.vue'
import useHomeStore from '@/stores/home.store'
import { storeToRefs } from 'pinia'
const homeStore = useHomeStore()
homeStore.getUserList(5, 0)
const { moments } = storeToRefs(homeStore)
// 控制loading的显示和隐藏
const isShowLoading = ref(true)
const loadMomentHandler = async (payload) => {
  const res = await homeStore.getMomentList(payload.count)
  // 当res为false表示所有数据都查询出来了，此时要关闭观察器，并隐藏loading
  if (res === false) {
    payload.observer.disconnect()
    isShowLoading.value = false
  }
}
</script>

<template>
  <div class="home">
    <div class="home-container">
      <sidebar-view />
      <content-view
        :moments="moments"
        :isShowLoading="isShowLoading"
        @loadMoment="loadMomentHandler"
      />
      <userlist-view :users="homeStore.users" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.home {
  background-color: var(--theme-bg2);
  min-height: calc(100vh - 58px);
  .home-container {
    max-width: 1200px;
    padding: 20px 0;
    margin: 0 auto;
    display: flex;
  }
}
</style>
