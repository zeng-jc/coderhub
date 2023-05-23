<script setup>
import { ref, reactive, provide } from 'vue'
import commentView from '../../../components/comment/comment-view.vue'
import useUserStore from '@/stores/user.store.js'
const userStore = useUserStore()

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

const emits = defineEmits(['sendMoment'])

const sendMomentBtn = async () => {
  emits('sendMoment', commentContent)
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
    <comment-view v-if="commentsTree" :comments="commentsTree" />
  </div>
</template>

<style scoped>
.detail-comment {
  background-color: var(--color-bg-2);
  padding: 30px;
}
</style>
