<script setup>
import { useRoute } from 'vue-router'
import { Notification } from '@arco-design/web-vue'
import useDtailStore from '../../stores/detail.store'
import { storeToRefs } from 'pinia'
import detailContent from './cmp/detail-content.vue'
import detailSidebar from './cmp/detail-sidebar.vue'
import detailComment from './cmp/detail-comment.vue'

const route = useRoute()
const detailStore = useDtailStore()
detailStore.getMomentDetail(route.params.id)
detailStore.getComment(route.params.id)
const { momentDetail, commentsTree } = storeToRefs(detailStore)

const sendMomentHandler = async (payload) => {
  const msg = await detailStore.postComent(route.params.id, payload.value)
  if (msg) return Notification.error('评论发表失败')
  Notification.success('评论发表成功')
  payload.value = ''
  detailStore.getComment(route.params.id)
}
</script>

<template>
  <div class="detail">
    <div class="detail-container">
      <div class="detail-main">
        <detail-content v-if="momentDetail" :moment-detail="momentDetail"></detail-content>
        <detail-comment
          v-if="commentsTree"
          :commentsTree="commentsTree"
          @sendMoment="sendMomentHandler"
        />
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
