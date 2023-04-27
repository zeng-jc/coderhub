<template>
  <div class="content">
    <a-comment author="Balzac" datetime="1 hour" align="right">
      <template #actions>
        <span class="action" key="heart" @click="onLikeChange">
          <span v-if="like">
            <IconHeartFill :style="{ color: '#f53f3f' }" />
          </span>
          <span v-else>
            <IconHeart />
          </span>
          {{ 83 + (like ? 1 : 0) }}
        </span>
        <span class="action" key="reply"> <IconMessage /> Reply </span>
      </template>
      <template #avatar>
        <a-avatar>
          <img
            alt="avatar"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
          />
        </a-avatar>
      </template>
      <template #content>
        <div>
          A design is a plan or specification for the construction of an object or system or for the
          implementation of an activity or process, or the result of that plan or specification in
          the form of a prototype, product or process.
        </div>
      </template>
    </a-comment>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { IconHeart, IconMessage, IconHeartFill } from '@arco-design/web-vue/es/icon'

const like = ref(false)
const onLikeChange = () => {
  like.value = !like.value
}
</script>

<style scoped>
.content {
  background-color: var(--theme-bgk1);
  margin: 0 15px;
  padding: 20px;
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
</style>
