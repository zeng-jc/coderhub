<script setup>
import { reactive, inject } from 'vue'
import useUserStore from '@/stores/user.store.js'
import useCommentStore from '@/stores/comment.store'
import { useRoute } from 'vue-router'
import { Notification } from '@arco-design/web-vue'

const route = useRoute()

const userStore = useUserStore()
const commentStore = useCommentStore()

defineProps({
  comments: {
    type: Object,
    default: () => ({})
  }
})

const replyContent = reactive({})

const isShowReplies = inject('isShowReplies')
const preReplyState = inject('preReplyState')
// 切换回复区域显示或隐藏
const toggleReply = (id) => {
  if (preReplyState.value !== id) {
    isShowReplies[preReplyState.value] && (isShowReplies[preReplyState.value] = false)
  }
  isShowReplies[id] = !isShowReplies[id]
  preReplyState.value = id
}
// 回复按钮
const replyBtn = async (id) => {
  const msg = await commentStore.sendComment(route.params.id, replyContent[id], id)
  if (msg) return Notification.error('回复失败')
  await commentStore.getComment(route.params.id)
  // 回复评论，且获取到评论后，隐藏回复区域
  isShowReplies[id] = false
  // 清空评论输入框
  replyContent[id] = ''
  Notification.success('回复成功')
}
</script>

<template>
  <a-comment
    class="moments"
    v-for="item in comments"
    :comments="comments"
    :key="item.id"
    :author="item.user.nickname"
    :avatar="item.user.avatar"
    :datetime="item.createAt"
  >
    <a-comment>
      <template #content>
        <div v-show="isShowReplies[item.id]" class="replySection">
          <a-textarea
            v-model="replyContent[item.id]"
            placeholder="欢迎评论"
            :max-length="255"
            allow-clear
            show-word-limit
          />
          <a-button
            key="1"
            type="primary"
            @click="replyBtn(item.id)"
            :disabled="!userStore.verifyLogin || !replyContent[item.id]"
          >
            回复评论
          </a-button>
        </div>
      </template>

      <template #actions>
        <div>
          <span
            class="reply-btn"
            @click="toggleReply(item.id)"
            :class="{ 'active-color': isShowReplies[item.id] }"
          >
            <IconMessage /> 回复
          </span>
        </div>
      </template>
    </a-comment>
    <!-- 递归组件 -->
    <comment-recursive v-if="item.replies" :comments="item.replies" />
    <template #content>
      <div v-html="item.content"></div>
    </template>
  </a-comment>
</template>

<style lang="less" scoped>
.reply-btn {
  cursor: pointer;
}
.replySection {
  text-align: right;
}
.active-color {
  color: rgb(var(--primary-6));
}
</style>
