<script setup>
defineProps({
  comments: {
    type: Object,
    default: () => ({})
  }
})
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
    <template #actions>
      <span class="action"> <IconMessage /> 回复 </span>
    </template>
    <detail-comment v-if="item.replies" :comments="item.replies"></detail-comment>
    <template #content>
      <div v-html="item.content"></div>
    </template>
  </a-comment>
</template>

<style scoped></style>
