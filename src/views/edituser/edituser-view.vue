<script setup>
import { storeToRefs } from 'pinia'
// 子组件
import avatarUpload from './cmp/avatar-upload.vue'
// 网络请求
import { fetchUploadAvatar } from '@/service'
// arcoDesign
import { Message } from '@arco-design/web-vue'
// store
import useUserStore from '@/stores/user.store'
const userStore = useUserStore()
const username = localStorage.getItem('username')
userStore.getUser(username)
const { user } = storeToRefs(userStore)

const handleSubmit = () => {
  console.log('----')
}
const okHandler = (value) => {
  console.log(value)
  console.log('--------')
}

const uploadAvatar = async (formData) => {
  try {
    const res = await fetchUploadAvatar(formData)
    if (res.code === 200) return Message.success('头像上传成功，头像已修改')
    Message.error('头像上传失败')
  } catch (error) {
    Message.error('头像上传失败，服务器错误')
  }
}
</script>

<template>
  <div class="edit-user">
    <div class="edit-user-container">
      <div class="edit-user-content">
        <!-- 昵称（nickname）、性别（gender）、简介（bio）、生日（birthday）、电话（phone）、学校（school）、专业（major）、岗位（position）、个人博客（personal_blog）、github（github） -->
        <!-- {{ user }} -->
        <a-form v-if="user" :model="user" :style="{ width: '600px' }" @submit="handleSubmit">
          <!-- 头像 -->
          <a-form-item label="头像">
            <avatar-upload :avatar="user.avatar" @uploadAvatar="uploadAvatar" />
          </a-form-item>
          <a-form-item field="nickname" label="昵称">
            <a-input :value="user.nickname" placeholder="输入昵称" />
          </a-form-item>
          <a-form-item field="nickname" label="简介">
            <a-input :value="user.bio" placeholder="输入简介" />
          </a-form-item>
          <a-form-item field="gender" label="性别">
            <a-input :value="user.gender" placeholder="输入性别" />
          </a-form-item>
          <a-form-item field="birthday" label="生日">
            <a-date-picker style="width: 200px" @ok="okHandler" />
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit">Submit</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.edit-user {
  background-color: var(--theme-bg2);
  min-height: calc(100vh - 58px);
  .edit-user-container {
    max-width: 1200px;
    padding: 20px 0;
    margin: 0 auto;
    .edit-user-content {
      background-color: #fff;
      min-height: calc(100vh - 138px);
      padding: 20px 0;
    }
  }
}
</style>
