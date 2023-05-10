<script setup>
import { ref } from 'vue'
import { IconHeart, IconMessage, IconHeartFill } from '@arco-design/web-vue/es/icon'
import { useRouter } from 'vue-router'
const router = useRouter()

const like = ref(false)
const onLikeChange = () => {
  like.value = !like.value
}
defineProps({
  moments: {
    type: Object,
    default: () => ({})
  }
})

const momentDetail = (id) => {
  router.push({
    name: 'detail',
    params: {
      id
    }
  })
}
const toUserHandler = (username) => {
  router.push(`/user/${username}`)
}
</script>

<template>
  <div class="content">
    <a-comment
      v-for="item in moments.moments"
      :author="item.userInfo.nickname"
      :datetime="item.createAt"
      :key="item.id"
      class="content-item"
      align="right"
    >
      <template #actions>
        <span class="action" key="heart" @click="onLikeChange">
          <span v-if="like">
            <IconHeartFill :style="{ color: '#f53f3f' }" />
          </span>
          <span v-else>
            <IconHeart />
          </span>
          {{ item.likes }}
        </span>
        <span class="action" key="reply"> <IconMessage /> {{ item.commentCount }} </span>
      </template>
      <template #avatar>
        <a-avatar @click="toUserHandler(item.userInfo.username)">
          <img
            alt="avatar"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
          />
        </a-avatar>
      </template>
      <template #content>
        <div @click="momentDetail(item.id)" class="moment-content">
          {{ item.content }}
        </div>
      </template>
    </a-comment>
  </div>
</template>

<style lang="less" scoped>
.content {
  width: 60%;
  background-color: var(--theme-bg1);
  margin: 0 15px;
  padding: 20px;
  .content-item {
    cursor: pointer;
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

.moment-content:hover {
  color: rgb(var(--primary-6));
}
</style>
