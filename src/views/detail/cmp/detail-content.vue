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
          <img alt="avatar" :src="momentDetail.user.avatar" />
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
