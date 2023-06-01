<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

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

const uploadAvatar = async (formData) => {
  try {
    const res = await fetchUploadAvatar(formData)
    if (res.code === 200) return Message.success('头像上传成功，头像已修改')
    Message.error('头像上传失败')
  } catch (error) {
    Message.error('头像上传失败，服务器错误')
  }
}

const router = useRouter()
const handleSubmit = async () => {
  await userStore.updateUser()
  Message.success('个人信息修改成功')
  router.push(`/user/${username}`)
  setTimeout(() => {
    router.go(0)
  }, 0)
}
const onChange = (value) => {
  user.value.birthday = new Date(value)
}
</script>

<template>
  <div class="edit-user">
    <div class="edit-user-container">
      <div class="edit-user-content">
        <a-form v-if="user" :model="user" :style="{ width: '600px' }" @submit="handleSubmit">
          <!-- 头像 -->
          <a-form-item label="头像">
            <avatar-upload :avatar="user.avatar" @uploadAvatar="uploadAvatar" />
          </a-form-item>
          <!-- 昵称 -->
          <a-form-item field="nickname" label="昵称">
            <a-input v-model="user.nickname" placeholder="输入昵称" />
          </a-form-item>
          <!-- 简介 -->
          <a-form-item field="nickname" label="简介">
            <a-textarea v-model="user.bio" placeholder="输入简介" />
          </a-form-item>
          <!-- 性别 -->
          <a-form-item field="gender" label="性别">
            <a-radio-group v-model="user.gender">
              <a-radio :value="1">男</a-radio>
              <a-radio :value="0">女</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item field="phone" label="电话">
            <a-input placeholder="输入电话" v-model="user.phone" hide-button />
          </a-form-item>

          <a-form-item field="birthday" label="生日">
            <a-date-picker style="width: 200px" @change="onChange" :defaultValue="user.birthday" />
          </a-form-item>

          <a-form-item field="school" label="学校">
            <a-input v-model="user.school" placeholder="输入学校" />
          </a-form-item>

          <a-form-item field="major" label="专业">
            <a-input v-model="user.major" placeholder="输入专业" />
          </a-form-item>

          <a-form-item field="position" label="岗位">
            <a-input v-model="user.position" placeholder="输入岗位" />
          </a-form-item>

          <a-form-item field="personal_blog" label="博客">
            <a-input v-model="user.personal_blog" placeholder="输入博客" />
          </a-form-item>

          <a-form-item field="github" label="github">
            <a-input v-model="user.github" placeholder="输入github" />
          </a-form-item>

          <a-form-item>
            <a-button html-type="submit" type="primary">提交保存</a-button>
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
