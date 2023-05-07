<script setup>
import { reactive } from 'vue'
import useUserStore from '@/stores/user.store.js'
import useDtailStore from '@/stores/detail.store'
import { useRoute } from 'vue-router'
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
const isShow = reactive({})
// 切换回复区域显示或隐藏
const toggleReply = (id) => {
  isShow[id] = !isShow[id]
}
// 回复按钮
const replyBtn = async (id) => {
  await detailStore.postComent(route.params.id, replyContent[id], id)
  await detailStore.getComment(route.params.id)
  // 回复评论，且获取到评论后，隐藏回复区域
  isShow[id] = false
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
        <div v-show="isShow[item.id]" class="replySection">
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
            :disabled="!userStore.verifyLogin || !replyContent"
          >
            回复评论
          </a-button>
        </div>
      </template>

      <template #actions>
        <span
          class="reply-btn"
          @click="toggleReply(item.id)"
          :class="{ 'active-color': isShow[item.id] }"
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
