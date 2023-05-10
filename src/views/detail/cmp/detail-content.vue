<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  momentDetail: {
    type: Object,
    default: () => ({})
  }
})

const like = ref(false)
const toUserHandler = () => {
  router.push(`/user/${props.momentDetail.user.username}`)
}
</script>

<template>
  <div class="moment-content">
    <a-comment
      align="right"
      :author="momentDetail.user.nickname"
      :content="momentDetail.content"
      :datetime="momentDetail.createAt"
    >
      <template #avatar>
        <a-avatar @click="toUserHandler()">
          <img
            alt="avatar"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
          />
        </a-avatar>
      </template>
      <template #actions>
        <span class="action" key="heart">
          <span v-if="like">
            <IconHeartFill :style="{ color: '#f53f3f' }" />
          </span>
          <span v-else>
            <IconHeart />
          </span>
          {{ momentDetail.likes }}
        </span>
        <span class="action" key="reply"> <IconMessage /> {{ momentDetail.commentCount }} </span>
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
