<script setup>
import { ref } from 'vue'
import { IconHeart, IconMessage, IconHeartFill } from '@arco-design/web-vue/es/icon'
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
        <router-link :to="`/user/${item.userInfo.username}`" target="_blank">
          <a-avatar>
            <img alt="avatar" :src="item.userInfo.avatar" />
          </a-avatar>
        </router-link>
      </template>
      <template #content>
        <div class="moment-content">
          <router-link :to="`/detail/${item.id}`" target="_blank">
            {{ item.content }}
          </router-link>
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

.moment-content:hover a {
  color: rgb(var(--primary-6));
}
</style>
