<script setup>
import { ref, reactive, provide } from 'vue'
import { useRoute } from 'vue-router'
import useDtailStore from '../../stores/detail.store'
import { storeToRefs } from 'pinia'
import detailContent from './cmp/detail-content.vue'
import detailSidebar from './cmp/detail-sidebar.vue'
import detailComment from './cmp/detail-comment.vue'
import useUserStore from '@/stores/user.store.js'
import { Notification } from '@arco-design/web-vue'
const userStore = useUserStore()
const commentContent = ref('')
// 记录所有回复区域的显示和隐藏状态
const isShowReply = reactive({})
// 记录上一个回复区域的状态
const preReplyState = ref('')
provide('isShowReply', isShowReply)
provide('preReplyState', preReplyState)
const route = useRoute()
const detailStore = useDtailStore()
detailStore.getMomentDetail(route.params.id)
detailStore.getComment(route.params.id)
const { momentDetail, commentsTree } = storeToRefs(detailStore)

const postMomentBtn = async () => {
  const msg = await detailStore.postComent(route.params.id, commentContent.value)
  if (msg) return Notification.error('评论发表失败')
  Notification.success('评论发表成功')
  commentContent.value = ''
  detailStore.getComment(route.params.id)
}
</script>

<template>
  <div class="detail">
    <div class="detail-container">
      <div class="detail-main">
        <detail-content v-if="momentDetail" :moment-detail="momentDetail"></detail-content>
        <div class="comment-content">
          <a-comment
            align="right"
            avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
          >
            <template #actions>
              <a-button
                key="1"
                type="primary"
                @click="postMomentBtn"
                :disabled="!userStore.verifyLogin || !commentContent"
              >
                发表评论
              </a-button>
            </template>
            <template #content>
              <a-textarea
                v-model="commentContent"
                placeholder="欢迎评论"
                :max-length="255"
                allow-clear
                show-word-limit
              />
            </template>
          </a-comment>
          <detail-comment v-if="commentsTree" :comments="commentsTree"></detail-comment>
        </div>
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
      .comment-content {
        background-color: var(--color-bg-2);
        padding: 30px;
      }
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
