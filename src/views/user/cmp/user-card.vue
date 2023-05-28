<script setup>
import { ref, computed } from 'vue'
import dateForm from '@/utils/format_date'
const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  }
})
const gender = computed(() => {
  console.log(props.user.gender)
  if (props.user.gender === 0) {
    return '女'
  } else if (props.user.gender === 1) {
    return '男'
  } else {
    return '未知'
  }
})
const data = ref([
  {
    label: '性别',
    value: gender
  },
  {
    label: '用户等级',
    value: 'LV' + props.user.user_level
  },
  {
    label: '加入时间',
    value: dateForm(props.user.createAt, 'YYYY-MM-DD')
  }
])

const getAvatar = () => {
  return localStorage.getItem('avatar')
}
const username = localStorage.getItem('username')
const token = localStorage.getItem('token')
</script>

<template>
  <div class="user-card">
    <a-avatar class="avatar" :size="100">
      <img :src="getAvatar()" alt="" />
    </a-avatar>
    <div class="user-info">
      <a-descriptions :data="data" :title="user.nickname" :column="{ xs: 1, md: 3, lg: 4 }">
        <a-descriptions-item v-for="(item, index) of data" :label="item.label" :key="index">
          <a-tag>{{ item.value }}</a-tag>
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions :column="{ xs: 1, md: 3, lg: 4 }">
        <a-descriptions-item label="个人简介">
          <p>{{ user.bio ? user.bio : '暂无' }}</p>
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <div class="edit-user">
      <a-button type="outline" v-if="$route.params.username === username && token">
        编辑资料
      </a-button>
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
  .edit-user {
    flex: 1;
    text-align: right;
  }
}
</style>
