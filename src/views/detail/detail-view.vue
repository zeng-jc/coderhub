<script setup>
import { useRoute } from 'vue-router'
import useDtailStore from '../../stores/detail.store'
import { storeToRefs } from 'pinia'
import detailContent from './cmp/detail-content.vue'
import detailSidebar from './cmp/detail-sidebar.vue'
import detailComment from './cmp/detail-comment.vue'

const route = useRoute()
const detailStore = useDtailStore()
detailStore.getMomentDetail(route.params.id)
detailStore.getComment(route.params.id)

const { momentDetailData, commentsTree } = storeToRefs(detailStore)
</script>

<template>
  <div class="detail">
    <div class="detail-main">
      <detail-content v-if="momentDetailData" :moment-detail="momentDetailData"></detail-content>
      <div class="comment-content">
        <detail-comment v-if="commentsTree" :comments="commentsTree"></detail-comment>
      </div>
    </div>
    <div class="detail-sidebar">
      <detail-sidebar></detail-sidebar>
    </div>
  </div>
</template>

<style lang="less" scoped>
.detail {
  height: fit-content;
  max-width: 1200px;
  margin: auto;
  display: flex;
  .detail-main {
    width: 75%;
    .comment-content {
      background-color: var(--color-bg-2);
      padding: 30px;
    }
  }
  .detail-sidebar {
    width: 25%;
    background-color: var(--color-bg-2);
    height: 40vh;
    margin-left: 20px;
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
</style>
