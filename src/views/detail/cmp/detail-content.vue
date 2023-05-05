<script setup>
import { ref } from 'vue'
defineProps({
  momentDetail: {
    type: Object,
    default: () => ({})
  }
})

const like = ref(false)
</script>

<template>
  <div class="moment-content">
    <a-comment
      align="right"
      :author="momentDetail.moment.user.nickname"
      avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
      :content="momentDetail.moment.content"
      :datetime="momentDetail.moment.createAt"
    >
      <template #actions>
        <span class="action" key="heart">
          <span v-if="like">
            <IconHeartFill :style="{ color: '#f53f3f' }" />
          </span>
          <span v-else>
            <IconHeart />
          </span>
          {{ momentDetail.moment.likes }}
        </span>
        <span class="action" key="reply">
          <IconMessage /> {{ momentDetail.moment.commentCount }}
        </span>
      </template>
    </a-comment>
  </div>
</template>

<style scoped>
.moment-content {
  background-color: var(--color-bg-2);
  padding: 30px;
  margin-bottom: 10px;
}
</style>
