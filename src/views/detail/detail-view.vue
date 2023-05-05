<script setup>
import { useRoute } from 'vue-router'
import useDtailStore from '../../stores/detail.store'
import { storeToRefs } from 'pinia'
import detailContent from './cmp/detail-content.vue'
import detailSidebar from './cmp/detail-sidebar.vue'

const route = useRoute()
const detailStore = useDtailStore()
detailStore.getMomentDetail(route.params.id)

const { momentDetailData } = storeToRefs(detailStore)
</script>

<template>
  <div class="detail">
    <div class="moment-content">
      <detail-content :moment-detail="momentDetailData"></detail-content>
    </div>
    <div class="side-bar">
      <detail-sidebar></detail-sidebar>
    </div>
  </div>
</template>

<style lang="less" scoped>
.detail {
  height: calc(100vh - 76px);
  max-width: 1200px;
  margin: auto;
  display: flex;
  .moment-content {
    background-color: var(--color-bg-2);
    width: 75%;
    padding: 30px;
  }
  .side-bar {
    width: 25%;
    background-color: var(--color-bg-2);
    height: 40vh;
    margin-left: 20px;
  }
}

.action {
  display: inline-block;
  padding: 0 4px;
  color: var(--color-text-1);
  line-height: 24px;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s ease;
}
.action:hover {
  background: var(--color-fill-3);
}
</style>
