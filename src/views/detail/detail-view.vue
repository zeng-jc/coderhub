<script setup>
import { useRoute } from 'vue-router'
import useDtailStore from '../../stores/detail.store'
import { storeToRefs } from 'pinia'
import detailContent from './cmp/detail-content.vue'
import detailSidebar from './cmp/detail-sidebar.vue'
import commentView from '@/components/comment/comment-view.vue'

const route = useRoute()
const detailStore = useDtailStore()
detailStore.getMomentDetail(route.params.id)

const { momentDetail } = storeToRefs(detailStore)
</script>

<template>
  <div class="detail">
    <div class="detail-container">
      <div class="detail-main">
        <detail-content v-if="momentDetail" :moment-detail="momentDetail"></detail-content>
        <comment-view />
      </div>
      <detail-sidebar></detail-sidebar>
    </div>
  </div>
</template>

<style lang="less" scoped>
.detail {
  background-color: var(--theme-bg2);
  min-height: calc(100vh - 58px);
  .detail-container {
    max-width: 1200px;
    padding: 20px 0;
    margin: 0 auto;
    display: flex;
    .detail-main {
      width: 75%;
    }
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
