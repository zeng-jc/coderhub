<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import { IconHeart, IconMessage, IconHeartFill } from '@arco-design/web-vue/es/icon'
const likes = ref({})
const onLikeChange = (id) => {
  if (!likes.value[id]) return (likes.value[id] = true)
  likes.value[id] = !likes.value[id]
}
defineProps({
  moments: {
    type: Object,
    default: () => ({})
  },
  isShowLoading: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['loadMoment'])
function loadMomentFn(count) {
  emits('loadMoment', count)
}

const loadingRef = ref()
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMomentFn({ count: 15, observer })
      }
    },
    { threshold: 1 }
  )
  observer.observe(loadingRef.value)
})
</script>

<template>
  <div class="content">
    <a-comment
      v-for="item in moments"
      :datetime="item.createAt"
      :key="item.id"
      class="content-item"
      align="right"
    >
      <template #author>
        <router-link :to="`/user/${item.userInfo.username}`" target="_blank">
          {{ item.userInfo.nickname }}
        </router-link>
      </template>
      <template #actions>
        <span class="action" key="heart" @click="onLikeChange(item.id)">
          <span v-if="likes[item.id]">
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
    <div class="loading" ref="loadingRef" v-if="isShowLoading">
      <a-spin dot />
    </div>
    <h3 v-else style="color: var(--color-text-3); text-align: center">
      <icon-info-circle />
      已经加载到底部了
    </h3>
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

.loading {
  text-align: center;
}
</style>
