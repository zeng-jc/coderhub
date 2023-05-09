<script setup>
import { ref } from 'vue'
const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  }
})
const data = ref([
  {
    label: '昵称',
    value: props.user.nickname
  },
  {
    label: '主页id',
    value: props.user.username
  },
  {
    label: '性别',
    value: props.user.gender ? '男' : '女'
  },
  {
    label: '加入时间',
    value: props.user.createAt
  }
])
</script>

<template>
  <div class="user-card">
    <div class="user-card">
      <a-avatar class="avatar" :style="{ backgroundColor: '#14a9f8' }" :size="100">Arco</a-avatar>
      <a-descriptions :data="data" title="User Info" :column="{ xs: 1, md: 3, lg: 4 }">
        <a-descriptions-item v-for="(item, index) of data" :label="item.label" :key="index">
          <a-tag>{{ item.value }}</a-tag>
        </a-descriptions-item>
      </a-descriptions>
    </div>
  </div>
</template>

<style lang="less" scoped>
.user-card {
  display: flex;
  background-color: var(--color-bg-1);
  padding: 30px;
  .avatar {
    margin-right: 40px;
  }
}
</style>
