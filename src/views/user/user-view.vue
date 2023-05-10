<script setup>
// import { onMounted } from 'vue'
// 导入particlesjs
// import Particles from 'particlesjs'
// 子组件
import userCard from './cmp/user-card.vue'
import userContent from './cmp/user-content.vue'
import useUserStore from '@/stores/user.store'
// 当前路由
import { useRoute } from 'vue-router'
const route = useRoute()
// pinia
import { storeToRefs } from 'pinia'
// arco-design
import { Message } from '@arco-design/web-vue'

const userStore = useUserStore()
userStore.getUser(route.params.username)
userStore.getMoments(10, 0, route.params.username)
const { user, moments } = storeToRefs(userStore)
const createMomentHandler = async (payload) => {
  const res = await userStore.createMoment(payload)
  if (!res) return Message.error('动态发布失败')
  Message.success('动态发布成功')
  userStore.getMoments(10, 0, route.params.username)
}
// Particles.resumeAnimation()
// onMounted(() => {
//   Particles.init({
//     selector: '#bg',
//     color: ['#165dff', '#165dff'],
//     sizeVariations: 3,
//     connectParticles: true,
//     minDistance: 100
//   })
//   // Particles.pauseAnimation()
// })
</script>

<template>
  <div class="user-view">
    <div class="user-container">
      <user-card v-if="user" :user="user"></user-card>
      <user-content
        v-if="moments"
        :moments="moments"
        @createMoment="createMomentHandler"
      ></user-content>
    </div>
    <!-- <canvas id="bg"></canvas> -->
  </div>
</template>

<style lang="less" scoped>
#bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -2;
  background-color: var(--theme-bg2);
}
.user-view {
  background-color: var(--theme-bg2);
  min-height: calc(100vh - 58px);
  padding: 20px 0;
  .user-container {
    margin: 0 auto;
    max-width: 1200px;
  }
}
</style>
