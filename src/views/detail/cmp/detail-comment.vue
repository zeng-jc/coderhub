<script setup>
import { reactive, inject } from 'vue'
import useUserStore from '@/stores/user.store.js'
import useDtailStore from '@/stores/detail.store'
import { useRoute } from 'vue-router'
import { Notification } from '@arco-design/web-vue'
const route = useRoute()

const userStore = useUserStore()
const detailStore = useDtailStore()

defineProps({
  comments: {
    type: Object,
    default: () => ({})
  }
})

const replyContent = reactive({})

const isShowReply = inject('isShowReply')
const preReplyState = inject('preReplyState')
// 切换回复区域显示或隐藏
const toggleReply = (id) => {
  if (preReplyState.value !== id) {
    isShowReply[preReplyState.value] && (isShowReply[preReplyState.value] = false)
  }
  isShowReply[id] = !isShowReply[id]
  preReplyState.value = id
}
// 回复按钮
const replyBtn = async (id) => {
  const msg = await detailStore.postComent(route.params.id, replyContent[id], id)
  if (msg) return Notification.error('回复失败')
  await detailStore.getComment(route.params.id)
  // 回复评论，且获取到评论后，隐藏回复区域
  isShowReply[id] = false
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
    avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp"
    :datetime="item.createAt"
  >
    <a-comment>
      <template #content>
        <div v-show="isShowReply[item.id]" class="replySection">
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
        <span
          class="reply-btn"
          @click="toggleReply(item.id)"
          :class="{ 'active-color': isShowReply[item.id] }"
        >
          <IconMessage /> 回复
        </span>
      </template>
    </a-comment>
    <detail-comment v-if="item.replies" :comments="item.replies"></detail-comment>
    <template #content>
      <div v-html="item.content"></div>
    </template>
  </a-comment>
</template>

<style scoped>
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
