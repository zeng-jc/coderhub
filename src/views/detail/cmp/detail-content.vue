<script setup>
import { IconMessage } from '@arco-design/web-vue/es/icon'

defineProps({
  momentDetail: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <div class="detail-content">
    <a-comment
      align="right"
      :author="momentDetail.moment?.user.nickname"
      avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
      :content="momentDetail.moment?.content"
      :datetime="momentDetail.moment?.createAt"
    >
      <template #actions>
        <span class="action"> <IconMessage /> Reply </span>
      </template>
      <a-comment
        align="right"
        avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
      >
        <template #actions>
          <a-button key="0" type="secondary"> Cancel </a-button>
          <a-button key="1" type="primary"> Reply </a-button>
        </template>
        <template #content>
          <a-input placeholder="Here is you content." />
        </template>
      </a-comment>
    </a-comment>
  </div>
</template>

<style scoped></style>
