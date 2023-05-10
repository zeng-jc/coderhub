<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
defineProps({
  moments: {
    type: Array,
    default: () => []
  }
})

const momentDetail = (id) => {
  router.push(`/detail/${id}`)
}
</script>

<template>
  <div class="user-content">
    <a-tabs position="left">
      <a-tab-pane key="1" title="动态">
        <a-comment
          v-for="item in moments"
          :author="item.userInfo.nickname"
          :datetime="item.createAt"
          :key="item.id"
          class="content-item"
          align="right"
        >
          <template #actions>
            <span class="action" key="heart" @click="onLikeChange">
              <IconHeart />
              {{ item.likes }}
            </span>
            <span class="action" key="reply"> <IconMessage /> {{ item.commentCount }} </span>
          </template>
          <template #content>
            <div @click="momentDetail(item.id)" class="moment-content">
              {{ item.content }}
            </div>
          </template>
        </a-comment>
      </a-tab-pane>
      <a-tab-pane key="2" title="文章"> Content of Tab Panel 2 </a-tab-pane>
      <a-tab-pane key="3" title="收藏"> Content of Tab Panel 3 </a-tab-pane>
      <a-tab-pane key="4" title="关注"> Content of Tab Panel 4 </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style lang="less" scoped>
.user-content {
  background-color: var(--color-bg-1);
  margin: 20px 0;
  padding: 20px;
  .moment-content {
    cursor: pointer;
  }
}
</style>
