<script setup>
import { onMounted, onActivated, onDeactivated } from 'vue'
// 导入particlesjs
import Particles from 'particlesjs'
// 子组件
import userCard from './cmp/user-card.vue'
import userContent from './cmp/user-content.vue'
import useUserStore from '@/stores/user.store'
// 当前路由
import { useRoute } from 'vue-router'
const route = useRoute()
// pinia
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user, moments } = storeToRefs(userStore)
onMounted(() => {
  Particles.init({
    selector: '#bg',
    color: ['#165dff', '#165dff'],
    sizeVariations: 3,
    connectParticles: true,
    minDistance: 100
  })
})

onActivated(() => {
  userStore.getUser(route.params.username)
  userStore.getMoments(10, 0, route.params.username)
  Particles.resumeAnimation()
})
onDeactivated(() => {
  Particles.pauseAnimation()
})
</script>

<template>
  <div class="user-view">
    <div class="user-container">
      <user-card v-if="user" :user="user"></user-card>
      <user-content v-if="moments" :moments="moments"></user-content>
    </div>
    <canvas id="bg"></canvas>
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
  max-width: 1200px;
  margin: 0 auto;
  .user-container {
    margin: 20px 0;
  }
}
</style>
