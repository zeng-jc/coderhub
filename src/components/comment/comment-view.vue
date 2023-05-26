<script setup>
import { ref, reactive, provide } from 'vue'
import { useRoute } from 'vue-router'
// 子组件
import commentRecursive from './cmp/comment-recursive.vue'
// store
import useUserStore from '@/stores/user.store.js'
import useCommentStore from '@/stores/comment.store'
import { storeToRefs } from 'pinia'

import { Notification } from '@arco-design/web-vue'

const userStore = useUserStore()
const route = useRoute()
const commentStore = useCommentStore()
commentStore.getComment(route.params.id)
const { commentsTree } = storeToRefs(commentStore)

defineProps({
  commentsTree: {
    type: Object,
    default: () => ({})
  }
})

// 评论内容
const commentContent = ref('')

// 获取用户头像
const getAvatar = () => {
  return localStorage.getItem('avatar')
}

// 发送评论
const sendMomentBtn = async () => {
  const msg = await commentStore.sendComment(route.params.id, commentContent.value)
  if (msg) return Notification.error('评论发表失败')
  Notification.success('评论发表成功')
  commentContent.value = ''
  commentStore.getComment(route.params.id)
}

// 记录所有回复区域的显示和隐藏状态
const isShowReplies = reactive({})
// 记录上一个回复区域的状态
const preReplyState = ref('')
provide('isShowReplies', isShowReplies)
provide('preReplyState', preReplyState)
</script>

<template>
  <div class="detail-comment">
    <a-comment align="right" :avatar="getAvatar()">
      <template #actions>
        <a-button
          key="1"
          type="primary"
          @click="sendMomentBtn"
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
    <!-- 递归组件 -->
    <comment-recursive v-if="commentsTree" :comments="commentsTree" />
  </div>
</template>

<style scoped>
.detail-comment {
  background-color: var(--color-bg-2);
  padding: 30px;
}
</style>
