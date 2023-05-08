<script setup>
// 导入particlesjs
import Particles from 'particlesjs'
import { onMounted, onActivated, onDeactivated, ref } from 'vue'
import useUserStore from '@/stores/user.store'
const userStore = useUserStore()
console.log(userStore.user)

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
  Particles.resumeAnimation()
})
onDeactivated(() => {
  Particles.pauseAnimation()
})

const data = ref([
  {
    label: 'Name',
    value: 'Socrates'
  },
  {
    label: 'Mobile',
    value: '123-1234-1234'
  },
  {
    label: 'Residence',
    value: 'Beijing'
  },
  {
    label: 'Hometown',
    value: 'Beijing'
  },
  {
    label: 'Address',
    value: 'Yingdu Building, Zhichun Road, Beijing'
  }
])
</script>

<template>
  <div class="user-view">
    <div class="user-container">
      <div class="user-card">
        <a-avatar class="avatar" :style="{ backgroundColor: '#14a9f8' }" :size="100">Arco</a-avatar>
        <a-descriptions :data="data" title="User Info" :column="{ xs: 1, md: 3, lg: 4 }">
          <a-descriptions-item v-for="(item, index) of data" :label="item.label" :key="index">
            <a-tag>{{ item.value }}</a-tag>
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </div>
    <canvas id="bg"></canvas>
  </div>
</template>

<style lang="less" scoped>
#bg {
  position: fixed;
  top: 58px;
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
    .user-card {
      display: flex;
      height: 200px;
      background-color: var(--color-bg-1);
      padding: 20px;
      .avatar {
        margin-right: 40px;
      }
    }
  }
}
</style>
